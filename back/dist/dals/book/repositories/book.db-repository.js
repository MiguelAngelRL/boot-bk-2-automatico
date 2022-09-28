"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbRepository = void 0;

var _mongodb = require("mongodb");

var _book = require("../book.context");

const dbRepository = {
  getBookList: async (page, pageSize) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await (0, _book.getBookContext)().find().skip(skip).limit(limit).toArray();
  },
  getBook: async id => {
    return await (0, _book.getBookContext)().findOne({
      _id: new _mongodb.ObjectId(id)
    });
  },
  saveBook: async book => {
    const {
      value
    } = await (0, _book.getBookContext)().findOneAndUpdate({
      _id: book._id
    }, {
      $set: book
    }, {
      upsert: true,
      returnDocument: 'after'
    });
    return value;
  },
  deleteBook: async id => {
    const {
      deletedCount
    } = await (0, _book.getBookContext)().deleteOne({
      _id: new _mongodb.ObjectId(id)
    });
    return deletedCount === 1;
  }
};
exports.dbRepository = dbRepository;