import uuid from 'uuid';

export default class BookShelf {
	constructor(bookRepository) {
		this.bookRepository = bookRepository;
		this.books = this.bookRepository.open();
	}
	create(title,author,price,pages) {
		if (
			typeof title !== 'string' ||
			typeof author !== 'string' ||
			typeof price !== 'string' ||
			typeof pages !== 'string'
		) {
			return 'Invalid arguments';
		}
		if (!/^\d+$/.test(price) || !/^\d+$/.test(pages)) { 
			return 'Cannot have a decimal';
		}
		let book = {
			title,
			author,
			price: parseInt(price),
			pages: parseInt(pages),
			id: uuid.v4()
		};
		this.books.push(book);
		this.bookRepository.save(this.books);
		return book;
		//need all info on book
		//needs to be in the same form as a book
		//need to add it to the bookshelf
		//need to save the bookshelf
	}
/*this.books.forEach((book, index) => {
	book.id = uuid.v4();
});
save(this.books);*/
	read(bookId)  {
		const id = bookId;
		for (let index = 0; index < this.books.length; index++) {
			if (id === this.books[index].id) {
				return this.books[index];
			} 
		}
		return 'This book does not exist here';
	}
	//ids don't reuse values figure out in create function
	//update
	change(id,property,value) {
		if (property === 'id') {
			return 'Cannot change id';
		}
		for (let index = 0; index < this.books.length; index++) {
			if (id === this.books[index].id) {
				if (!this.books[index].hasOwnProperty(property)){
					return 'This property does not exist for any book';
				}
				//Refering to bookshlef -> refering to book by index -> refering to property of book by property
				if (property === 'price' || property === 'pages') {
					if (!/^\d+$/.test(value)) { 
						return 'Cannot have a decimal';
					}
					this.books[index][property] = parseInt(value);
				} else {
					this.books[index][property] = value;
				}
				this.bookRepository.save(this.books);
				return this.books[index];
			}
		}
		return 'This book does not exist here';
	}
	//select an object to update
	//select the property that needs to be updated
	//save the updated book

	//delete
	remove(id) {
		for (let index = 0; index < this.books.length; index++) {
			if (id === this.books[index].id) {
				let resultFromSplice = this.books.splice(index,1);
				this.bookRepository.save(this.books);
				return resultFromSplice[0];
			}
		}
		return 'This book does not exist';
	}
};