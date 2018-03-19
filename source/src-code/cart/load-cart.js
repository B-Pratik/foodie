import DBConnection from '../database/handler';
import CartItem from './cart-item';

export default class Cart {
	constructor() {
		this.refreshCart();
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

	// attachListeners() {
	// 	const cart = new CartItem();
	// 	const allRemove = document.querySelectorAll('.remove-cart');
	// 	allRemove.forEach((_ele) => {
	// 		_ele.addEventListener('click', cart.removeFromCart.bind(cart), false);
	// 	});

	// 	const allAdd = document.querySelectorAll('.add-quantity');
	// 	allAdd.forEach((_ele) => {
	// 		_ele.addEventListener('click', cart.addQuantity.bind(cart), false);
	// 	});

	// 	const allSubtract = document.querySelectorAll('.subtract-quantity');
	// 	allSubtract.forEach((_ele) => {
	// 		_ele.addEventListener('click', cart.subtractQuantity.bind(cart), false);
	// 	});
	// }

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
