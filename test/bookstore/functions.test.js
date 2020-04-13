import {sum, average, max, min} from '../../src/bookstore/functions.js';
describe('sum', () => {
	const bookshelf =  
	[
		{
		    "pages": 589
	  	},
	  	{
		    "pages": 201
	  	},
	  	{
		    "pages": 189
  		}
  	];
  	test('test sum of pages', () => {
  		expect(sum(bookshelf)).toBe(589 + 201 + 189);
  	});
  	test('no pages property', () => {
  		bookshelf.push({});
  		expect(sum(bookshelf)).toBeNaN();
  	});
  	test('empty array', () => {
  		expect(sum([])).toBe(0);
  	});
  	test('books is not array', () => {
  		expect(sum()).toBe(0);
  	});
});
describe('average', () => {
	const bookshelf =
	[
		{
		    "pages": 589
	  	},
	  	{
		    "pages": 201
	  	},
	  	{
		    "pages": 189
  		}
	];
	test('test average number of pages', () => {
		expect(average(bookshelf)).toBe((589 + 201 + 189) / 3);
	});
	test('average with no pages property', () => {
		bookshelf.push({});
		expect(average(bookshelf)).toBeNaN();
	});
	test('average with empty array', () => {
		expect(average([])).toBe(0);
	});
	test('average with undefined', () => {
		expect(average()).toBe(0);
	});
});
describe('max', () => {
	const bookshelf =
	[
		{		
			"title": 'anything1',
		    "price": 589
	  	},
	  	{
	  		"title": 'anything2',
		    "price": 201
	  	},
	  	{
	  		"title": 'anything3',
		    "price": 189
  		}
	];
	const bookshelfMaxNotFirst =
	[
		{		
			"title": 'anything4',
		    "price": 89
	  	},
	  	{
	  		"title": 'anything5',
		    "price": 201
	  	},
	  	{
	  		"title": 'anything6',
		    "price": 189
  		}
	];
	test('find the book with the highest price', () => {
		expect(max(bookshelf)).toMatch('anything1');
	});
	test('highest price with max not first', () => {
		expect(max(bookshelfMaxNotFirst)).toMatch('anything5');
	});
	test('with a missing object in the array', () => {
		bookshelf.push({});
		expect(max(bookshelf)).toMatch('anything1');
	});
	test('max with empty array', () => {
		expect(max([])).toMatch('there are no books');
	});
	test('max with no array', () => {
		expect(max()).toMatch('there are no books')
	})
});
describe('max', () => {
	const bookshelf =
	[
		{		
			"title": 'anything1',
		    "price": 589
	  	},
	  	{
	  		"title": 'anything2',
		    "price": 201
	  	},
	  	{
	  		"title": 'anything3',
		    "price": 189
  		}
	];
	test('find the book with the lowest price', () => {
		expect(min(bookshelf)).toMatch('anything3');
	});
	test('min with a missing object', () => {
		bookshelf.push({});
		expect(min(bookshelf)).toMatch('anything3');
	});
	test('min with empty array', () => {
		expect(min([])).toMatch('there are no books');
	});
	test('min with no array', () => {
		expect(min()).toMatch('there are no books');
	});
});