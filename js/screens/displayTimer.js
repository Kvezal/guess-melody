import getElementFromTemplate from './functions/newDOMElement';
import {displayElement} from './functions/screenRender';
import getTimer from './timer';
import {currentState} from './data';

import displayScreenResult from './result';

const displayTimer = () => {
  currentState.timer = getTimer(currentState.time);

  const timerValue = document.querySelector(`.timer-value`);

  currentState.timer.id = window.setInterval(() => {
    currentState.timer.tick();

    const timerTemplate =
      `<span class="timer-value-mins">${currentState.timer.minutes}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${currentState.timer.seconds}</span>`;

    displayElement(getElementFromTemplate(timerTemplate), timerValue);
    if (currentState.timer.state) {
      displayScreenResult(`timeIsOver`);
    }
  }, 1000);
};

export default displayTimer;