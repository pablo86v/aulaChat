import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioErrorPage } from './usuario-error';

@NgModule({
  declarations: [
    UsuarioErrorPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioErrorPage),
  ],
})
export class UsuarioErrorPageModule {}
