import fs from 'fs';
export default class BookRepository {
	save(books) {
		fs.writeFileSync('bookshelf.json',JSON.stringify(books,null,2));
	}
	open() {
		let file = fs.readFileSync('bookshelf.json',{encoding: 'utf8'}); 
		return JSON.parse(file);
	}
};