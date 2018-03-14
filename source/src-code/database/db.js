import Dexie from 'dexie';

const db = new Dexie('MyDatabase');

db.version(1).stores({
    food: 'id, name',
    cart: 'id'
});

export default db;
