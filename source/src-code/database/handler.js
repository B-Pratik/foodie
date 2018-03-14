import db from './db';

export function getCart() {
	return db.cart.toArray();
}

export function addToCart(item) {
	item.quantity = 1;
	return db.cart.add(item);
}

export function addQuantity(id) {
	return db.cart.get(id)
		.then((cart) => {
			const quantity = ++cart.quantity;
			return db.cart.update(id, { quantity });
		}).catch((e) => {
			return alert('element not present');
		});
}

export function removeQuantity(id) {
	return db.cart.get(id)
		.then((cart) => {
			const quantity = --cart.quantity;
			return db.cart.update(id, { quantity });
		}).catch(() => {
			return alert('element not present');
		});
}

export function removeFromCart(index) {
	return db.cart.delete(index);
}

export function getAllFood() {
	return db.food.toArray();
}

// let's add dummy food data
db.food.bulkAdd([
	{ id: 0, name: 'Burger', url: 'https://assets-cdn.mrhyde.com/app/uploads/2018/02/28125227/get-50-off-food-at-old-st-cafe-3-256x256.jpg' },
	{ id: 1, name: 'Pizza' },
	{ id: 2, name: 'Pasta' },
	{ id: 3, name: 'Maggie' },
	{ id: 4, name: 'Pohe' },
	{ id: 5, name: 'Samosa' },
	{ id: 6, name: 'Upma' },
	{ id: 7, name: 'Sandwich', url: 'http://images.bigoven.com/image/upload/t_recipe-256/cali-style-fried-egg-sandwich-4a1bd7.jpg' }
]).catch(() => { });
