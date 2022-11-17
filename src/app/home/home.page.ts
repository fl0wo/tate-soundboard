import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MediaPlayerService} from "../media-player.service";
import {CacheService, toCompressedTitle} from "../cache.service";

export interface SoundS3 {
  title:string;
  file:string;
  imgSrc:string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ngOnInit(): void {
  }

  /* EDIT THESE */
  title: string = "Ionic Soundboard";

  sounds: any = [];
  media: any = null;

  constructor(private httpClient: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true'
      })
    };

    const baseUrl = 'https://andrew-tate.s3.eu-west-1.amazonaws.com'
    const soundsFile = '/sounds.json'

    this.httpClient.get<Array<any>>(baseUrl + soundsFile,httpOptions)
      // TODO: add photo:string
      .subscribe((data:Array<any>) => {
        console.log(JSON.stringify(data))
          for(let link of data) {
            if(!link.file.startsWith("http")) {
              if(!link.file.startsWith("/")) {
                link.file = "/" + link.file;
              }
              link.file = baseUrl + link.file;
            }
            this.sounds.push({
              title: link.title,
              file: link.file,
              isPlaying: false,
              imgSrc: baseUrl + link.imgSrc
            });
          }
        },
        err => console.error('There was an error: ' + err),
        () => console.log('Get request completed')
      );
  }

  /* Plays a sound, pausing other playing sounds if necessary */
  cacheAndPlay(sound:any) {
    console.log(sound);
    if(this.media) {
      this.media.pause();
    }

    this.media = new Audio(sound.file);
    /* Adding event listeners to update the sounds isPlaying attribute accordingly */
    this.media.onended = function() {
      sound.isPlaying = false;
    }
    this.media.onpause = function() {
      sound.isPlaying = false;
    }
    this.media.onplay = function() {
      sound.isPlaying = true;
    }

    this.media.load();
    this.media.play();
  }

  /* Stops the playback of the sound */
  stop(sound:any) {
    if(sound.isPlaying) {
      this.media.pause();
    }
  }

  /* Toggle a sound as favourite */
  toggleFavourite(sound:any) {
    // this.favouritesData.toggleFavourite(sound);
    // console.log(this.favouritesData.getAllFavourites());
  }

  /* Lists all favourited sounds */
  listFavouriteSounds() {
    // let allFavourites = this.favouritesData.getAllFavourites();
    // return allFavourites;
  }

  /* Lists all sounds not marked as favourite */
  listRegularSounds() {
    // let regularSounds = this.sounds.filter(sound => !this.favouritesData.hasFavourite(sound));
    // return regularSounds;
  }

  /* List all sounds, favourites first */
  listSortedSounds() {
    // return this.listFavouriteSounds().concat(this.listRegularSounds());
  }

  /*
  async ngOnInit2() {
    this.mediaService.ready()
      .then(()=>this.cacheService.ready())
      .then(()=>this.load())
      .catch(error => console.log(error));
  }

  cacheAndPlay(sound:any) {
    this.cache(sound).then(() => this.mediaService.play(sound));
  }

  cache(sound:any): Promise<any> {

    return new Promise((resolve, reject) => {
      if (!window.hasOwnProperty('cordova')) {
        return resolve(true);
      }
      console.log('CACHING',JSON.stringify(sound))
      return this.cacheService.addToCache(sound)
        .then(cachedSound => {
          sound.src = cachedSound.src;
          sound.remoteSrc = cachedSound.remoteSrc;
          sound.cacheDate = cachedSound.cacheDate;
          console.log('CACHED', JSON.stringify(cachedSound))

          return resolve(sound);
        })
        .catch(error => console.log(error));
    });
  }

  load(){
    this.cacheService.getCache().forEach(cachedSound => {
      cachedSound.isPlaying = false;
      this.sounds.push(cachedSound);
    });
    return this.getRemoteSounds();
  }

  getRemoteSounds(): Promise<any> {
    return new Promise((resolve, reject) => {
      const baseUrl = 'https://andrew-tate.s3.eu-west-1.amazonaws.com'
      const soundsFile = '/sounds.json'
      if (!baseUrl || !soundsFile) {
        return reject('No base url or sounds file specified');
      }

      const httpOptions = {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Credentials': 'true'
        })
      };

      this.httpClient.get<Array<any>>(baseUrl + soundsFile,httpOptions)
        // TODO: add photo:string
        .subscribe((data:Array<{title:string,file:string}>) => {
            data.forEach(sound => {
              if (!(sound.file.startsWith('http') || sound.file.startsWith('//'))) {
                if (!sound.file.startsWith('/')) {
                  sound.file = '/' + sound.file;
                }
                sound.file = baseUrl + sound.file;
              }

              if (!this.cacheService.hasInCache(sound)) {
                this.sounds.push({
                  title: toCompressedTitle(sound.title),
                  src: sound.file,
                  isPlaying: false
                });
              }
            });
            return resolve(true);
          },
          error => reject(error),
          () => console.log(this.sounds)
        );
    });
  }
*/

}
