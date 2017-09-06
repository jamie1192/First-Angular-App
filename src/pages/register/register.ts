import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

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
		email: '',
		password: '',
		passwordRetyped: ''
	};

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private alertCtrl: AlertController,
	private afAuth: AngularFireAuth) {
		this.registerData.email = this.navParams.get('email');
	}


	register() {
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
		})
		.catch(err => {
			//error handling
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
