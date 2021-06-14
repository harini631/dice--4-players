'use strict';
const rollDice = document.querySelector('.btn--roll');
const holdValue = document.querySelector('.btn--hold');
const resetValue = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const playerEl2 = document.querySelector('.player--2');
const playerEl3 = document.querySelector('.player--3');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const scoreEl2 = document.getElementById('score--2');
const scoreEl3 = document.getElementById('score--3');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const currentEl2 = document.getElementById('current--2');
const currentEl3 = document.getElementById('current--3');
let highScore;

let playing = true;
let scoreCard = 0;
let currentScore = 0;
let playerActive = 0;
let score = [0, 0, 0, 0];
let active = true;
let i;
let zero = function () {
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;
  scoreEl3.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  currentEl2.textContent = 0;
  currentEl3.textContent = 0;
};

diceEl.classList.add('hidden');
let currentEl = document.getElementById(`current--${playerActive}`);
zero();
let playerscore = function () {
  currentScore = document.getElementById(
    `current--${playerActive}`
  ).textContent = 0;
  currentScore = 0;
};

let switchPlayer = function () {
  if (playerActive == 0) {
    playerActive = 1;
    playerEl0.classList.toggle('player--active');
    playerEl1.classList.toggle('player--active');
    playerscore();
  } else if (playerActive == 1) {
    playerActive = 2;
    playerEl1.classList.toggle('player--active');
    playerEl2.classList.toggle('player--active');
    playerscore();
  } else if (playerActive == 2) {
    playerActive = 3;
    playerEl2.classList.remove('player--active');
    playerEl3.classList.toggle('player--active');
    playerscore();
  } else {
    playerActive = 0;
    playerEl3.classList.remove('player--active');
    playerEl0.classList.toggle('player--active');
    playerscore();
  }
};

rollDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    currentScore = currentScore + dice;

    if (dice !== 1) {
      currentScore = document.getElementById(
        `current--${playerActive}`
      ).textContent = currentScore;
    } else {
      playerscore();
      switchPlayer();
    }
  }
});
holdValue.addEventListener('click', function () {
  if (playing) {
    score[playerActive] = score[playerActive] + currentScore;
    console.log(playerActive);

    scoreCard = document.getElementById(`score--${playerActive}`).textContent =
      score[playerActive];

    playerscore();
    if (score[playerActive] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${playerActive}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
resetValue.addEventListener('click', function () {
  score = [0, 0, 0, 0];
  zero();

  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${playerActive}`)
    .classList.remove('player--winner');
  playerActive = 0;
  document
    .querySelector(`.player--${playerActive}`)
    .classList.add('player--active');
  playing = true;
});
