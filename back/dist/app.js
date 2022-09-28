"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _servers = require("./core/servers");

var _constants = require("./core/constants");

var _middlewares = require("./common/middlewares");

var _book = require("./pods/book");

var _security = require("./pods/security");

var _user = require("./pods/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const restApiServer = (0, _servers.createRestApiServer)();

const staticFilesPath = _path.default.resolve(__dirname, _constants.envConstants.STATIC_FILES_PATH);

restApiServer.use('/', _express.default.static(staticFilesPath));
restApiServer.use(_middlewares.logRequestMiddleware);
restApiServer.use('/api/security', _security.securityApi);
restApiServer.use('/api/books', _security.authenticationMiddleware, _book.booksApi);
restApiServer.use('/api/users', _security.authenticationMiddleware, _user.userApi);
restApiServer.use(_middlewares.logErrorRequestMiddleware);
restApiServer.listen(_constants.envConstants.PORT, async () => {
  if (!_constants.envConstants.isApiMock) {
    await (0, _servers.connectToDBServer)(_constants.envConstants.MONGODB_URI);
    console.log('Connected to DB');
  } else {
    console.log('Running API mock');
  }

  console.log(`Server ready at port ${_constants.envConstants.PORT}`);
});