import BookShelf from './src/bookstore/BookShelf.js';
import BookRepository from './src/bookstore/BookRepository.js';
import func from './src/bookstore/functions.js';
const bookShelf = new BookShelf(new BookRepository());
let command = process.argv[2];
console.log(process.argv)
// make commands for each one of the functions
// ex. node bookstore.js sum for each function
// CRUD operations 
const actions = {
	sum: () => console.log('Sum of pages',func.sum(bookShelf.books)),
	average: () => console.log('Average number of pages',func.average(bookShelf.books)),
	max: () => console.log('Most Expensive book',func.max(bookShelf.books)),
	min: () => console.log('Least expensive book',func.min(bookShelf.books)),
	create: (title,author,price,pages) => bookShelf.create(title,author,price,pages),
	read: (bookId) =>bookShelf.read(bookId),
	change: (id,property,value) => bookShelf.change(id,property,value),
	remove: (id) => bookShelf.remove(id)
};
if (actions.hasOwnProperty(command)) {
	console.log(actions[command](process.argv[3],process.argv[4],process.argv[5],process.argv[6]) || 'Done');
} else {
	console.log('No idea what you want bro');
}