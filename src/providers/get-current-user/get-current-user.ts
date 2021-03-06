import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/map';

/*
  Generated class for the GetCurrentUserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GetCurrentUserProvider {

  constructor(
	// public http: Http,
	private afAuth: AngularFireAuth) {
    console.log('Hello GetCurrentUserProvider Provider');
  }

  getCurrentUser(){
	  var user = this.afAuth.auth.currentUser.displayName;
	  return user;
  }

}
