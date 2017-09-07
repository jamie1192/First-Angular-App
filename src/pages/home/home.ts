import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { DataProvider } from '../../providers/data/data';
import { ToastController } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { MyPopOverPage } from '../my-pop-over/my-pop-over';
import { Category } from '../../app/category';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

const CATEGORIES: Category[] = [
	{ icon: 'paper', name: 'All' },
	{ icon: 'bulb', name: 'Inspiration' },
	{ icon: 'book', name: 'Personal' },
	{ icon: 'school', name: 'School' },
	{ icon: 'cart', name: 'Shopping' },
	{ icon: 'done-all', name: 'To-do' },
	{ icon: 'help', name: 'Other' }
]

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})    

export class HomePage {

	dbItems: FirebaseListObservable<any[]>;

	public items = [];	
	public backupArr = [];
	public filterArr = [];

	spanContent;
	background: string;
	contentEle: any;
	textEle: any;
	categories = CATEGORIES;
	selectedCategory;
	categoryPlaceholder = 'All';

	constructor(
		public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public dataService: DataProvider, 
		private toastCtrl: ToastController, 
		public popoverCtrl: PopoverController, 
		private afDB: AngularFireDatabase,
		private auth: AngularFireAuth
	){

		// this.dbItems = afDB.list('/cuisines');

		this.dataService.getData().then((todos) => {

			if(todos){
				this.items = JSON.parse(todos);
				this.filterArr = this.items;
				// this.filterArr = JSON.parse(todos);
				this.spanContent = null;
			}
			else{
				this.spanContent = 'Nothing here yet!';
			}
			// console.log(this.items.length+' length');
		})


	}

	ionViewDidLoad() {

		this.dataService.getData().then((todos) => {
			
			if(todos){
				this.items = JSON.parse(todos);
				this.spanContent = null;
			}
			else{
				this.spanContent = 'Nothing here yet!';
			}
			if (this.items.length == 0) {
				
				this.spanContent = 'Nothing here yet!';
			}
			// else if (this.items.length != 0) {
			// 	this.spanContent = null;
			// }
			// console.log(this.items.length+' length');
		})
	}

	addItem() {
		let addModal = this.modalCtrl.create(AddItemPage);

		this.items = this.filterArr;
		addModal.onDidDismiss((item) => {
			if(item){
				this.saveItem(item);
			}
		});
		addModal.present();
	}

	saveItem(item){
		this.dataService.getData().then((todos) => {
			if(todos){
				this.items = JSON.parse(todos);
				this.filterArr = this.items;
				// this.filterArr = JSON.parse(todos);
				this.spanContent = null;
				this.items.push(item);
				this.dataService.save(this.items);
				this.spanContent = null;
			}
			else{
				this.spanContent = 'Nothing here yet!';
				this.items.push(item);
				this.dataService.save(this.items);
				this.spanContent = null;
			}
			// console.log(this.items.length+' length');
		})
		

		//paste
		// this.dataService.getData().then((todos) => {
			
		// 	if(todos){
		// 		this.items = JSON.parse(todos);
		// 		this.spanContent = null;
		// 	}
		// 	else{
		// 		this.spanContent = 'Nothing here yet!';
		// 	}
		// 	// console.log(this.items.length+' length');
		// })
	}

	viewItem(item) {
		this.navCtrl.push(ItemDetailPage, {
			item: item
		});
	}

	presentPopover(myEvent) {
		let popover = this.popoverCtrl.create(MyPopOverPage);
		popover.present({
			ev: myEvent
		});
		popover.onDidDismiss((popoverData) => {
			this.selectedCategory = popoverData;
			
			console.log(this.selectedCategory+' selected');
			
			if(popoverData != null) { //selected a filter category				
				console.log(popoverData + ' popoverD');
				this.categoryPlaceholder = this.selectedCategory;
				if(popoverData != 'All') {
					this.dataService.getData().then((todos) => {

						if(todos){
							this.items = JSON.parse(todos);
							console.log(this.items + ' if todos read');

							for(var i = 0; i < this.items.length; i++) {
								console.log(this.items + ' for');
								var obj = this.items[i];
								
								// console.log(obj.category.trim()+ ' obj cat');
								// if([this.selectedCategory].indexOf(obj.category.trim()) !== -1) {
								if(obj.category == undefined) {
									this.spanContent = 'Nothing here yet!';
								}

								// //this wors but cuts from this.items
								else if(obj.category.trim() !== this.selectedCategory) {	
									this.items.splice(i, 1);
									console.log(this.items + ' inside');
									i--;
									if(this.items.length == 0) {
										this.spanContent = 'Nothing here yet!';
									}

									// console.log(this.filterArr + ' filter count');
									// this.items = this.filterArr;
									// i--; ?
								}

								// this.items = this.items.filter( function( el ) {
								// 	return this.items.includes( this.selectedCategory );
								//   } );
							
								//   console.log(el.category  + 'el cat');
							}
						}

						else{
							this.spanContent = 'Nothing here yet!';
						}
					})

				// if(this.backupArr == null) { //first time page load
					
				}
				else {
					this.dataService.getData().then((todos) => {
						
						if(todos){
							this.items = JSON.parse(todos);
							this.filterArr = this.items;
							// this.filterArr = JSON.parse(todos);
							console.log(this.items.length+ ' length');
							this.spanContent = null;
						}
						else{
							this.spanContent = 'Nothing here yet!';
						}
					})
				}
			}
			console.log(popoverData + ' debug');
		})
	}


//   TODO
	markDone() {
	//   this.items
	}

	onhold() {
		console.log('list item held');
	}

	pressed(){
		console.log('list item pressed');	
	}

	active() {
		console.log('list item active');
	}
  
	public released(item) {
		console.log('list item released');
		let toast = this.toastCtrl.create({
			message: item.title + ' deleted!',
			duration: 3000,
			position: 'bottom'
		});
		toast.present();

		console.log(this.items);

		// delete this.items[item.title];
		// this.items = this.items;
		// //TODO 
		// // this.items = [];

		for(var i = 0; i < this.items.length; i++) {
			var obj = this.items[i];
		
			if([item.title].indexOf(obj.title) !== -1) {
				this.items.splice(i, 1);
				// i--; ?
			}
		}
		if (this.items.length == 0) {
			
			this.spanContent = 'Nothing here yet!';
		}

		//save edited items again
		this.dataService.save(this.items);
		

		// delete this.items[0][item.title];
		console.log(this.items);

	}

	public filter(category: Category): void {
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

	logout() {
		this.auth.auth.signOut();
		let toast = this.toastCtrl.create({
			message: 'You have been logged out!',
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}
}
