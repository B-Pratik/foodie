import Cart from './cart/load-cart';
import DBConnection from './database/handler';

export default class Listeners {
	constructor() {
	}
	setModalListener() {
		document.querySelector('button.cart-btn').addEventListener('click', () => {
			const overlay = document.getElementById('overlay');
			const cart = new Cart();
			cart.refreshCart();
			overlay.classList.remove('is-hidden');
		}, false);
	}

	setCloseModalListener() {
		document.querySelector('span.button-close').addEventListener('click', () => {
			const overlay = document.getElementById('overlay');
			overlay.classList.add('is-hidden');
		}, false);
	}

	setAllListeners() {
		this.setModalListener();
		this.setCloseModalListener();
	}
}
