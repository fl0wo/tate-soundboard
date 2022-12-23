import {Injectable, NgZone} from '@angular/core';
import { Media } from '@ionic-native/media/ngx';
import {Platform} from "@ionic/angular";

@Injectable()
export class MediaPlayerService {

  media: any;
  _ready: Promise<any>;

  constructor(
    private platform: Platform,
    private cordovaMedia: Media,
    private zone: NgZone
  ) {
    this._ready = this.platform.ready()
  }

  ready(): Promise<any> {
    return this._ready;
  }

  /* Plays a sound, stopping other playing sounds if necessary */
  play(sound:any) {
    console.log('TRY TO PLAY' , JSON.stringify(sound))
    this.stopPlayback();

    /* Plays with Cordova Audio if available, falls back on Web Audio.
     * If something goes wrong in playing with Cordova Audio, play with
     * Web Audio as well
     */
    if (window.hasOwnProperty('cordova') && window.hasOwnProperty('Media')) {
      try {
        this.playWithCordovaAudio(sound);
      } catch (error) {
        if (sound.remoteSrc) {
          this.playWithWebAudio(sound, sound.remoteSrc);
        } else {
          this.playWithWebAudio(sound);
        }
      }
    } else {
      this.playWithWebAudio(sound);
    }
  }

  playWithWebAudio(sound:any, alternativeSrc = null) {
    const src = alternativeSrc || sound.src;
    this.media = new Audio(src);

    /* Adding event listeners to update the sound's isPlaying attribute accordingly */
    this.media.onended = () => {
      sound.isPlaying = false;
    };
    this.media.onpause = () => {
      sound.isPlaying = false;
    };
    this.media.onplay = () => {
      sound.isPlaying = true;
    };

    this.media.load();
    this.media.play();
  }

  playWithCordovaAudio(sound:any) {
    this.media = this.cordovaMedia.create(sound.src);

    /* Adding status callback to update the sound's isPlaying attribute accordingly */
    this.media.statusCallback = (status:any) => {
      /* Run this in ngZone to propagate changes to the UI */
      this.zone.run(() => {
        switch (status) {
          case this.cordovaMedia.MEDIA_RUNNING:
            sound.isPlaying = true;
            break;
          case this.cordovaMedia.MEDIA_PAUSED:
            sound.isPlaying = false;
            break;
          case this.cordovaMedia.MEDIA_STOPPED:
            sound.isPlaying = false;
            break;
        }
      });
    };

    this.media.play();
  }

  /* Stops the playback of the sound */
  stopPlayback() {
    if (this.media) {
      if (this.media.release) {
        this.media.stop();
        this.media.release();
      } else {
        this.media.pause();
      }
      this.media = null;
    }
  }
}
