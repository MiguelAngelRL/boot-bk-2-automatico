"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockRepository = void 0;

var _mockData = require("../../mock-data");

const mockRepository = {
  getUserByEmailAndPassword: async (email, password) => _mockData.db.users.find(u => u.email === email && u.password === password),
  getUserById: async id => _mockData.db.users.find(u => u._id.toHexString() === id)
};
exports.mockRepository = mockRepository;