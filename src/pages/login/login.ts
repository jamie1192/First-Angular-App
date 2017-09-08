import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
		public loadingCtrl: LoadingController,
		private afAuth: AngularFireAuth) {
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
	//show loader to block interaction
	let loader = this.loadingCtrl.create({
		content: "Please wait...",
		dismissOnPageChange: true
	  });
	  loader.present();

	this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
	.then(auth => {
		//do custom stuff here with auth?
		let toast = this.toastCtrl.create({
			message: 'Welcome back ' + this.loginData.email + '!',
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	})
	.catch(err => {
		//error handling
		loader.dismiss();

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
