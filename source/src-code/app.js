import C from './home/home-page';
import {getAllFood, addToCart, addQuantity, getCart} from './database/handler';

getAllFood()
	.then((allFood)=>{
		const first = allFood[0];
		return true;
	})
	.then(()=>{
		return addQuantity(0);
	})
	.then(()=>{
		return getCart();
	})
	.then((allCart)=>{
		const foodTray = document.getElementById('food-item');
		foodTray.innerHTML = allCart.map((e)=>e.quantity).join();
	})
	.catch(console.error);
