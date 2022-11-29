'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const trophyEl = document.querySelector('.trophy');
const trophyEl2 = document.querySelector('.trophy2');
const diceEl = document.querySelector('.dice');
const diceEl2 = document.querySelector('.dice2');

const Instruct = document.querySelector('.btn--instruct');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalEl = document.querySelector('.closeModal');

let scores, currentScore, activePlayer, playing;

// reset all values
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  trophyEl.classList.add('hidden');
  trophyEl2.classList.add('hidden');
  diceEl.classList.add('hidden');
  diceEl2.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//Function to Open Modal Window and overlay
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Function to close Modal Window and overlay
const btnCloseModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/* Calling openModal and closeModal functions for
instructions button, overlay, and x button */
Instruct.addEventListener('click', openModal);
closeModalEl.addEventListener('click', btnCloseModal);

// To switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  //switch dice
  const dice = Math.trunc(Math.random() * 6 + 1);
  diceEl.classList.toggle('hidden');
  diceEl2.classList.toggle('hidden');
};

// To roll Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    // console.log(dice);

    //2. Display the dice
    if (activePlayer === 0) {
      document.querySelector('.dice').src = `dice-${dice}.png`;
      diceEl.classList.remove('hidden');
    } else {
      document.querySelector('.dice2').src = `dice-${dice}.png`;
      diceEl2.classList.remove('hidden');
    }

    //3. Checked for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// To add score to total score
let highScore = 0;
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if players score is >= 20
    // Finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // To display trophy and remove dice
      if (activePlayer === 0) {
        trophyEl.classList.remove('hidden') && diceEl.classList.add('hidden');
      } else {
        trophyEl2.classList.remove('hidden') && diceEl.classList.add('hidden');
      }

      // To update HighScore
      if (scores[activePlayer] > highScore) {
        highScore = scores[activePlayer];
        document.querySelector('.highscore').textContent = highScore;
      }
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// close modal when esc is pressed
document.addEventListener('keydown', function (e) {
  console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    btnCloseModal();
  }
});
