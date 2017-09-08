import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
	}

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public afAuth: AngularFireAuth) {
	  }
	  
	createDisplayName() {
		// this.afAuth.auth.currentUser.updateProfile(this.displayData.displayName).then({

		// }
		var success = this.navCtrl;

		// })
		this.afAuth.auth.currentUser.updateProfile({
		  displayName: this.displayData.displayName,
		  photoURL: null
		}).then(function() {
		  // Update successful.
			// this.afAuth.auth.Update();
			// this.navCtrl.setRoot(HomePage);
		//   console.log(this.afAuth.auth.currentUser.displayName + ' added as displayName');
		  success.setRoot(HomePage);

		}).catch(function(error) {
		  // An error happened.
			console.log(error);
		});
	}  

	

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterDisplayNamePage');
  }

}
