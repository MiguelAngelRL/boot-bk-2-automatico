"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.securityApi = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _constants = require("../../core/constants");

var _dals = require("../../dals");

var _security = require("./security.middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const securityApi = (0, _express.Router)();
exports.securityApi = securityApi;
securityApi.post('/login', async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await _dals.userRepository.getUserByEmailAndPassword(email, password);

    if (user) {
      const userSession = {
        id: user._id.toHexString(),
        role: user.role
      };

      const token = _jsonwebtoken.default.sign(userSession, _constants.envConstants.AUTH_SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256'
      }); // TODO: Move to constants


      res.cookie('authorization', `Bearer ${token}`, {
        httpOnly: true,
        secure: _constants.envConstants.isProduction
      });
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
}).post('/logout', _security.authenticationMiddleware, async (req, res) => {
  // NOTE: We cannot invalidate token using jwt libraries.
  // Different approaches:
  // - Short expiration times in token
  // - Black list tokens on DB
  res.clearCookie('authorization');
  res.sendStatus(200);
});