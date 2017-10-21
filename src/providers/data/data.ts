
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class DataProvider {

  

  chat : FirebaseListObservable<any[]> ; 

  constructor(public http: Http, public db: AngularFireDatabase) {
    
  }


  public setItem(mensaje,usuario) {
    this.chat.push({mensaje:mensaje,usuario:usuario});
  }


  
  public getItems(chatName) {
    if (chatName == "PPS-4B"){
      this.chat = this.db.list('/PPS-4B');
    } else  {
      this.chat = this.db.list('/PPS-4A');
    }
     console.log("chatName ->" + chatName);
     return this.chat;
  }







}//class



