import shell   from 'shelljs';
import {Gpio}  from 'onoff';

class SessionManager {
  
  constructor(gpio = 12) {
    this._button = new Gpio(gpio, 'in', 'falling', { persistentWatch: true, debounceTimeout: 300 });
  }
  
  run() {
    this._button.watch(function (err) {
      if (err) throw err;
      shell.exec('sudo shutdown now');
    });
  }
}

export default SessionManager;