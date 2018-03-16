import DBConnection from '../database/handler';
import foodView from './views/food-view.handlebars';

export default class Food {
	constructor(food) {
		this._element = foodView(food);
		// this._element = document.createElement('div');
		// this._element.className = 'card';

		// const imageChild = new Image();
		// imageChild.src = food.url;
		// imageChild.className = 'image-child';
		// imageChild.setAttribute('data-src', 'holder.js/100px280/thumb');
		// imageChild.setAttribute('data-holder-rendered', 'true');
		// imageChild.setAttribute('alt', '100%x280');

		// const mediaDiv = document.createElement('div');
		// mediaDiv.className = 'media';

		// const innerMedia = document.createElement('div');
		// innerMedia.className = 'media-left media-middle';

		// const button = document.createElement('button');
		// button.className = 'btn btn-primary';
		// button.innerText = 'Add to cart';
		// button.onclick = this.addToCart.bind(this);

		// innerMedia.appendChild(button);

		// const secondMedia = document.createElement('div');
		// secondMedia.className = 'media-body';

		// const para = document.createElement('p');
		// para.className = 'card-text';
		// para.innerText = food.name + ' - ' + food.price;

		// secondMedia.appendChild(para);

		// mediaDiv.appendChild(innerMedia);
		// mediaDiv.appendChild(secondMedia);

		// this._element.appendChild(imageChild);
		// this._element.appendChild(mediaDiv);
	}

	get element() {
		return this._element;
	}

	addToCart() {
		const connection = new DBConnection();
		return connection.addToCart(this._food);
	}
}
