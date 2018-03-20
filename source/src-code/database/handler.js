import DBDriver from './db';
import dummyData from './dummy-data.json';

export default class DBConnection {
	constructor() {
		if (this.connection === undefined) {
			this.connection = new DBDriver().connection;
			this.connection.food.bulkAdd(dummyData).catch(() => { });
		}
	}

	getCart() {
		// gives entire cart.
		return this.connection.cart.toArray();
	}

	addToCart(index) {
		return this.connection.food.get(index)
			.then((item) => {
				item.quantity = 1;
				// manually add 1 quantity to the cart.
				return this.connection.cart.add(item);
			})
	}

	addQuantity(id) {
		return this.connection.cart.get(id)
			.then((cart) => {
				const quantity = ++cart.quantity;
				return this.connection.cart.update(id, { quantity });
			}).catch(() => {
				return alert('element not present');
			});
	}

	removeQuantity(id) {
		return this.connection.cart.get(id)
			.then((cart) => {
				const quantity = --cart.quantity;
				if (quantity <= 0) {
					return alert('can not be made less than 1.');
				}
				return this.connection.cart.update(id, { quantity });
			}).catch(() => {
				return alert('element not present');
			});
	}

	removeFromCart(index) {
		return this.connection.cart.delete(index);
	}

	getAllFood() {
		return this.connection.food.toArray();
	}
}
