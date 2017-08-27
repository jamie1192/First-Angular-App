import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {
//public http: Http, 
	constructor( public storage: Storage) {
		console.log('Hello DataProvider Provider');
	}

	getData() {
		return this.storage.get('todos');
	}

	save(data) {
		let newData = JSON.stringify(data);
		this.storage.set('todos', newData);
	}

}

