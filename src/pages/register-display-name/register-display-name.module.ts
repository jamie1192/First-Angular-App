import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterDisplayNamePage } from './register-display-name';

@NgModule({
  declarations: [
    RegisterDisplayNamePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterDisplayNamePage),
  ],
})
export class RegisterDisplayNamePageModule {}
