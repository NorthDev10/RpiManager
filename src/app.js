import FanControl         from './FanControl';
import SessionManager 	  from './SessionManager';

const sManager = new SessionManager();
sManager.run();

const fanControl = new FanControl();
fanControl.run();

