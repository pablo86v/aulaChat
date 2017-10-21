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

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  messages: any[];
  objUsuario: Usuario;
  chatName : string;
  mensaje: string;


  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl:
    App, public data: DataProvider, public toastCtrl: ToastController) {
      this.chatName = localStorage.getItem("chatName");
      this.traerMensajes();
      this.mensaje = "";
  }


  traerMensajes() {
    this.data.getItems(localStorage.getItem("chatName")).subscribe(
      data => {
        this.messages = data;
      },
      err => console.error(err),
      () => console.log(this.messages)
    );
  }

  guardarMensaje(mensaje)
  {
    if (this.mensaje.length > 0){
    this.data.setItem(mensaje,localStorage.getItem("usuario"));
    this.mensaje = "";
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
