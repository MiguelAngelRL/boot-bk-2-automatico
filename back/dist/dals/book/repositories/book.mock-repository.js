"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockRepository = void 0;

var _mongodb = require("mongodb");

var _mockData = require("../../mock-data");

const insertBook = book => {
  const _id = new _mongodb.ObjectId();

  const newBook = { ...book,
    _id
  };
  _mockData.db.books = [..._mockData.db.books, newBook];
  return newBook;
};

const updateBook = book => {
  _mockData.db.books = _mockData.db.books.map(b => b._id.toHexString() === book._id.toHexString() ? { ...b,
    ...book
  } : b);
  return book;
};

const paginateBookList = (bookList, page, pageSize) => {
  let paginatedBookList = [...bookList];

  if (page && pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, paginatedBookList.length);
    paginatedBookList = paginatedBookList.slice(startIndex, endIndex);
  }

  return paginatedBookList;
};

const mockRepository = {
  getBookList: async (page, pageSize) => paginateBookList(_mockData.db.books, page, pageSize),
  getBook: async id => _mockData.db.books.find(b => b._id.toHexString() === id),
  saveBook: async book => Boolean(book._id) ? updateBook(book) : insertBook(book),
  deleteBook: async id => {
    _mockData.db.books = _mockData.db.books.filter(b => b._id.toHexString() !== id);
    return true;
  }
};
exports.mockRepository = mockRepository;