"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyJWT = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyJWT = (token, secret) => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, secret, (error, payload) => {
    if (error) {
      reject(error);
    }

    if (payload) {
      resolve(payload);
    } else {
      reject();
    }
  });
});

exports.verifyJWT = verifyJWT;