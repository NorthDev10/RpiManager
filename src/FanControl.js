import shell   from 'shelljs';
import {Gpio}  from 'onoff';


class FanControl {

  constructor(gpio = 14, TempUp = 60) {
    this._cooler = new Gpio(gpio, 'out');
    this._TempUp = TempUp;
  }
  
  run() {
    try {
      this._fanControl();
    } catch(e) {
      shell.exec('sudo reboot');
    }
  }

  _fanControl() {
    setInterval(() => {
      let Temp = shell
        .exec('vcgencmd measure_temp')
        .toString()
        .match(/-?[0-9]+([.|,][0-9]+)?/);
      
      if(Temp != null) {
        Temp = Temp[0];
        if(Temp >= this._TempUp) {
          this._turnOnFan();
        } else {
          if(Temp <= this._TempUp - 10) {
            this._turnOffFan();
          }
        }
      } else {
        this._turnOnFan();
      }
    }, 1000);
  }

  _turnOnFan() {
    this._cooler.write(1, (err) => {
      if (err) throw err;
    });
  }

  _turnOffFan() {
    this._cooler.write(0, (err) => {
      if (err) throw err;
    });
  }
}

export default FanControl;
