import Cart from '../../modules/cart/load-cart';
import cartView from './cart-view.html';
import Parser from '../../utils/dom-parser';

class CartButton extends HTMLElement {
	constructor() {
		super();
		this.onclick = this.showCart;
		this.setAttribute('class', 'btn btn-primary cart-btn');
		this.innerText = 'Cart';
	}

	collapseCart(){
		const overlay = document.getElementById('overlay');
		overlay.innerHTML = '';
		overlay.classList.add('is-hidden');
	}

	createView() {
		const overlay = document.getElementById('overlay');
		const content = new Parser().parseString(cartView);
		content.querySelector('.button-close').onclick = this.collapseCart;
		overlay.appendChild(content);
	}

	showCart() {
		this.createView();
		const overlay = document.getElementById('overlay');
		const cart = new Cart();
		cart.refreshCart();
		overlay.classList.remove('is-hidden');
	}
}

customElements.define('cart-button', CartButton);
