import DBConnection from '../database/handler';
import CartItem from './cart-item';

export default class Cart {
	constructor() {
	}

	emptyCart(records) {
		const cartModal = document.getElementById('cart-modal');

		while (cartModal.hasChildNodes()) {
			cartModal.removeChild(cartModal.lastChild);
		}
		return records;
		// records are returned as is to use in next promise.
	}

	fillCart(allRecords) {
		const cartModal = document.getElementById('cart-modal');
		allRecords.forEach((_item) => {
			const cart = new CartItem(_item);
			//cartModal.insertAdjacentHTML('afterbegin', cart.createCartItem(_item));
			cartModal.appendChild(cart.element);
		});
	}

	refreshCart() {
		const dbConnection = new DBConnection();
		return dbConnection.getCart()
			.then(this.emptyCart)
			.then(this.fillCart)
			.then(() => {
				return new Promise((resolve) => {
					// breath time for ui
					return setTimeout(resolve, 0);
				});
			});
	}
}
