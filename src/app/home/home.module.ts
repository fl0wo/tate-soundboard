import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {AdmobService} from "../admob.service";
import {AdMobFree} from "@ionic-native/admob-free/ngx";
import {ImgCardComponent} from "../img-card/img-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ImgCardComponent],
  providers: [
    AdMobFree,
    AdmobService
  ]
})
export class HomePageModule {}
