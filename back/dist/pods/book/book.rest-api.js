"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.booksApi = void 0;

var _express = require("express");

var _dals = require("../../dals");

var _security = require("../security");

var _book = require("./book.mappers");

const booksApi = (0, _express.Router)();
exports.booksApi = booksApi;
booksApi.get('/', (0, _security.authorizationMiddleware)(), async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);
    const bookList = await _dals.bookRepository.getBookList(page, pageSize);
    res.send((0, _book.mapBookListFromModelToApi)(bookList));
  } catch (error) {
    next(error);
  }
}).get('/:id', (0, _security.authorizationMiddleware)(), async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const book = await _dals.bookRepository.getBook(id);
    res.send((0, _book.mapBookFromModelToApi)(book));
  } catch (error) {
    next(error);
  }
}).post('/', (0, _security.authorizationMiddleware)(['admin']), async (req, res, next) => {
  try {
    const book = (0, _book.mapBookFromApiToModel)(req.body);
    const newBook = await _dals.bookRepository.saveBook(book);
    res.status(201).send((0, _book.mapBookFromModelToApi)(newBook));
  } catch (error) {
    next(error);
  }
}).put('/:id', (0, _security.authorizationMiddleware)(['admin']), async (req, res, next) => {
  try {
    const {
      id
    } = req.params;

    if (await _dals.bookRepository.getBook(id)) {
      const book = (0, _book.mapBookFromApiToModel)({ ...req.body,
        id
      });
      await _dals.bookRepository.saveBook(book);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
}).delete('/:id', (0, _security.authorizationMiddleware)(['admin']), async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const isDeleted = await _dals.bookRepository.deleteBook(id);
    res.sendStatus(isDeleted ? 204 : 404);
  } catch (error) {
    next(error);
  }
});