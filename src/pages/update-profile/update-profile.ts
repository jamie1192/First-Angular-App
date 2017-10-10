import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  constructor(
	public navCtrl: NavController, 
	public navParams: NavParams,
	private camera: Camera,
	private loadCtrl: LoadingController,
	private toastCtrl: ToastController,
	private auth: AngularFireAuth
	) {
  }

  captureDataUrl: string;

  displayData = {
	  displayName: '',
	  photoURL: ''
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }

  capture() {
	  this.camera.getPicture({
		  sourceType: this.camera.PictureSourceType.CAMERA,
		  quality: 50,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
	  }).then((imageData) => {

		this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
	  },  (err) => {

		let toast = this.toastCtrl.create({
			message: 'Error capturing image!',
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	  })
  }

	upload() {

		let loader = this.loadCtrl.create({
			content: "Please wait...",
			dismissOnPageChange: true,
			duration: 3000
		  });
		  loader.present();

		  if (this.displayData.displayName != '') { //displayName was updated
			  this.auth.auth.currentUser.updateProfile({
				  displayName: this.displayData.displayName,
				  photoURL: '',
			  }).then(function() {
				  loader.dismiss()
				  console.log("displayName updated" );
			  }).catch(function(error) {
				  console.log(error);
			  })
		  }

		  if (this.captureDataUrl != null) {
			  let storageRef = firebase.storage().ref();

			  //name profile img by UID
			  const filename = this.auth.auth.currentUser.uid;

			  //create reference to image filename
			  const imageRef = storageRef.child('profileImages/'+filename+'.jpg');

			  imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {

				//toast if successful
				loader.dismiss();
				let toast = this.toastCtrl.create({
					message: 'Please enter a title!',
					duration: 3000,
					position: 'bottom'
				});
				toast.present();
				this.captureDataUrl = '';
			  })
		  }

	}

}
