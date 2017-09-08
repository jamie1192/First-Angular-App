import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { RegisterDisplayNamePage } from '../../pages/register-display-name/register-display-name';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	registerData = {
		displayName: '',
		email: '',
		password: '',
		passwordRetyped: ''
	};

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		private afAuth: AngularFireAuth) {
		this.registerData.email = this.navParams.get('email');
	}


	register() {

		let loader = this.loadingCtrl.create({
			content: "Please wait...",
			dismissOnPageChange: true
		  });
		  loader.present();
		

		if(this.registerData.password !== this.registerData.passwordRetyped) {
			let alert = this.alertCtrl.create({
				title: 'Error',
				message: ' Password mismatch',
				buttons: ['OK']
			});
			alert.present();
			return;
		}

		//firebase signup code
		this.afAuth.auth.createUserWithEmailAndPassword(this.registerData.email, this.registerData.password)
		.then(auth => {
			//something with auth response
			console.log(auth);
			let toast = this.toastCtrl.create({
				message: 'Registration successful!',
				duration: 3000,
				position: 'bottom'
			});
			toast.present();

			this.navCtrl.push(RegisterDisplayNamePage);
		})
		.catch(err => {
			//error handling
			loader.dismiss();

			let alert = this.alertCtrl.create({
				title: 'Error',
				message: err.message,
				buttons: ['OK']
			});
			alert.present();
		});
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
