import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import { Plugins } from '@capacitor/core';
import {CameraResultType, PromptResult} from "@capacitor/core/dist/esm/core-plugin-definitions";
import {DomSanitizer} from "@angular/platform-browser";
const { Modals } = Plugins;
const { Camera } = Plugins;

declare global
{
  interface PluginRegistry
  {
    PluginTest?: PluginTest;
  }
}

interface PluginTest
{
  getLastPhotoTaken(): Promise<any>;
  // getContacts(): Promise<any>;
}

// const { PluginTest } = Plugins;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
  private lastPhoto: string = 'http://placehold.it/500x500';
  contacts:any[]=[];

  constructor(public navCtrl: NavController, private domSanitizer: DomSanitizer, private loading:LoadingController)
  {

  }

  grabPhoto()
  {
    Camera.getPhoto({
      // quality: 100,
      resultType: CameraResultType.Base64
    }).then((result) =>
    {
      console.log(result);
    }).catch((err) =>
    {
      console.log(err);
      console.log('Sorry pal, not going to happen');
    });

  }

  openModal()
  {
    Modals.prompt({cancelButtonTitle:'إلغاء', okButtonTitle:'موافق', title:'Stop', message:'Hello from Capacitor', inputPlaceholder:''})
      .then((result:PromptResult)=>
      {
        console.log(result.cancelled);
        console.log(result.value);
      });
  }

  // getLastPhoto()
  // {
  //   // const { PluginTest } = Plugins;
  //
  //   PluginTest.getLastPhotoTaken().then((result) => {
  //     this.lastPhoto = "data:image/png;base64, " + result.image;
  //   });
  // }

  getContacts()
  {
    var loader = this.loading.create()
    console.log('getContacts');
    const { PluginTest } = Plugins;

    PluginTest.getLastPhotoTaken().then((result) =>
    {
      // console.log(result);
      loader.dismissAll();
      this.contacts = result.contacts;
    });
  }
}
