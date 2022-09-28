"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBookContext = void 0;

var _servers = require("../../core/servers");

const getBookContext = () => _servers.db === null || _servers.db === void 0 ? void 0 : _servers.db.collection('books');

exports.getBookContext = getBookContext;