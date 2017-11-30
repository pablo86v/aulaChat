import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SalaPage } from '../sala/sala';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public usuarioService: UsuarioServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


  private ingresarSala(sala)
  {
    this.navCtrl.push(SalaPage, {"sala":sala});
  }

  private logout()
  {
    localStorage.removeItem("usuario");
    this.navCtrl.push(LoginPage);
  }

}
