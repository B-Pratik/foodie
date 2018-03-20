import DBConnection from '../../database/handler';
import rowView from './views/cart-view.handlebars';
import Parser from '../../utils/dom-parser';

export default class CartItem {
	constructor(cart) {
		this.dbConnection = new DBConnection();
		this._element = new Parser().parseString(rowView(cart));
		this._element.querySelector('.remove-cart').onclick = this.removeFromCart.bind(this);
		this._element.querySelector('.add-quantity').onclick = this.addQuantity.bind(this);
		this._element.querySelector('.subtract-quantity').onclick = this.subtractQuantity.bind(this);
	}

	get element(){
		return this._element;
	}

	removeFromCart(e) {
		const element = e.target;
		return this.dbConnection.removeFromCart(parseInt(element.dataset.vid))
			.then(() => {
				return element.closest('tbody').removeChild(element.closest('tr'));
			});
	}

	addQuantity(e) {
		const element = e.target;
		return this.dbConnection.addQuantity(parseInt(element.dataset.vid))
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
		return this.dbConnection.removeQuantity(parseInt(element.dataset.vid))
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
