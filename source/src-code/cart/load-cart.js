import { getCart } from '../database/handler';
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
		allRecords.forEach((_cart) => {
			const cart = new CartItem();
			cartModal.insertAdjacentHTML('afterbegin', cart.getCartElement(_cart));
			//cartModal.appendChild(cart.element);
		});
	}

	attachListeners() {
		const allRemove = document.querySelectorAll('.remove-cart');
		allRemove.forEach((_ele) => {
			_ele.addEventListener('click', CartItem.removeFromCart, false);
		});

		const allAdd = document.querySelectorAll('.add-quantity');
		allAdd.forEach((_ele) => {
			_ele.addEventListener('click', CartItem.addQuantity, false);
		});

		const allSubtract = document.querySelectorAll('.subtract-quantity');
		allSubtract.forEach((_ele) => {
			_ele.addEventListener('click', CartItem.subtractQuantity, false);
		});
	}

	refreshCart() {
		return getCart()
			.then(this.emptyCart)
			.then(this.fillCart)
			.then(() => {
				return new Promise((resolve) => {
					// breath time for ui
					return setTimeout(resolve, 0);
				});
			})
			.then(this.attachListeners);
	}
}
