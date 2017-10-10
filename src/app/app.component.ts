import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';

import { HomePage } from '../pages/home/home';
import { Category } from '../app/category';
import { LoginPage } from '../pages/login/login';
import { RegisterDisplayNamePage } from '../pages/register-display-name/register-display-name';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';

import { AngularFireAuth } from 'angularfire2/auth';


const CATEGORIES: Category[] = [
	{ icon: 'bulb', name: 'Inspiration' },
	{ icon: 'book', name: 'Personal' },
	{ icon: 'school', name: 'School' },
	{ icon: 'cart', name: 'Shopping' },
	{ icon: 'done-all', name: 'To-do' },
	{ icon: 'help', name: 'Other' }
]

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	categories = CATEGORIES;

	public items = [];

	selectedCategory;
	displayName;
	userEmail;
	photoURL;

	rootPage:any; //= LoginPage;
	  

	constructor( 
		platform: Platform, 
		statusBar: StatusBar, 
		splashScreen: SplashScreen, 
		public dataService: DataProvider,
		public menuCtrl: MenuController,
		private afAuth: AngularFireAuth,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController) {
			
			this.afAuth.authState.subscribe(auth => {
				if(!auth){
					console.log(auth + ' subscribe login redir')
					this.rootPage = LoginPage;
				}
				else if(!this.afAuth.auth.currentUser.displayName){
					console.log(auth + ' subscribe register redir')
					this.rootPage = RegisterDisplayNamePage;
				}
				else{
					console.log(auth + ' subscribe homepage redir')
					this.rootPage = HomePage;
					this.displayName = auth.displayName;
					this.userEmail = auth.email;
					this.photoURL = auth.photoURL;
				}
			});
		
			platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
		});
	  }
	  
	  consoleTest() {
		  console.log('Hello test');
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

		this.afAuth.auth.signOut()
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

	updateProfile() {
		this.menuCtrl.close();
		this.nav.push(UpdateProfilePage);
	}
}

