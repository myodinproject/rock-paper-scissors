const options = ["Rock", "Paper", "Scissors"];

function playRound(playerSelection, computerSelection) {
    return (playerSelection + 3 - computerSelection) % 3;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let gameOver = false;
    do {
        let answer = prompt("Choose between 'Rock', 'Paper' or 'Scissors': ");
        answer = answer.slice(0,1).toUpperCase() + answer.slice(-answer.length + 1).toLowerCase();
        let playerSelection = options.indexOf(answer);
        while (playerSelection === -1) {
            answer = prompt("Type correctly your choice, 'Rock', 'Paper' or 'Scissors': ");
            playerSelection = answer.indexOf(answer);
        }

        let computerSelection = Math.floor(Math.random() * 3);
        let result = playRound(playerSelection,computerSelection);

        switch (result) {
            case 0:
                console.log("It's a tie");
                break;
            case 1:
                console.log(`You win! ${options[playerSelection]} beats ${options[computerSelection]}`);
                console.log(`Player [${++playerScore}] : [${computerScore}] Computer`);
                gameOver = playerScore === 5;
                if (gameOver) console.log("YOU WIN!");
                break;
            case 2:
                console.log(`You lose! ${options[computerSelection]} beats ${options[playerSelection]}`);
                console.log(`Player [${playerScore}] : [${++computerScore}] Computer`);
                gameOver = computerScore === 5;
                if (gameOver) console.log("COMPUTER WINS!");
        }
    } while (!gameOver);
}