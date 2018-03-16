import Dexie from 'dexie';

export default class DBDriver {
	constructor() {
		if(this._connection === undefined){
			this._connection = new Dexie('MyDatabase');
			this._connection.version(1).stores({
				food: 'id, name',
				cart: 'id'
			});
		}
	}

	get connection() {
		return this._connection;
	}
}
