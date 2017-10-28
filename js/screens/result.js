import ResultView from '../views/result-view';
import App from '../application';
import {displayScreen} from '../lib/utils';

class ResultScreen {
  init(state) {
    this.view = new ResultView(state);
    window.clearInterval(this.view.state.timerId);
    this.view.replayHandler = () => {
      App.showWelcome();
    };
    displayScreen(this.view.element);
  }
}

export default new ResultScreen();