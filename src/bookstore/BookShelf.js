import fs from 'fs';
import uuid from 'uuid';
export const bookShelf = open();
function save(books) {
	fs.writeFileSync('bookshelf.json',JSON.stringify(books,null,2));
};
function open() {
	let file = fs.readFileSync('bookshelf.json',{encoding: 'utf8'}); 
	return JSON.parse(file);
};
export const create = (title,author,price,pages) => {
	let book = {
		title,
		author,
		price: parseInt(price),
		pages: parseInt(pages),
		id: uuid.v4()
	};
	bookShelf.push(book);
	save(bookShelf);
	return book;
	//need all info on book
	//needs to be in the same form as a book
	//need to add it to the bookshelf
	//need to save the bookshelf
};
/*bookShelf.forEach((book, index) => {
	book.id = uuid.v4();
});
save(bookShelf);*/
export const read = (bookId) => {
	const id = bookId;
	for (let index = 0; index < bookShelf.length; index++) {
		if (id === bookShelf[index].id) {
			return bookShelf[index];
		} 
	}
	return 'This book does not exist here';
};
//ids don't reuse values figure out in create function
//update
export const change = (id,property,value) => {
	for (let index = 0; index < bookShelf.length; index++) {
		if (id === bookShelf[index].id) {
			if (!bookShelf[index].hasOwnProperty(property)){
				return 'This property does not exist for any book';
			}
			//Refering to bookshlef -> refering to book by index -> refering to property of book by property
			if (property === 'price' || property === 'pages') {
				bookShelf[index][property] = parseInt(value);
			} else {
				bookShelf[index][property] = value;
			}
			save(bookShelf);
			return bookShelf[index];
		}
	}
	return 'This book does not exist here';
};
//select an object to update
//select the property that needs to be updated
//save the updated book

//delete
export const remove = (id) => {
	for (let index = 0; index < bookShelf.length; index++) {
		if (id === bookShelf[index].id) {
			let resultFromSplice = bookShelf.splice(index,1);
			save(bookShelf);
			return resultFromSplice[0];
		}
	}
	return 'This book does not exist';
};