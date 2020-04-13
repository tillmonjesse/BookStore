import BookShelf from '../../src/bookstore/BookShelf.js';
import BookRepository from '../../src/bookstore/BookRepository.js';
const bookShelf = new BookShelf(new BookRepository());
let bookShelfLength;
let book;
beforeEach(() => {
	bookShelfLength = bookShelf.books.length;
	book = bookShelf.create('Turtle House', 'Jon Holewa', '1599', '360');
	book = JSON.parse(JSON.stringify(book));
});

afterEach(() => {
	bookShelf.remove(book.id);
});


describe('read', () => {

	test('displays book for the given id', () => {
	  const readBook = bookShelf.read(book.id);
	  expect(readBook.title).toBe(book.title);
	});

	test('returns error when no match', () => {
	  const message = bookShelf.read('anything');
	  expect(message).toBe('This book does not exist here');
	});

});


describe('create', () => {

	test('is retrievable', () => {
		expect(book.title).toBe('Turtle House');
		expect(book.author).toBe('Jon Holewa');
		expect(book.price).toBe(1599);
		expect(book.pages).toBe(360);
		expect(book.id).toBeDefined();
		// create book
		// assert created book has id
		// assert prices / pages are number

		// assert bookshelf has 1 more book
		expect(bookShelf.books.length).toBe(bookShelfLength + 1);

	});
	test('price does not have a decimal', () => {
		const message = bookShelf.create('Turtle House', 'Jon Holewa', '15.99', '36.0');
		expect(message).toBe('Cannot have a decimal');
	});
	test('pages does not have a decimal', () => {
		const message = bookShelf.create('Turtle House', 'Jon Holewa', '1599', '36.0');
		expect(message).toBe('Cannot have a decimal');
	});
	test('not enough info', () => {
		const message = bookShelf.create();
		expect(message).toBe('Invalid arguments');
	});

});

describe('remove', () => {
	test('is a book id', () => {
		const removeBook = bookShelf.remove(book.id);
		expect(removeBook.title).toBe(book.title);
	});
	test('returns no match', () => {
		const message = bookShelf.remove('anything');
		expect(message).toBe('This book does not exist');
	});
});

describe('change', () => {
	test('changing property value', () => {
		let changeBook = bookShelf.change(book.id, 'title', 'anything');
		expect(changeBook.title).toBe('anything');
		changeBook = bookShelf.change(book.id, 'author', 'anything');
		expect(changeBook.author).toBe('anything');
		changeBook = bookShelf.change(book.id, 'price', '456');
		expect(changeBook.price).toBe(456);
		changeBook = bookShelf.change(book.id, 'pages', '456');
		expect(changeBook.pages).toBe(456);
	});
	test('making sure id is not changing', () => {
		const message = bookShelf.change(book.id, 'id', 'anything');
		expect(message).toBe('Cannot change id');
	});
	test('does this property exist', () => {
		const message = bookShelf.change(book.id, 'anything', 'anything');
		expect(message).toBe('This property does not exist for any book');
	});
	test('make sure price does not have a decimal', () => {
		let message = bookShelf.change(book.id, 'price', '3.5');
		expect(message).toBe('Cannot have a decimal');
		message = bookShelf.change(book.id, 'pages', '3.5');
		expect(message).toBe('Cannot have a decimal');
	});
	test('make sure id exists', () => {
		const message = bookShelf.change('anything', 'anything', 'anything');
		expect(message).toBe('This book does not exist here');
	});
});