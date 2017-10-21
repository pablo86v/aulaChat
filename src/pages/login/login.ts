import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

// Pages
import { HomePage } from '../../pages/home/home';
import { Usuario } from '../../entidades/usuario';

//Providers
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  items: any[];
  contrasenia: string;
  objUsuario: Usuario;


  constructor(public navCtrl: NavController, public appCtrl: App, public viewCtrl: ViewController,
    public navParams: NavParams, public auservice: AuthServiceProvider, public toastCtrl: ToastController
    , public loadingCtrl: LoadingController) {
    this.getUsers();
    this.objUsuario = new Usuario();
    this.contrasenia = "";

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


  selectUser(valor) {
    for (let user of this.items) {
      if (user.nombre == valor) {
        this.objUsuario = user;
        this.contrasenia = user.clave;
      }
    }
    localStorage.setItem("usuario", this.objUsuario.nombre);
  }


  getUsers() {
    // configuro spinner para mientras se cargan los datos 
    const loading = this.loadingCtrl.create({
      content: 'Espere por favor...'
    });
    loading.present();

    this.auservice.getItems().subscribe(
      datos => {
        this.items = datos;
        loading.dismiss();
      },
      error => console.error(error),
      () => console.log("ok")
    );
  }


  validateUser() {
    if (this.contrasenia != this.objUsuario.clave || this.contrasenia == "") {
      this.presentToast("Contraseña inválida");
    }
    else {
      this.navCtrl.push(HomePage);
    }
  }


  ionViewDidLoad() {

  }


}//class

