import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class UsuarioServiceProvider {

  private usuarioObservable : FirebaseListObservable<any[]> = this.db.list('/usuario');
  private PPS4AObservable : FirebaseListObservable<any[]> = this.db.list('/PPS-4A');
  private PPS4BObservable : FirebaseListObservable<any[]> = this.db.list('/PPS-4B');

  constructor(private db: AngularFireDatabase) 
              {  
  }

  public getUsuarios()
  {
    return this.usuarioObservable;
  }

  public getCurso(division)
  {
    switch(division)
    {
      case "PPS - 4A":
        return this.PPS4AObservable;
      case "PPS - 4B":
        return this.PPS4BObservable;

    }
  }

  public postMensaje(division, nombre, mensaje)
  {
    let mensajeObservable : FirebaseListObservable<any[]>;

    switch(division)
    {
      case "PPS - 4A":
        mensajeObservable = this.PPS4AObservable;
        break;
      case "PPS - 4B":
        mensajeObservable= this.PPS4BObservable;
        break;
    }

    mensajeObservable.push({mensaje:mensaje, nombre:nombre });
    
  }


}
