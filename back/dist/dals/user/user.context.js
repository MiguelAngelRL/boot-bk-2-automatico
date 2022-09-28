"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserContext = void 0;

var _servers = require("../../core/servers");

const getUserContext = () => _servers.db === null || _servers.db === void 0 ? void 0 : _servers.db.collection('users');

exports.getUserContext = getUserContext;