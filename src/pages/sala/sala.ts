import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sala',
  templateUrl: 'sala.html',
})
export class SalaPage {
  private sala;
  private arrMensajes;
  private mensaje;
  private usuarioLogueado;
  private loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public usuarioService: UsuarioServiceProvider,
              private loadingCtrl: LoadingController) 
  {
    this.createLoading("Cargando mensajes...");
    this.sala = this.navParams.get("sala");
    this.traerMensajes(this.sala);
  }
    

  private traerMensajes(sala)
  {
    this.usuarioService.getCurso(sala).subscribe(
      data => 
      {
        this.arrMensajes = data;
        console.log(this.arrMensajes.length);
        // location.hash = "#ultima_caja";
        this.loading.dismiss();
    },
      err => console.error(err),
      () => console.log(this.arrMensajes)
    );

    this.usuarioLogueado = localStorage.getItem("usuario");
  }

  private guardarMensaje(mensaje)
  {
    this.usuarioService.postMensaje(this.sala,localStorage.getItem("usuario"),mensaje);
    this.mensaje = "";
  
  }

  private logout()
  {
    localStorage.removeItem("usuario");
    this.navCtrl.push(LoginPage);
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
    this.loading.present();
  }

}
