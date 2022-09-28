"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapUserFromModelToApi = void 0;

var _s3RequestPresigner = require("@aws-sdk/s3-request-presigner");

var _clientS = require("@aws-sdk/client-s3");

var _clients = require("../../core/clients");

var _constants = require("../../core/constants");

const mapAvatar = async avatar => {
  const command = new _clientS.GetObjectCommand({
    Bucket: _constants.envConstants.AWS_S3_BUCKET,
    Key: avatar
  });
  const expiresIn = 60 * 60 * 24; // 1 day expiration time.

  return await (0, _s3RequestPresigner.getSignedUrl)(_clients.s3Client, command, {
    expiresIn
  });
};

const mapUserFromModelToApi = async user => {
  const avatar = await mapAvatar(user === null || user === void 0 ? void 0 : user.avatar);
  return {
    email: user === null || user === void 0 ? void 0 : user.email,
    role: user === null || user === void 0 ? void 0 : user.role,
    avatar
  };
};

exports.mapUserFromModelToApi = mapUserFromModelToApi;