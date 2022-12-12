import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {IonicStorageModule} from "@ionic/storage-angular";

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import {Media} from "@ionic-native/media/ngx";
import {MediaPlayerService} from "./media-player.service";

import { File } from '@ionic-native/file/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import {AdmobService} from "./admob.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    CommonModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
  ],
  providers: [
    File,
    FileTransfer,
    NativeAudio,
    Media,
    MediaPlayerService,
    AdMobFree,
    AdmobService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
