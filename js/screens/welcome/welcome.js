import WelcomeView from './welcome-view';
import {displayScreen} from '../functions/screenRender';
import showGame from '../game/game';
import setCurrentState from '../setCurrentState';

const welcome = new WelcomeView();
welcome.startHandler = () => {
  setCurrentState();
  const game = showGame();
  displayScreen(game.element);
  game.init();
};

export default () => welcome;