import DBConnection from '../database/handler';
import foodView from './views/food-view.handlebars';

export default class Food {
	constructor(food) {
		this._element = foodView(food);
	}

	get element() {
		return this._element;
	}
}
