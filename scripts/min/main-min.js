var randomNumber = Math.ceil(Math.random() * 100);

var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

guessField.addEventListener('keyup', keyupHandler)

var guessCount = 1;
var resetButton;

function keyupHandler(event) {
  console.log("a keyup event occured, keycode:" + event.keyCode);

// if the keycode pressed wasnt enter
  if(event.keyCode === 13) {
    guessSubmit.click();
  }
}

function checkGuess() {
  var userGuess = Number(guessField.value);

  if(guessField.value === '') {
    return;
  }

  if(userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    lastResult.textContent = "That wasn't a valid guess, try again!";
    lastResult.style.backgroundColor = "red";
    guessField.value = '';
    guessField.focus();
    return;
  }

  if(guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + ' ';

// logic goes here
if(userGuess === randomNumber) {
  //the user guessed the right number
  lastResult.textContent = "Congradulations! You got it right!";
  lastResult.style.backgroundColor = 'green';
  lowOrHi.textContent = '';
  setGameOver();
} else if (guessCount === 10) {
  // user is out of guesses
  lastResult.textContent = 'Game Over!!';
  lastResult.style.backgroundColor = "red";
  setGameOver();
} else {
  // the user hasn't gotten it right, but still has guesses left
  lastResult.textContent = "Wrong!";
  lastResult.style.backgroundColor = "red";
  if(userGuess < randomNumber) {
    lowOrHi.textContent = 'Last Guess was too low!';
  } else {
    lowOrHi.textContent = 'Last guess was too hi!';
  }
}


  guessCount++;
  guessField.value = '';
  guessField.focus();
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.querySelector('.form').appendChild(resetButton)
  resetButton.addEventListener('click', resetGame);
  // document.body.appendChild(resetButton);
}

function resetGame() {
  guessCount = 1;

  var resetParas = document.querySelectorAll('.resultParas p')
  for (var i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }
  lastResult.style.backgroundColor = 'white';

  guessSubmit.disabled = false;

resetButton.parentNode.removeChild(resetButton);

guessField.value = '';
guessField.focus();
guessField.disabled = false;

randomNumber = Math.ceil(Math.random() * 100);
}

guessSubmit.addEventListener('click', checkGuess);


