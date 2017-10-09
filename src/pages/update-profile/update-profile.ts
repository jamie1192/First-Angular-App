import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera'

/**
 * Generated class for the UpdateProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

	displayData = {
		displayName: '',
		photoURL: ''
	}

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public afAuth: AngularFireAuth,
		private loadCtrl: LoadingController,
		private camera: Camera
	) {
  }

	ionViewDidLoad() {
		console.log('ionViewDidLoad UpdateProfilePage');
	}

	captureDataUrl: string;

	capture() { //take photo with camera

		this.camera.getPicture({
			sourceType: this.camera.PictureSourceType.CAMERA,
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}).then((imageData) => {

			// let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {

			let toast = this.toastCtrl.create({
				message: 'Error capturing image!',
				duration: 3000,
				position: 'bottom'
			});
			toast.present();
		});
	}

	upload() {

		let loader = this.loadCtrl.create({
			content: "Please wait...",
			dismissOnPageChange: true,
			duration: 3000
		  });
		  loader.present();

		if (this.displayData.displayName != ''){ //user changed their displayName
			this.afAuth.auth.currentUser.updateProfile({
				displayName: this.displayData.displayName,
				photoURL: '',
			}).then(function() {
				loader.dismiss();
				console.log("displayName updated")
			}).catch(function(error) {
				console.log(error);

			})
		}

		if (this.captureDataUrl != null){
			let storageRef = firebase.storage().ref();
			
			// name profile img by userUID
			const filename = this.afAuth.auth.currentUser.uid;
	
			//create reference to image filename
			const imageRef = storageRef.child('profileImages/'+filename+'.jpg');
	
			imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
	
				// toast if successful
				loader.dismiss();

				let toast = this.toastCtrl.create({
					message: 'Image uploaded successfully!',
					duration: 3000,
					position: 'bottom'
				});
				toast.present();
				this.captureDataUrl = '';
			})
		}

		
	}

}
