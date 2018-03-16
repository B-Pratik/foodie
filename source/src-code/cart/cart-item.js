import { removeFromCart, addQuantity, removeQuantity } from '../database/handler';
import rowView from './views/cart-view.handlebars';

export default class CartItem {
	constructor() {
	}

	createCartItem(cart) {
		this._element = rowView(cart);
		return this._element;
	}

	removeFromCart(e) {
		const element = e.target;
		return removeFromCart(parseInt(element.dataset.vid))
			.then(() => {
				return element.closest('tbody').removeChild(element.closest('tr'));
			});
	}

	addQuantity(e) {
		const element = e.target;
		return addQuantity(parseInt(element.dataset.vid))
			.then(() => {
				const target = element.closest('tr').childNodes[5];
				let quantity = parseInt(target.innerText);
				quantity++;
				target.innerText = quantity;
				return quantity;
			});
	}

	subtractQuantity(e) {
		const element = e.target;
		return removeQuantity(parseInt(element.dataset.vid))
			.then(() => {
				const target = element.closest('tr').childNodes[5];
				let quantity = parseInt(target.innerText);
				quantity--;
				if (quantity) {
					target.innerText = quantity;
				}
				return quantity;
			});
	}
}
