import DBDriver from './db';

export default class DBConnection {
	constructor() {
		if (this.connection === undefined) {
			this.connection = new DBDriver().connection;
			this.connection.food.bulkAdd([
				{ id: 0, name: 'Burger', url: 'https://assets-cdn.mrhyde.com/app/uploads/2018/02/28125227/get-50-off-food-at-old-st-cafe-3-256x256.jpg', price: '$10' },
				{ id: 1, name: 'Pizza', url: 'https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg', price: '$20' },
				{ id: 2, name: 'Pasta', url: 'http://images.bigoven.com/image/upload/t_recipe-256/halloumi-and-tomato-pasta-6f3d4c.jpg', price: '$6' },
				{ id: 3, name: 'Maggie', url: 'https://i1.wp.com/media.hungryforever.com/wp-content/uploads/2017/07/14111459/veg-maggi-recipe.jpg?w=1269&strip=all&quality=80', price: '$3' },
				{ id: 4, name: 'Pohe', url: 'http://1.bp.blogspot.com/-c3A1bUDDtf0/VQTSe4o9XGI/AAAAAAAABBQ/bK3Sjeggei0/s1600/IMG_3718.JPG', price: '$2' },
				{ id: 5, name: 'Samosa', url: 'http://sanjhindianrestaurant.com.au/wp-content/uploads/2002/01/2.Vegetable-Samosa-.jpg', price: '$2' },
				{ id: 6, name: 'Upma', url: 'https://i2.wp.com/kalimirchbysmita.com/wp-content/uploads/2015/04/Vegetable_Upma-1438-11-1024x715-1024x715.jpg?resize=1024%2C715', price: '$2' },
				{ id: 7, name: 'Sandwich', url: 'http://images.bigoven.com/image/upload/t_recipe-256/cali-style-fried-egg-sandwich-4a1bd7.jpg', price: '$3' },
				{ id: 8, name: 'Momo', url: 'https://i0.wp.com/www.theindianfoodies.com/wp-content/uploads/2016/02/momo3-1.jpg?fit=614%2C409', price: '$4' },
				{ id: 9, name: 'Dhokala', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBSc2nebyNEvbgfFBf1wzXO61ogBak1k2mzWwG2yL9CvCb1Q-M', price: '$6' },
				{ id: 10, name: 'Dosa', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDs84glIb4mF2gPXGPl91EFdHBMfnqJ3ZpUi_x3-upGDcTsDlH', price: '$8' },
				{ id: 11, name: 'Ice cream', url: 'http://media.hungryforever.com/wp-content/uploads/2016/02/04184729/Ice-Cream-In-Hyderabad.jpg', price: '$7' },
				{ id: 12, name: 'Jilebi', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBYsZjDSF2TKX43VFwvqVv2SDtzXp5fyrq6-G9gBIN3ajHxJSgXA', price: '$7' },
				{ id: 13, name: 'Pani Puri', url: 'http://3.bp.blogspot.com/-fUd0rrBYpF8/Uy2KbhoTTVI/AAAAAAAAO48/v5p-8ujn3XU/s1600/IMG_2803.jpg', price: '$3' },
				{ id: 14, name: 'Pulav', url: 'https://nishamadhulika.com/images/navratan-pulao-recipe.jpg', price: '$8' }
			]).catch(() => { });
		}
	}

	getCart() {
		// gives entire cart.
		return this.connection.cart.toArray();
	}

	addToCart(index) {
		return this.connection.food.get(index)
			.then((item) => {
				item.quantity = 1;
				// manually add 1 quantity to the cart.
				return this.connection.cart.add(item);
			})
	}

	addQuantity(id) {
		return this.connection.cart.get(id)
			.then((cart) => {
				const quantity = ++cart.quantity;
				return this.connection.cart.update(id, { quantity });
			}).catch(() => {
				return alert('element not present');
			});
	}

	removeQuantity(id) {
		return this.connection.cart.get(id)
			.then((cart) => {
				const quantity = --cart.quantity;
				if (quantity <= 0) {
					return alert('can not be made less than 1.');
				}
				return this.connection.cart.update(id, { quantity });
			}).catch(() => {
				return alert('element not present');
			});
	}

	removeFromCart(index) {
		return this.connection.cart.delete(index);
	}

	getAllFood() {
		return this.connection.food.toArray();
	}
}
