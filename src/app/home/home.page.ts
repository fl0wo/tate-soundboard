import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdmobService} from "../admob.service";
import {ApiService} from "../api.service";

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
    this.admobService.ShowBanner();
  }

  //FUNCTION FOR INTERSTITIAL
  Interstitial(){
    this.admobService.ShowInterstitial();
  }
//FUNCTION FOR VIDEOREWARD
  Reward(){
    this.admobService.ShowRewardVideo();
  }

  /* EDIT THESE */
  title: string = "Ionic Soundboard";

  sounds: any = [];
  media: any = null;

  constructor(
    private httpClient: HttpClient,
    private admobService: AdmobService,
    private api:ApiService) {
    this.api.pullSongs()
      .subscribe((sounds:Array<any>)=>{
        this.sounds=sounds;
      })
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

  stop(sound:any) {
    if(sound.isPlaying) {
      this.media.pause();
    }
  }

}
