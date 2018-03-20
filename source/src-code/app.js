import './customs/cart/cart-element';
import DBConnection from './database/handler';
import Food from './modules/food/food-item';

new class Initiate {
	constructor() {
		this.prepareData()
			.then(this.fillData);
	}

	prepareData() {
		return new DBConnection()
			.getAllFood();
	}

	fillData(allFood) {
		const container = document.getElementById('row-container');
		allFood.forEach(_food => {
			const food = new Food(_food);
			container.appendChild(food.element);
		});
		return true;
	}
}();
