import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

	title;
	description;
	category;
	itemKey;

  constructor(
	public navCtrl: NavController, 
	public navParams: NavParams,
	private auth: AngularFireAuth,
	private afDB: AngularFireDatabase,
	public toastCtrl: ToastController
	) {

  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad ItemDetailPage');
	
	this.title = this.navParams.get('item').title;
	this.description = this.navParams.get('item').description;
	this.category = this.navParams.get('item').category;
	this.itemKey = this.navParams.get('item').$key;
  }


	deleteItem() {
		var getUserID = this.auth.auth.currentUser.uid;

		console.log("userUID: " + getUserID);

		var deleteNote = this.afDB.database.ref('/notes/').child(getUserID).child(this.itemKey);

		deleteNote.remove();

		let toast = this.toastCtrl.create({
			message: 'Note deleted!',
			duration: 3000,
			position: 'bottom'
		});
		toast.present();

	}

}
