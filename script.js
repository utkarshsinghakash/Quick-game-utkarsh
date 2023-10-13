"use strict";

//selecting classes
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const newgame = document.querySelector(".btn--new");
const rolldice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const player1 = document.querySelector("#player--0");
const player2 = document.querySelector("#player--1");
const curscore0 = document.querySelector(".curscore--0");
const curscore1 = document.querySelector(".curscore--1");
const box0 = document.querySelector(".box--0");
const box1 = document.querySelector(".box--1");

//starting condition
score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let currentscore = 0;
let activeplayer = 0;

let playing = true;

const switchplayer = function () {
  document.querySelector(`.curscore--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;

  box0.classList.toggle("player--active");
  box1.classList.toggle("player--active");
};

rolldice.addEventListener("click", function () {
  if (playing) {
    //1.generating the random dice
    const dice = Math.trunc(Math.random() * 6 + 1);

    //2.display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3.check if display dice is 1,if true change player
    if (dice !== 1) {
      currentscore += dice;
      document.querySelector(`.curscore--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});

//hold button
hold.addEventListener("click", function () {
  if (playing) {
    //1.add to total score
    scores[activeplayer] += currentscore;

    document.querySelector(`#score--${activeplayer}`).textContent =
      scores[activeplayer];
    //2.check total score>100
    if (scores[activeplayer] >= 100) {
      playing = false;
      document
        .querySelector(`.box--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.box--${activeplayer}`)
        .classList.remove("player-active");
      activeplayer = activeplayer === 0 ? 1 : 0;
      document
        .querySelector(`.box--${activeplayer}`)
        .classList.add("player--looser");
      diceEl.classList.add("hidden");
    }
    //3.switch player
    else {
      switchplayer();
    }
  }
});

//new game
newgame.addEventListener("click", function () {
  playing = true;
  currentscore = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  curscore0.textContent = 0;
  curscore1.textContent = 0;
  box0.classList.remove("player--winner");
  box1.classList.remove("player--winner");
  box0.classList.remove("player--looser");
  box1.classList.remove("player--looser");
  box0.classList.add("player--active");
  box1.classList.remove("player--active");
  activeplayer = 0;
  scores = [0, 0];
  diceEl.classList.add("hidden");
});
