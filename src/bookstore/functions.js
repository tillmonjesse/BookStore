// count all the pages on the book shelf
export function sum(books) {
	let sumOfPages = 0;
	for (let index = 0; books instanceof Array && index < books.length; index++) {
		sumOfPages = sumOfPages + books[index].pages;
	}
	return sumOfPages;
};
//what is the average number of pages on the bookshelf
export const average = (books) => {
	if (!(books instanceof Array) || books.length === 0) {
		return 0;
	} else { 
		return sum(books) / books.length;
	}
};
// what is the most expensive and what is the least expensive book title
export function max(books) {
	if (!(books instanceof Array) || books.length === 0) {
			return 'there are no books';
		}
	let mostExpensiveBook = books[0];
	for (let index = 1; index < books.length; index++) {
		if (mostExpensiveBook.price < books[index].price) {
			mostExpensiveBook = books[index];
		}
	}
	return mostExpensiveBook.title;
};
export function min(books) {
	let leastExpensiveBook;
	if (!(books instanceof Array) || books.length === 0) {
			return 'there are no books';
		}
	for (let index = 0; index < books.length; index++) {
		if (leastExpensiveBook === undefined || leastExpensiveBook.price > books[index].price) {
			leastExpensiveBook = books[index];
		}
	}
	return leastExpensiveBook.title;
};
export default {
	sum,
	average,
	max,
	min
};
