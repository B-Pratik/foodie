import DBConnection from './database/handler';
import Listeners from './attach-listeners';
import Food from './food/food-item';

new class Initiate {
	constructor() {
		this.prepareData()
			.then(this.fillData)
			.then(this.addListeners)
	}

	prepareData() {
		return new DBConnection()
			.getAllFood();
	}

	fillData(allFood) {
		const container = document.getElementById('row-container');
		allFood.forEach(_food => {
			const food = new Food(_food);
			container.insertAdjacentHTML('afterbegin', food.element);
		});
		return true;
	}

	addListeners(){
		new Listeners().setAllListeners();
	}
}();
