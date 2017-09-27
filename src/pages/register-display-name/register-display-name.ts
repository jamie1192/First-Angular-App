import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the RegisterDisplayNamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-display-name',
  templateUrl: 'register-display-name.html',
})
export class RegisterDisplayNamePage {

	displayData = {
		displayName: '',
		photoURL: ''
	}

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public afAuth: AngularFireAuth) {
	  }
	  
	createDisplayName() {
		var success = this.navCtrl;
		let loader = this.loadingCtrl.create({
			content: "Please wait...",
			dismissOnPageChange: true,
		  });
		let toast = this.toastCtrl.create({
			message: 'An error has occurred, please try again.',
			duration: 3000,
			position: 'bottom'
		});
		loader.present();

		this.afAuth.auth.currentUser.updateProfile({
			displayName: this.displayData.displayName,
			photoURL: this.displayData.photoURL
		}).then(function() {
		  // Update successful.
		  console.log(success);
		  success.setRoot(HomePage);

		}).catch(function(error) {
		  // An error happened.
			console.log(error);
			loader.dismiss();	
			toast.present();
		});
		
	}  

	

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterDisplayNamePage');
  }

}
