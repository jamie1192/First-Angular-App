import { Component } from '@angular/core';
import { ModalController, NavController, LoadingController, MenuController } from 'ionic-angular';
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

	displayName;

	items: FirebaseListObservable<any[]>;

	// public items = [];	
	public backupArr = [];
	public filterArr = [];

	spanContent;
	itemCount;
	background: string;
	contentEle: any;
	textEle: any;
	categories = CATEGORIES;
	selectedCategory;
	categoryPlaceholder = 'All';
	userUID;

	constructor(
		public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public dataService: DataProvider, 
		private toastCtrl: ToastController,
		public loadingCtrl: LoadingController, 
		public popoverCtrl: PopoverController, 
		private afDB: AngularFireDatabase,
		private auth: AngularFireAuth,
		private menuCtrl: MenuController

	){
		this.userUID = this.auth.auth.currentUser.uid;

		this.items = afDB.list('/notes/'+this.userUID);
	}



	ionViewDidLoad() {

		console.log("FBase items: " +this.itemCount);

		if(!this.items) {
			this.spanContent = "Nothing here yet!";
		}
	}



	addItem() {
		let addModal = this.modalCtrl.create(AddItemPage);

		// this.items = this.filterArr;
		addModal.onDidDismiss((item) => {
			if(item){
				this.saveItem(item); //modal dismissed, save passed item
			}
		});
		addModal.present();
	}

	saveItem(item){
		
		// 		// save() {
				this.afDB.database.ref('notes/'+this.userUID).push().set({
					title: item.title,
					description: item.description,
					// category: item.category,
					author: item.author
				});
				// } end save
			}
			
	viewItem(item) {
		this.navCtrl.push(ItemDetailPage, {
			item: item
		});
		console.log(item);
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

							for(var i = 0; i < 6; i++) {
								console.log(this.items + ' for');
								var obj = this.items[i];
								
								// console.log(obj.category.trim()+ ' obj cat');
								// if([this.selectedCategory].indexOf(obj.category.trim()) !== -1) {
								if(obj.category == undefined) {
									this.spanContent = 'Nothing here yet!';
								}

								// //this works but cuts from this.items
								else if(obj.category.trim() !== this.selectedCategory) {	
									// this.items.splice(i, 1);
									console.log(this.items + ' inside');
									i--;
									// if(this.items.length == 0) {
									// 	this.spanContent = 'Nothing here yet!';
									// }

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
					// this.dataService.getData().then((todos) => {
						
					// 	if(todos){
					// 		this.items = JSON.parse(todos);
					// 		this.filterArr = this.items;
					// 		// this.filterArr = JSON.parse(todos);
					// 		console.log(this.items.length+ ' length');
					// 		this.spanContent = null;
					// 	}
					// 	else{
					// 		this.spanContent = 'Nothing here yet!';
					// 	}
					// })
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
  
	
	logout() {
		//Show loaders and toast, still within scope of constructor to access
		let loader = this.loadingCtrl.create({
			content: "Logging Out...",
			dismissOnPageChange: true,
			duration: 3000
		});
		loader.present();

		let toast = this.toastCtrl.create({
			message: 'You have been logged out!',
			duration: 3000,
			position: 'bottom'
		});

		this.auth.auth.signOut()
		.then(function() {
			//signed out
			toast.present();
			loader.dismiss();

		}, function(error) {
			//Error - I gon' dun goofed?
			console.log(error);
			let errorToast = this.toastCtrl.create({
				message: error,
				duration: 3000,
				position: 'bottom'
			});
			//Dismiss loaders and show error toast
			loader.dismiss();
			errorToast.present();
		});
	}
	
}
