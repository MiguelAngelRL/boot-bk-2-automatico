"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapBookListFromModelToApi = exports.mapBookListFromApiToModel = exports.mapBookFromModelToApi = exports.mapBookFromApiToModel = void 0;

var _mongodb = require("mongodb");

const mapBookFromModelToApi = book => {
  var _book$releaseDate;

  return {
    id: book._id.toHexString(),
    title: book.title,
    releaseDate: (_book$releaseDate = book.releaseDate) === null || _book$releaseDate === void 0 ? void 0 : _book$releaseDate.toISOString(),
    author: book.author
  };
};

exports.mapBookFromModelToApi = mapBookFromModelToApi;

const mapBookListFromModelToApi = bookList => bookList.map(mapBookFromModelToApi);

exports.mapBookListFromModelToApi = mapBookListFromModelToApi;

const mapBookFromApiToModel = book => ({
  _id: new _mongodb.ObjectId(book.id),
  title: book.title,
  releaseDate: new Date(book.releaseDate),
  author: book.author
});

exports.mapBookFromApiToModel = mapBookFromApiToModel;

const mapBookListFromApiToModel = bookList => Array.isArray(bookList) ? bookList.map(mapBookFromApiToModel) : [];

exports.mapBookListFromApiToModel = mapBookListFromApiToModel;