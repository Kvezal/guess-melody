import {initialState, GameParameters} from '../data/data';

const PERCENTAGES = 100;

const calculationOfResults = (arrayResults, currentResult) => {
  if (currentResult.time <= GameParameters.MIN_COUNT_TIME) {
    return `<div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>`;
  }

  if (currentResult.lives < GameParameters.MIN_COUNT_LIVES) {
    return `<div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>`;
  }

  const generalResults = arrayResults.concat([currentResult]);

  generalResults.sort((left, right) => left.points - right.points);

  const numberOfPlayers = generalResults.length;

  let placeOfPlayer;

  generalResults.forEach((item, index) => {
    if (item.id === currentResult.id) {
      placeOfPlayer = numberOfPlayers - index;
    }
  });

  const betterThanOtherPlayer = (numberOfPlayers - placeOfPlayer) * PERCENTAGES / numberOfPlayers;
  const mistakes = initialState.lives - currentResult.lives;
  const minutes = Math.floor(currentResult.timeLeft / GameParameters.COUNT_OF_SECONDS_IN_MINUTE);
  const seconds = currentResult.timeLeft % GameParameters.COUNT_OF_SECONDS_IN_MINUTE;

  return (
    `<div class="main-stat">За&nbsp;${minutes}&nbsp;минуты и ${seconds}&nbsp;секунд
      <br>вы&nbsp;набрали ${currentResult.points} баллов (${currentResult.numberOfQuickAnswers} быстрых)
      <br>совершив ${mistakes} ошибки
    </div>
    <span class="main-comparison">Вы заняли ${placeOfPlayer}-е место из ${numberOfPlayers} игроков. Это&nbsp;лучше чем у&nbsp;${betterThanOtherPlayer}%&nbsp;игроков</span>`
  );
};

export default calculationOfResults;