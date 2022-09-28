"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = exports.generateSalt = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const randomBytes = (0, _util.promisify)(_crypto.default.randomBytes);
const pbkdf2 = (0, _util.promisify)(_crypto.default.pbkdf2);
const saltLength = 16;

const generateSalt = async () => {
  const salt = await randomBytes(saltLength);
  return salt.toString('hex');
};

exports.generateSalt = generateSalt;
const passwordLength = 64; // 64 bytes = 512 bits

const digestAlgorithm = 'sha512';
const iterations = 100000;

const hashPassword = async (password, salt) => {
  const hashedPassword = await pbkdf2(password, salt, iterations, passwordLength, digestAlgorithm);
  return hashedPassword.toString('hex');
};

exports.hashPassword = hashPassword;