import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { MenuPage } from '../menu/menu';
import { LoadingController } from 'ionic-angular';
import { UsuarioErrorPage } from '../usuario-error/usuario-error';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private arrUsuarios;
  private usuario = {"nombre":"","clave":""};
  private loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private usuarioService: UsuarioServiceProvider,
              private loadingCtrl: LoadingController)
  {
    this.createLoading("Estableciendo conexión con la BD...");
    this.loading.present();
    this.traerUsuarios();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  private createLoading(message: string)
  {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box mt-2">
        <img src="./assets/img/logo2.png" width="80">
        </div>
      </div>` + message
    });
  }

  private traerUsuarios()
  {
    this.usuarioService.getUsuarios().subscribe(
      data => 
      {
        this.arrUsuarios = data;
        this.loading.dismiss();
      },
      err => console.error(err),
      () => alert("Usuarios: " + this.arrUsuarios)
    );
  }

  private validarUsuario()
  {
    this.createLoading("Validando usuario...");
    this.loading.present();
    let usuarioEncontrado = false;

    this.arrUsuarios.forEach(element => {
      if(element.nombre == this.usuario.nombre && element.clave == this.usuario.clave)
      {
        usuarioEncontrado = true;
        localStorage.setItem("usuario",element.nombre);
        this.loading.dismiss();
        setTimeout(()=> {
          this.loading.dismiss();
          this.navCtrl.push(MenuPage);
        }, 1000);
      }
    });
    if(usuarioEncontrado == false)
    setTimeout(()=> {
      this.loading.dismiss();
      this.navCtrl.push(UsuarioErrorPage);
    }, 1000);
  }

}
