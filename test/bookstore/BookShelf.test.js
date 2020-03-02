import {bookShelf,create,read,change,remove} from '../../src/bookstore/BookShelf.js';

it('read displays book for the given id', () => {
  const book = read('c7aa70e7-edfe-4593-999e-a6656d744146');
  expect(book.title).toBe('Gundam');
});