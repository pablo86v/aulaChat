import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-usuario-error',
  templateUrl: 'usuario-error.html',
})
export class UsuarioErrorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioErrorPage');
  }

  private irLogin()
  {
    this.navCtrl.push(LoginPage);
  }


}
