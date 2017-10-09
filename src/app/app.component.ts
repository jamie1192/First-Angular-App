import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { DomSanitizer } from '@angular/platform-browser';

import { HomePage } from '../pages/home/home';
import { Category } from '../app/category';
import { LoginPage } from '../pages/login/login';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { RegisterDisplayNamePage } from '../pages/register-display-name/register-display-name';
// import { RegisterPage } from '../pages/register/register';

import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';


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
	photoURL;
	userEmail;
	userUID;
	pathReference;

	rootPage:any; //= LoginPage;
	  

	constructor( 
		platform: Platform, 
		statusBar: StatusBar, 
		splashScreen: SplashScreen, 
		public dataService: DataProvider,
		public menu: MenuController,
		private afAuth: AngularFireAuth,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
		private sanitizer: DomSanitizer
	) {
			
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
					this.photoURL = auth.photoURL;
					this.userEmail = auth.email;
					this.userUID = auth.uid;
					console.log("UID: " +this.userUID)

					//get profile image
					// var storage = firebase.storage();
					// var storageRef = storage.ref();
					// this.pathReference = storage.ref('profileImages/'+this.userUID+'.jpg');
					// var refURL = 'gs://crossappstasker.appspot.com/profileImages/'+this.userUID+'.jpg';
					// this.pathReference = ;
					// var gsReference = storage.refFromURL('gs://crossappstasker.appspot.com/profileImages/');
					// console.log('profileImages/'+this.userUID+'.jpg');

					// storageRef.child('profileImages/'+this.userUID+'.jpg').getDownloadURL().then(function(url) {
					// 	// This can be downloaded directly:
					//  // This can be downloaded directly:
					// 	// var xhr = new XMLHttpRequest();
					// 	// xhr.responseType = 'blob';
					// 	// xhr.onload = function(event) {
					// 	// 	var blob = xhr.response;
					// 	// 	console.log("blob: " + blob);
					// 	// };
					// 	// xhr.open('GET', url);
					// 	// xhr.send();
						
					// 	// Or inserted into an <img> element:
					// 	var img = document.getElementById('profilePic') as HTMLImageElement;;
					// 	img.src = url;

					// 	// this.photoURL = url;
					// 	// this.photoURL = sanitizer.bypassSecurityTrustUrl(url);
					// }).catch(function(error) {
					// 	console.log(error);
					// });
					// console.log("debug2: " +this.photoURL);
					// this.pathReference = "https://firebasestorage.googleapis.com/v0/b/crossappstasker.appspot.com/o/profileImages%2F"+this.userUID+".jpg?alt=media&token=8f5e824d-1814-4f94-97d1-6c7bc6d411dc";
					
					// var tempPhotoURL = storage.refFromURL(this.pathReference).getDownloadURL().then(function(url) {

					// 	this.photoURL = tempPhotoURL;

					// 	}).catch(function(error) {

					// 	});
					// console.log("PRTest: " +this.pathReference)
					// this.pathReference.getDownloadURL().then(function(url) {
					// 	this.photoURL = url;
					// 	console.log(url);
					// });
					// this.photoURL = sanitizer.bypassSecurityTrustUrl(this.pathReference);
					// this.photoURL = this.pathReference;
					// console.log("photo: "+ this.photoURL);
				}
			});
			// https://firebasestorage.googleapis.com/v0/b/crossappstasker.appspot.com/o/profileImages%2F8fhEaNvXCeNAoBbh7i1fFDRYn833.jpg?alt=media&token=8f5e824d-1814-4f94-97d1-6c7bc6d411dc

			

			//track displayName
		this.afAuth.authState.subscribe(user => {
			// this.photoURL = user.photoURL;
			// if (!user.displayName) {
			// 	this.displayName = null;
			// 	return;
			// }
			// else{
			// 	this.displayName = user.displayName;
			// 	this.userEmail = user.email;
			// 	this.rootPage = HomePage;
			// 	return;
			// }
			console.log(user);
		})
		
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

	updateProfile(){
		this.nav.push(UpdateProfilePage);
	}
}

