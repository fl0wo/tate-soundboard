import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {FileTransfer} from "@ionic-native/file-transfer/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: Storage) {}

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create()
  }
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  console.log('CHECKING FileTransfer')
  console.log(FileTransfer);
}

onDeviceReady();
