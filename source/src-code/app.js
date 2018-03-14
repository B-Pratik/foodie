import {getAllFood, addToCart, addQuantity, getCart} from './database/handler';
import Food from './food/food-item';
import Cart from './cart/load-cart';

function addElementsToView(array) {
	const container = document.getElementById('row-container');
	array.forEach((_food)=>{
		const food = new Food(_food);
		container.appendChild(food.element);
	});
}

const overlay = document.getElementById('overlay');

const cart = new Cart();
window.openModal = function(){
	cart.refreshCart();
  overlay.classList.remove("is-hidden");
};

window.closeModal = function(){
  overlay.classList.add("is-hidden");
};

getAllFood()
	.then(addElementsToView);
