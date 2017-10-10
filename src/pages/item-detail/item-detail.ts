import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { GetCurrentUserProvider } from '../../providers/get-current-user/get-current-user';

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
	key;

  constructor(public navCtrl: NavController, 
	public navParams: NavParams,
	private afDB: AngularFireDatabase,
	private getUser: GetCurrentUserProvider,
) {

  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad ItemDetailPage');
	
	this.title = this.navParams.get('item').title;
	this.description = this.navParams.get('item').description;
	this.category = this.navParams.get('item').category;
	// this.key = this.navParams.get('item').$key;

	// this.description += this.key;
  }

  deleteItem() {

	var getUserID = this.getUser.getCurrentUser().uid;
	console.log("getUID: " + getUserID);

	var deleteNote = this.afDB.database.ref('/notes/').child(getUserID); //.child(this.key);

	console.log(deleteNote);
	deleteNote.remove();
	
// 	let list = this.afDB.list('notes/');

// 	list.first().subscribe((items) => {
		
// 		  // Remove the matching item:
// 		  if (items.length) {
// 			list.remove(items[0].$key)
// 			  .then(() => console.log('removed ' + items[0].$key))
// 			  .catch((error) => console.log(error));
// 		  }
// 		});
  }

}
