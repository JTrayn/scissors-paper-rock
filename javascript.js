/********************
 SCISSORS PAPER ROCK
*********************/

let computerChoice;
let playerChoice;
let scissorButton = document.querySelector('.scissors');
let paperButton = document.querySelector('.paper');
let rockButton = document.querySelector('.rock');
let textBox = document.querySelector('.result');
let playerScore = document.querySelector('.card-score-player');
let computerScore = document.querySelector('.card-score-computer');
let card = document.querySelector('.card');

//------------------------------------------------------------

scissorButton.addEventListener('click', e => {
    runGame('scissors');
});
paperButton.addEventListener('click', e => {
    runGame('paper');
});
rockButton.addEventListener('click', e => {
    runGame('rock');
}); 


/**
 * @param {String} choice 
 */
function runGame(choice){

    computerChoice = getComputerChoice();
    playerChoice = choice;
    textBox.textContent = calculateResult(playerChoice, computerChoice);

    if(+playerScore.textContent === 5) {
        textBox.textContent = `You won the match! First to 5!`;
        playAgain();
        
    } else if(+computerScore.textContent === 5) {
        textBox.textContent = `You lost the match! Computer won first to 5!`;
        playAgain();
    }
}

function playAgain() {

    scissorButton.disabled = true;
    paperButton.disabled = true;
    rockButton.disabled = true;

    let playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play again?';
    playAgainButton.classList.add('button');
    playAgainButton.style.width = '150px';
    playAgainButton.style.alignSelf = 'center';
    card.appendChild(playAgainButton);

    playAgainButton.addEventListener('click', e => {
        playerScore.textContent = 0;
        computerScore.textContent = 0;
        textBox.textContent = 'New game. First to 5 wins!';
        scissorButton.disabled = false;
        paperButton.disabled = false;
        rockButton.disabled = false;
        playAgainButton.remove();
    });
}

/**
 * @returns 
 */
function getComputerChoice(){    
    switch (Math.floor(Math.random() * 3) + 1) {
        case 1:
            return 'scissors';
        case 2:
            return 'paper';
        case 3:
            return 'rock';
    }
}

/**
 * @param {String} playerChoice 
 * @param {String} computerChoice 
 * @returns 
 */
function calculateResult(playerChoice, computerChoice){

    if (playerChoice === computerChoice) {
        return `It was a draw! ${playerChoice} vs ${computerChoice}`;
    }
    switch (playerChoice) {
        case 'scissors':
            if(computerChoice === 'paper') {
                playerScore.textContent = +playerScore.textContent + 1;
                return `You won! ${playerChoice} beats ${computerChoice}`;
            }
            break;
        case 'paper':
            if(computerChoice === 'rock') {
                playerScore.textContent = +playerScore.textContent + 1;
                return `You won! ${playerChoice} beats ${computerChoice}`;
            }
            break;
        case 'rock':
            if(computerChoice === 'scissors') {
                playerScore.textContent = +playerScore.textContent + 1;
                return `You won! ${playerChoice} beats ${computerChoice}`;
            }
            break;
    }
    computerScore.textContent = +computerScore.textContent + 1;
    return `You lost! ${playerChoice} loses to ${computerChoice}`;
}
