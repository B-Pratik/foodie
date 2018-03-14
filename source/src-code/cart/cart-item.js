import { removeFromCart, addQuantity, removeQuantity } from '../database/handler';

export default class CartItem {
	constructor(cart) {
		this._cart = cart;
		this._element = document.createElement('tr');

		const name = document.createElement('td');
		name.innerText = cart.name;

		const imageTD = document.createElement('td');
		const image = new Image();
		image.src = cart.url;
		image.setAttribute('height', '50px');
		image.setAttribute('width', '50px');
		imageTD.appendChild(image);

		const removeTD = document.createElement('td');
		const rImage = new Image();
		rImage.src = 'http://www.iconninja.com/files/970/184/861/del-garbage-recycle-bin-empty-remove-trash-delete-blank-icon.png';
		rImage.setAttribute('height', '30px');
		rImage.setAttribute('width', '25px');
		rImage.onclick = this.removeFromCart.bind(this);
		removeTD.appendChild(rImage);

		const plusTD = document.createElement('td');
		const plusImage = new Image();
		plusImage.src = 'https://s3-ap-southeast-1.amazonaws.com/marquisa-development/general/guestadd.png';
		plusImage.setAttribute('height', '30px');
		plusImage.setAttribute('width', '25px');
		plusImage.onclick = this.addQuantity.bind(this);
		plusTD.appendChild(plusImage);

		const minusTD = document.createElement('td');
		const minusImage = new Image();
		minusImage.src = 'https://s3-ap-southeast-1.amazonaws.com/marquisa-development/general/guestminus.png';
		minusImage.setAttribute('height', '30px');
		minusImage.setAttribute('width', '25px');
		minusImage.onclick = this.subtractQuantity.bind(this);
		minusTD.appendChild(minusImage);

		const quantity = document.createElement('td');
		quantity.innerText = cart.quantity;
		this._element.appendChild(name);
		this._element.appendChild(imageTD);
		this._element.appendChild(quantity);
		this._element.appendChild(removeTD);
		this._element.appendChild(plusTD);
		this._element.appendChild(minusTD);
	}

	get element() {
		return this._element;
	}

	removeFromCart() {
		return removeFromCart(this._cart.id)
			.then(()=>{
				this._element.parentNode.removeChild(this._element);
			});
	}

	addQuantity() {
		return addQuantity(this._cart.id)
			.then(()=>{
				let quntity = parseInt(this._element.childNodes[2].innerText);
				quntity++;
				this._element.childNodes[2].innerText = quntity;
			});
	}

	subtractQuantity() {
		return removeQuantity(this._cart.id)
			.then(()=>{
				let quntity = parseInt(this._element.childNodes[2].innerText);
				quntity--;
				if(quntity) {
					this._element.childNodes[2].innerText = quntity;
				}
			})
	}
}
