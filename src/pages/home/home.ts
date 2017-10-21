import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Usuario } from '../../entidades/usuario';

//Providers
import { DataProvider } from '../../providers/data/data';
import { Observable } from 'rxjs/Observable';

// Pages
import { ListPage } from '../../pages/list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chatName : string;
  messages: any[];
  objUsuario: Usuario;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl:
    App, public data: DataProvider, public toastCtrl: ToastController) {
      this.chatName = "";
  }


  selectChat() {
    if(this.chatName.length>0){
      localStorage.setItem("chatName", this.chatName);
      this.navCtrl.push(ListPage);
    }

  }

  presentToast(textToShow) {
    const toast = this.toastCtrl.create({
      message: textToShow,
      duration: 2000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }




}//class
