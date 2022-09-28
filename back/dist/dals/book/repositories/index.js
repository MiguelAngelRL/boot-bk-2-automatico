"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookRepository = void 0;

var _book = require("./book.mock-repository");

var _book2 = require("./book.db-repository");

var _constants = require("../../../core/constants");

const bookRepository = _constants.envConstants.isApiMock ? _book.mockRepository : _book2.dbRepository;
exports.bookRepository = bookRepository;