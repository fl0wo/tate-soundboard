import { Injectable } from '@angular/core';
import {
  AdLoadInfo,
  AdMob,
  AdMobBannerSize, AdOptions,
  BannerAdOptions,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize, InterstitialAdPluginEvents
} from "@capacitor-community/admob";

@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  private TOP_BANNER = 'ca-app-pub-7119119689258159/8540791887'

  init(){
    return AdMob.initialize({
      initializeForTesting: true,
      requestTrackingAuthorization: true
    });
  }

  banner() {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
      // Subscribe Change Banner Size
    });

    const options: BannerAdOptions = {
      adId: this.TOP_BANNER,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      // npa: true
    };
    return AdMob.showBanner(options);
  }

  async interstitial() {
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      // Subscribe prepared interstitial
    });

    const options: AdOptions = {
      adId: this.TOP_BANNER,
      // isTesting: true
      // npa: true
    };
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }
}
