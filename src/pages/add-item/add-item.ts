import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Category } from '../../app/category';

import { GetCurrentUserProvider } from '../../providers/get-current-user/get-current-user';

import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the AddItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.	
 */

const CATEGORIES: Category[] = [
	// { icon: 'paper', name: 'All' },
	{ icon: 'bulb', name: 'Inspiration' },
	{ icon: 'book', name: 'Personal' },
	{ icon: 'school', name: 'School' },
	{ icon: 'cart', name: 'Shopping' },
	{ icon: 'done-all', name: "To-do" },
	{ icon: 'help', name: 'Other' }
]

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})

export class AddItemPage {

	title;
	description;
	categIcon;
	categories = CATEGORIES;
	selectedCategory: Category;
	selectedCategoryIcon;

	currentUser;

constructor(
	public navCtrl: NavController, 
	public navParams: NavParams, 
	public view: ViewController, 
	private getUser: GetCurrentUserProvider,
	private auth: AngularFireAuth,
	private toastCtrl: ToastController) {
}

saveItem() {

	// var trimmedIcon = this.selectedCategory.icon.trim();
	// var trimmedIcon = this.selectedCategoryIcon;

	// while(obj.name != undefined) {
	// for(var i=0; this.selectedCategoryIcon == undefined; i++) {
	// 	var obj = CATEGORIES[i];
		
	// 	var nameString = this.selectedCategory.toString();
	// 	console.log('slot: ' + i);
	// 	console.log(obj.icon + ' category slot ' + i);
	// 	console.log(nameString + ' namestring');
	// 	console.log(obj.name + ' obj.name');
	// 	if (obj.name == nameString) {
	// 		this.selectedCategoryIcon = obj.icon;
	// 	}	
	// }
	

	console.log(this.title+' title length');
	let newItem = {
		title: this.title,
		description: this.description,
		// category: this.selectedCategory,
		author: this.currentUser,
		// categIcon: this.selectedCategoryIcon
	};

	console.log(this.categIcon + ' Icon after save');

	// var titleTrim = this.title;
	// console.log(this.title.count+'new count');
	if(this.title == undefined){
		let toast = this.toastCtrl.create({
			message: 'Please enter a title!',
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}


	else if(this.title.trim() == 0){
		console.log('trim');
		let toast = this.toastCtrl.create({
			message: 'Please enter a title!',
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}

	else if(this.title != null){
		this.view.dismiss(newItem);
		let toast = this.toastCtrl.create({
			message: this.title + ' saved!',
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}
	

	else{
		let toast = this.toastCtrl.create({
			message: 'Please enter a title!',
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}
}

close() {
	this.view.dismiss();
}

onSelect(category: Category): void {
	
	console.log(this.selectedCategory + ' selected');
	this.selectedCategory = category;
	// this.selectedCategoryIcon = icon;
	
	// console.log(this.selectedCategoryIcon + ' icon name');

}

  ionViewDidLoad() {
	console.log('ionViewDidLoad AddItemPage');
	this.currentUser = this.getUser.getCurrentUser();
	console.log('current user is - ' + this.currentUser);
  }

}
