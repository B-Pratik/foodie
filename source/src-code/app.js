import {getAllFood} from './database/handler';
import {addElementsToView, listener} from './attach-listeners';

getAllFood()
	.then(addElementsToView)
	.then(listener);
