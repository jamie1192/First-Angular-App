import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';


import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
	name: 'login',
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	loginData = {
		email: '',
		password: ''
	}

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
	this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
	.then(auth => {
		//do custom stuff here with auth?
	})
	.catch(err => {
		//error handling
		let toast = this.toastCtrl.create({
			message: err.message,
			duration: 3000
		})
		toast.present();
	});
  }

  register() {
	  this.navCtrl.push(RegisterPage, { email: this.loginData.email });
  }

}
