import LevelView from './level-view';
import {currentState, data, currentAnswers} from '../data';
import {displayElement} from '../functions/screenRender';
import displayAmountMistakes from '../displayAmountMistakes';
import pushCurrentAnswer from '../pushCurrentAnswer';
import showResult from '../result/result';

const level = (currentLevel) => new LevelView(currentLevel);

const getCheckedFormElement = (list, actualLevel) => {
  const result = [];

  Array.prototype.forEach.call(list, (it, index) => {
    if (it.checked) {
      result.push(data[actualLevel].answers[index].isCorrect === it.checked);
    }
    return false;
  });

  return result;
};

level.init = () => {
  const mainWrap = document.querySelector(`.main-wrap`);
  const actualLevel = data[currentState.level];
  const currentLevel = level(actualLevel);
  const time = new Date();
  let answer = null;

  currentLevel.answerHandler = (evt) => {
    evt.preventDefault();

    switch (actualLevel.type) {
      case `artist`: {
        const answerIndex = evt.currentTarget.htmlFor.slice(7);
        answer = actualLevel.answers[answerIndex].isCorrect;
        break;
      }

      case `genre`: {
        const form = evt.currentTarget;
        const answersList = form.querySelectorAll(`input[name="answer"]`);

        const checkedFormElement = getCheckedFormElement(answersList, currentState.level);
        if (checkedFormElement.length) {

          answer = checkedFormElement.every((it) => it);
          form.removeEventListener(`submit`, currentLevel.answerHandler);
        }
        break;
      }
    }

    if (answer !== null) {
      currentState.level = actualLevel.nextLevel;

      displayElement(level(data[currentState.level]).element, mainWrap);
      level.init();

      pushCurrentAnswer(answer, time);

      if (!answer) {
        displayAmountMistakes(--currentState.lives);
      }

      if (currentAnswers.length >= 10) {
        showResult().init();
      }
    }
  };


  displayElement(currentLevel.element, mainWrap);
};

export default () => level;