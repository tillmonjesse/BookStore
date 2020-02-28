import {bookShelf,create,read,change,remove} from './src/bookstore/BookShelf.js';
import func from './src/bookstore/functions.js';
let command = process.argv[2];
console.log(process.argv)
// make commands for each one of the functions
// ex. node bookstore.js sum for each function
// CRUD operations 
const actions = {
	sum: () => console.log('Sum of pages',func.sum(bookShelf)),
	average: () => console.log('Average number of pages',func.average(bookShelf)),
	max: () => console.log('Most Expensive book',func.max(bookShelf)),
	min: () => console.log('Least expensive book',func.min(bookShelf)),
	create: (title,author,price,pages) => create(title,author,price,pages),
	read: (bookId) => read(bookId),
	change: (id,property,value) => change(id,property,value),
	remove: (id) => remove(id)
};
if (actions.hasOwnProperty(command)) {
	console.log(actions[command](process.argv[3],process.argv[4],process.argv[5],process.argv[6]) || 'Done');
} else {
	console.log('No idea what you want bro');
}