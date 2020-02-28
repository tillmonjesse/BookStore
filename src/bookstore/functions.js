// count all the pages on the book shelf
export function sum(books) {
	let sumOfPages = 0;
	for (let index = 0; index < books.length; index++) {
		sumOfPages = sumOfPages + books[index].pages;
	}
	return sumOfPages;
};
//what is the average number of pages on the bookshelf
export const average = (books) => {
	let averageOfPages = 0;
	for (let index = 0; index < books.length; index++) {
		averageOfPages = averageOfPages + books[index].pages / books.length;
	}
	return averageOfPages;
};
// what is the most expensive and what is the least expensive book title
export function max(books) {
	let mostEpensiveBook = books[0];
	for (let index = 1; index < books.length; index++) {
		if (mostEpensiveBook.price < books[index].price) {
			mostEpensiveBook = books[index];
		}
	}
	return mostEpensiveBook.title;
};
export function min(books) {
	let leastExpensiveBook;
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
