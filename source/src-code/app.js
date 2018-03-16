import DBConnection from './database/handler';
import {addElementsToView, listener} from './attach-listeners';

new DBConnection()
	.getAllFood()
	.then(addElementsToView)
	.then(listener);
