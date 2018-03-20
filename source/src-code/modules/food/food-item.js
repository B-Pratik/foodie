import DBConnection from '../../database/handler';
import foodView from './views/food-view.handlebars';
import Parser from '../../utils/dom-parser';

export default class Food {
	constructor(food) {
		this._food = food;
		this._element = new Parser().parseString(foodView(food));
		this._element.querySelector('button.add-cart').onclick = this.pushToCart.bind(this);
	}

	get element() {
		return this._element;
	}

	pushToCart(e){
		const index = parseInt(e.target.dataset.vid);
		const dbConnection = new DBConnection();
		dbConnection.addToCart(index);
	}
}
