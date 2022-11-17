import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import {Media} from "@ionic-native/media/ngx";
import {MediaPlayerService} from "./media-player.service";
import {CacheService} from "./cache.service";
import {IonicStorageModule} from "@ionic/storage-angular";
import { File } from '@ionic-native/file/ngx';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
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
    CacheService,
    MediaPlayerService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
