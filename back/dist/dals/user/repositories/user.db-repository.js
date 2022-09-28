"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbRepository = void 0;

var _mongodb = require("mongodb");

var _helpers = require("../../../common/helpers");

var _user = require("../user.context");

const dbRepository = {
  getUserByEmailAndPassword: async (email, password) => {
    const user = await (0, _user.getUserContext)().findOne({
      email
    });
    const hashedPassword = await (0, _helpers.hashPassword)(password, user === null || user === void 0 ? void 0 : user.salt);
    return (user === null || user === void 0 ? void 0 : user.password) === hashedPassword ? {
      _id: user._id,
      email: user.email,
      role: user.role
    } : null;
  },
  getUserById: async id => await (0, _user.getUserContext)().findOne({
    _id: new _mongodb.ObjectId(id)
  }, {
    projection: {
      email: 1,
      role: 1,
      avatar: 1
    }
  })
};
exports.dbRepository = dbRepository;