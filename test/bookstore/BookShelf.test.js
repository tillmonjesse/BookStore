import BookShelf from '../../src/bookstore/BookShelf.js';
let book =  {
		    "title": "Metal Gear",
		    "author": "Solid Snake",
		    "price": 2999,
		    "pages": 589,
		    "id": "717cb9e2-f1a3-40a0-9f4d-77448c77ed8a"
		  };
let bookRepository;
let bookShelf;
let bookShelfLength;
const setupBookShelf = () => {
	bookShelf = new BookShelf(bookRepository);
	bookShelfLength = bookShelf.books.length;
};
beforeEach(() => {
	bookRepository = {
		save: jest.fn(),
		open: jest.fn(() => {
			return [book];
		})
	};
	
});

describe('constructor', () => {
	test('books array is populated when constructed', () => {
		const bookShelf = new BookShelf(bookRepository);
		expect(bookRepository.open.mock.calls.length).toBe(1);
		expect(bookShelf.books.length).toBe(1);
	});
	test('open throuws an error', () => {
		bookRepository.open.mockImplementationOnce(() => {
			throw new Error('testing');
		});
		expect(() => {
			bookShelf = new BookShelf(bookRepository);
		}).toThrow();
		expect(bookRepository.open.mock.calls.length).toBe(1);
	});
});


describe('read', () => {

	beforeEach(() => {
		setupBookShelf();
	});
	test('displays book for the given id', () => {
	  const readBook = bookShelf.read(book.id);
	  expect(readBook.title).toBe(book.title);
	});

	test('returns error when no match', () => {
	  const message = bookShelf.read('anything');
	  expect(message).toBe('This book does not exist here');
	});

});
// calls expects for open function
// test throw error for open
// test throw error for other CRUD operations
describe('create', () => {
	beforeEach(() => {
		setupBookShelf();
	});
	test('is retrievable', () => {
		const readBook = bookShelf.create('Metal Gear', 'Solid Snake', '2999', '589');
		expect(readBook.title).toBe('Metal Gear');
		expect(readBook.author).toBe('Solid Snake');
		expect(readBook.price).toBe(2999);
		expect(readBook.pages).toBe(589);
		expect(readBook.id).toBeDefined();
		// create book
		// assert created book has id
		// assert prices / pages are number

		// assert bookshelf has 1 more book
		expect(bookShelf.books.length).toBe(2);
		expect(bookRepository.save.mock.calls.length).toBe(1);

	});
	test('price does not have a decimal', () => {
		const message = bookShelf.create('Metal Gear', 'Solid Snake', '15.99', '36.0');
		expect(message).toBe('Cannot have a decimal');
	});
	test('pages does not have a decimal', () => {
		const message = bookShelf.create('Metal Gear', 'Solid Snake', '2999', '36.0');
		expect(message).toBe('Cannot have a decimal');
	});
	test('not enough info', () => {
		const message = bookShelf.create();
		expect(message).toBe('Invalid arguments');
	});
	test('error during save', () => {
		bookRepository.save.mockImplementationOnce(() => {
			throw new Error('testing');
		});
		expect(() => {
			bookShelf.create('Metal Gear', 'Solid Snake', '2999', '589');
		}).toThrow();
	});

});

describe('remove', () => {
	beforeEach(() => {
		setupBookShelf();
	});
	test('is a book id', () => {
		const removeBook = bookShelf.remove(book.id);
		expect(removeBook.title).toBe(book.title);
	});
	test('returns no match', () => {
		const message = bookShelf.remove('anything');
		expect(message).toBe('This book does not exist');
	});
	test('error during save', () => {
		bookRepository.save.mockImplementationOnce(() => {
			throw new Error('testing');
		});
		expect(() => {
			bookShelf.remove(book.id);
		}).toThrow();
	});
});

describe('change', () => {
	beforeEach(() => {
		setupBookShelf();
	});
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
	test('error during save', () => {
		bookRepository.save.mockImplementationOnce(() => {
			throw new Error('testing');
		});
		expect(() => {
			bookShelf.change(book.id, 'pages', '456');
		}).toThrow();
	});
});