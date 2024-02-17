/* PICKS object contains a reference to the html element and the image source for each pick */
const picks = {
  "rock": {
    icon: document.querySelector("#rock-icon"),
    imageSrc: "./images/round/150px/rock.png",
  },
  "paper": {
    icon: document.querySelector("#paper-icon"),
    imageSrc: "./images/round/150px/paper.png",
  },
  "scissors": {
    icon: document.querySelector("#scissors-icon"),
    imageSrc: "./images/round/150px/scissors.png",
  },
}

let playerScore, computerScore = 0;

/* DOM elements */
const gameContainer = document.querySelector("#game-container");
const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");
const roundInfo = document.querySelector("#round-info");
const roundPicks = document.querySelector("#round-picks");
const winnerInfo = document.querySelector("#winner-info");
const newGameBtn = document.querySelector("#new-game-btn");

/* EVENT listeners */
newGameBtn.addEventListener("click", startNewGame);

Object.entries(picks).forEach(([pick, {icon}]) => {
  icon.addEventListener("click", () => {
    const playerPick = pick;
    const computerPick = getComputerChoice();

    playRound(playerPick, computerPick);
  });
});

/*
startNewGame function starts a new game, resetting the scores and the gameboard
*/
function startNewGame() {
  gameContainer.classList.add("playing");
  Object.values(picks).forEach((element) => {
    element.icon.src = element.imageSrc;
  });

  playerScore = 0;
  computerScore = 0;

  updateGameboard(null, null, "Let's play!");
}

/*
finishGame function finishes the game, displaying the winner and disabling the gameboard
*/
function finishGame() {
  gameContainer.classList.remove("playing");
  if (playerScore > computerScore) {
    winnerInfo.textContent = "You win!";
  } else {
    winnerInfo.textContent = "You lose!";
  }
}

/*
playRound function receives the player's and computer's picks and determines the winner of the round,
updating the scores and the gameboard and finishing the game if one of the players reaches 3 points.
*/
function playRound(playerPick, computerPick) {
  const capitalizedPlayerPick = playerPick[0].toUpperCase() + playerPick.slice(1).toLowerCase();
  const capitalizedComputerPick = computerPick[0].toUpperCase() + computerPick.slice(1).toLowerCase();

  const roundWinner = getRoundWinner(playerPick, computerPick);
  
  let winnerInfoText = "";
  switch (roundWinner) {
    case 0:
      winnerInfoText = "It's a tie!";
      break;
    case 1:
      playerScore++;
      winnerInfoText = `${capitalizedPlayerPick} beats ${capitalizedComputerPick}`;
      break;
    case 2:
      computerScore++;
      winnerInfoText = `${capitalizedComputerPick} beats ${capitalizedPlayerPick}`;
      break;
    default:
      return "Something went wrong. Please refresh the page.";
  }

  updateGameboard(playerPick, computerPick, winnerInfoText);

  if (playerScore >= 3 || computerScore >= 3) {
    finishGame();
  }
}

/*
getRoundWinner function receives both the player's and computer's picks and determines
if the player is the winner of the round

Params:
  - playerPick: a string with the player's pick: "rock", "paper" or "scissors"
  - computerPick: a string with the computer's pick: "rock", "paper" or "scissors"

Returns:
  - 0 if the round results in a tie
  - 1 if the player wins the round
  - 2 if the computer wins the round
*/
function getRoundWinner(playerPick, computerPick) {
  const options = Object.keys(picks);
  const playerPickValue = options.indexOf(playerPick);
  const computerPickValue = options.indexOf(computerPick);

  return (playerPickValue + 3 - computerPickValue) % 3;
}

/*
getComputerChoice function returns a random choice for the computer

Returns:
  - a random choice among the `picks` object keys: "rock", "paper" or "scissors"
*/
function getComputerChoice() {
  const keys = Object.keys(picks);
  return keys[Math.floor(Math.random() * keys.length)];
}

/*
updateGameboard function updates the gameboard with the player's and computer's picks,
the round result message and the scores.
*/
function updateGameboard(playerPick, computerPick, winnerInfoText) {
  // Remove previous picks
  while (roundPicks.firstChild) {
    roundPicks.removeChild(roundPicks.firstChild);
  }

  // Display player and computer picks
  if (playerPick != null && computerPick != null) {
    const playerPickIcon = document.createElement("img");
    playerPickIcon.src = picks[playerPick].imageSrc;
    playerPickIcon.classList.add("player-pick-icon");
  
    const computerPickIcon = document.createElement("img");
    computerPickIcon.src = picks[computerPick].imageSrc;
    computerPickIcon.classList.add("computer-pick-icon");
   
    roundPicks.append(playerPickIcon, computerPickIcon);
  }

  // Display winner info
  winnerInfo.textContent = winnerInfoText;

  // Display scores
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}