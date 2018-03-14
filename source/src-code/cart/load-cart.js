import { getCart } from '../database/handler';
import CartItem from './cart-item';

export default class Cart {
	constructor() {
		this.refreshCart();
	}

	refreshCart() {
		getCart()
			.then((allRecords) => {
				const cartModal = document.getElementById('cart-modal');

				while (cartModal.hasChildNodes()) {
					cartModal.removeChild(cartModal.lastChild);
				}

				allRecords.forEach((_cart) => {
					const cart = new CartItem(_cart);
					cartModal.appendChild(cart.element);
				});
			});
	}
}
