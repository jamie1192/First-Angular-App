import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Category } from '../../app/category';
/**
 * Generated class for the MyPopOverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const CATEGORIES: Category[] = [
	{ icon: 'paper', name: 'All' },
	{ icon: 'bulb', name: 'Inspiration' },
	{ icon: 'book', name: 'Personal' },
	{ icon: 'school', name: 'School' },
	{ icon: 'cart', name: 'Shopping' },
	{ icon: 'done-all', name: 'To-do' },
	{ icon: 'help', name: 'Other' }
]

@IonicPage()
@Component({
	selector: 'page-my-pop-over',
	templateUrl: 'my-pop-over.html',
})
export class MyPopOverPage {

	categories = CATEGORIES;
	selectedCategory;

	constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MyPopOverPage');
	}

	setSelectedTitle(selectedItem: Category): void {
		this.selectedCategory = selectedItem;
		console.log('selected: ' + this.selectedCategory.name);
		// this.selectedCategory = selectedItem;
		this.viewCtrl.dismiss(this.selectedCategory.name);
	}

}
