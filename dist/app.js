"use strict";

var _FanControl = _interopRequireDefault(require("./FanControl"));

var _SessionManager = _interopRequireDefault(require("./SessionManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sManager = new _SessionManager.default();
sManager.run();
var fanControl = new _FanControl.default();
fanControl.run();