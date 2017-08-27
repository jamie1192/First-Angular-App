import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';

import { HomePage } from '../pages/home/home';
import { Category } from '../app/category';

const CATEGORIES: Category[] = [
	{ icon: 'bulb', name: 'Inspiration' },
	{ icon: 'book', name: 'Personal' },
	{ icon: 'school', name: 'School' },
	{ icon: 'cart', name: 'Shopping' },
	{ icon: 'done-all', name: 'To-do' },
	{ icon: 'help', name: 'Other' }
]

// <ion-option value="Personal">Personal</ion-option>
// <ion-option value="Notes">Notes</ion-option>
// <ion-option value="Shopping List">Shopping List</ion-option>
// <ion-option value="To-do">To-do</ion-option> -->

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	categories = CATEGORIES;

	public items = [];

	selectedCategory;

  	rootPage:any = HomePage;

  	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public dataService: DataProvider) {
    	platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
		});
		// this.dataService.getData().then((todos) => {
			
		// 	if(todos){
		// 		this.items = JSON.parse(todos);
		// 		// this.spanContent = null;
		// 		console.log(this.items);
		// 	}
		// })	

  	}

	categorySelected(category) {
		for(var i = 0; i < this.items.length; i++) {
			var obj = this.items[i];
			// console.log(this.items + 'items');
			if([category.name].indexOf(obj.category) !== -1) {
				this.items.splice(i, 1);
				// i--; ?
				console.log(this.items);
			}
		}
			
	}

	onSelect(category: Category): void {
		this.selectedCategory = category;
		console.log('selected: ' + this.selectedCategory.name);
		for(var i = 0; i < this.items.length; i++) {
			var obj = this.items[i];
			console.log(this.selectedCategory.name + 'items2');
				if([this.selectedCategory.name].indexOf(obj.category) !== -1) {
					this.items.splice(i, 1);
					// i--; ?
					console.log(this.items);
				}
			}
	}
}

