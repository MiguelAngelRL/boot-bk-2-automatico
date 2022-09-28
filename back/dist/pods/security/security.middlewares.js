"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorizationMiddleware = exports.authenticationMiddleware = void 0;

var _helpers = require("../../common/helpers");

var _constants = require("../../core/constants");

const authenticationMiddleware = async (req, res, next) => {
  try {
    var _req$cookies$authoriz;

    const [, token] = ((_req$cookies$authoriz = req.cookies.authorization) === null || _req$cookies$authoriz === void 0 ? void 0 : _req$cookies$authoriz.split(' ')) || [];
    const userSession = await (0, _helpers.verifyJWT)(token, _constants.envConstants.AUTH_SECRET);
    req.userSession = userSession;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

exports.authenticationMiddleware = authenticationMiddleware;

const isAuthorized = (currentRole, allowedRoles) => !Boolean(allowedRoles) || Boolean(currentRole) && allowedRoles.some(role => currentRole === role);

const authorizationMiddleware = allowedRoles => async (req, res, next) => {
  var _req$userSession;

  if (isAuthorized((_req$userSession = req.userSession) === null || _req$userSession === void 0 ? void 0 : _req$userSession.role, allowedRoles)) {
    next();
  } else {
    res.sendStatus(403);
  }
};

exports.authorizationMiddleware = authorizationMiddleware;