"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _book = require("./book.rest-api");

Object.keys(_book).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _book[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _book[key];
    }
  });
});