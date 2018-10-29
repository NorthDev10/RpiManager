"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _onoff = require("onoff");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SessionManager =
/*#__PURE__*/
function () {
  function SessionManager() {
    var gpio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;

    _classCallCheck(this, SessionManager);

    this._button = new _onoff.Gpio(gpio, 'in', 'falling', {
      persistentWatch: true,
      debounceTimeout: 300
    });
  }

  _createClass(SessionManager, [{
    key: "run",
    value: function run() {
      this._button.watch(function (err) {
        if (err) throw err;

        _shelljs.default.exec('sudo shutdown now');
      });
    }
  }]);

  return SessionManager;
}();

var _default = SessionManager;
exports.default = _default;