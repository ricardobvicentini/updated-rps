const rockBtn = document.querySelector('.rock-btn');
const paperBtn = document.querySelector('.paper-btn');
const scissorsBtn = document.querySelector('.scissors-btn');
const resultText = document.querySelector('.js-result');
const resetBtn = document.querySelector('.reset-btn');
const autoBtn = document.querySelector('.auto-btn');
const score = {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose! Computer wins!';
    } else {
      result = 'Computer loses! You win!';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'Computer loses! You win!';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else {
      result = 'You lose! Computer wins!';
    }
  } else {
    if (computerMove === 'rock') {
      result = 'You lose! Computer wins!';
    } else if (computerMove === 'paper') {
      result = 'Computer loses! You win!';
    } else {
      result = 'Tie!';
    }
  }

  if (result === 'Computer loses! You win!') {
    score.wins += 1;
  } else if (result === 'You lose! Computer wins!') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  resultText.innerHTML = `You picked <img src="images/${playerMove}-emoji.png" alt="Rock-fist emoji" class="move-icon"> Computer picked <img src="images/${computerMove}-emoji.png" alt="Rock-fist emoji" class="move-icon"><br> ${result}`;

  updateScore();

  return playerMove;
}

function updateScore() {
  document.querySelector(
    '.js-score'
  ).innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

rockBtn.addEventListener('click', () => {
  playGame('rock');
});

paperBtn.addEventListener('click', () => {
  playGame('paper');
});

scissorsBtn.addEventListener('click', () => {
  playGame('scissors');
});

resetBtn.addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  /* updateScore(); */
  location.reload();
});

autoBtn.addEventListener('click', () => {
  autoPlay();
  if (autoBtn.innerHTML === 'Auto Play') {
    autoBtn.innerHTML = 'Stop Auto Play';
    autoBtn.style.backgroundColor = 'orangered';
  } else {
    autoBtn.innerHTML = 'Auto Play';
    autoBtn.style.backgroundColor = 'rgb(199, 199, 199)';
  }
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

//* BEST SOLUTION

/* const rps = (p1, p2) => {
  if (p1 === p2) {
    return 'Draw!';
  }
  let rules = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  if (p1 === rules[p2]) {
    return 'Player 2 won!';
  } else {
    return 'Player 1 won!';
  }
};

console.log(rps('paper', 'rock')); */
