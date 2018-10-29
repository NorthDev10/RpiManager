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

var FanControl =
/*#__PURE__*/
function () {
  function FanControl() {
    var gpio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 14;
    var TempUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;

    _classCallCheck(this, FanControl);

    this._cooler = new _onoff.Gpio(gpio, 'out');
    this._TempUp = TempUp;
  }

  _createClass(FanControl, [{
    key: "run",
    value: function run() {
      try {
        this._fanControl();
      } catch (e) {
        _shelljs.default.exec('sudo reboot');
      }
    }
  }, {
    key: "_fanControl",
    value: function _fanControl() {
      var _this = this;

      setInterval(function () {
        var Temp = _shelljs.default.exec('vcgencmd measure_temp').toString().match(/-?[0-9]+([.|,][0-9]+)?/);

        if (Temp != null) {
          Temp = Temp[0];

          if (Temp >= _this._TempUp) {
            _this._turnOnFan();
          } else {
            if (Temp <= _this._TempUp - 10) {
              _this._turnOffFan();
            }
          }
        } else {
          _this._turnOnFan();
        }
      }, 1000);
    }
  }, {
    key: "_turnOnFan",
    value: function _turnOnFan() {
      this._cooler.write(1, function (err) {
        if (err) throw err;
      });
    }
  }, {
    key: "_turnOffFan",
    value: function _turnOffFan() {
      this._cooler.write(0, function (err) {
        if (err) throw err;
      });
    }
  }]);

  return FanControl;
}();

var _default = FanControl;
exports.default = _default;