"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRepository = void 0;

var _user = require("./user.mock-repository");

var _user2 = require("./user.db-repository");

var _constants = require("../../../core/constants");

const userRepository = _constants.envConstants.isApiMock ? _user.mockRepository : _user2.dbRepository;
exports.userRepository = userRepository;