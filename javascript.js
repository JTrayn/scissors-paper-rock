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
let playerWinText = document.querySelector('.player-chance');
let computerWinText = document.querySelector('.computer-chance');

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


function updateChanceText() {

    let playerWinChance = calculateWinPercentage(+playerScore.textContent, +computerScore.textContent);
    let computerWinChance = 100 - playerWinChance;
    if(playerWinChance > 50) {
        playerWinText.style.color = 'lightgreen';
        computerWinText.style.color = 'red';
    } else if(playerWinChance < 50) {
        playerWinText.style.color = 'red';
        computerWinText.style.color = 'lightgreen';
    } else {
        playerWinText.style.color = 'blue';
        computerWinText.style.color = 'blue';
    }
    playerWinText.textContent = `${playerWinChance}%`;
    computerWinText.textContent = `${computerWinChance}%`;
    

    /**
     * @param {Number} playerScore 
     * @param {Number} computerScore 
     * @returns 
     */
    function calculateWinPercentage(playerScore, computerScore) {

        let CHANCE = 0.5;
        let ROUNDS = 5;
        let playerChance = CHANCE ** (ROUNDS - playerScore);
        let computerChance = CHANCE ** (ROUNDS - computerScore);
        let factor = computerChance / playerChance;

        if (playerScore === 5) {
            return 100;
        } else if (computerScore === 5) {
            return 0;
        } else if (playerScore === computerScore) {
            return 0.5 * 100;
        } else if (playerScore > computerScore) {
            return (1 - (factor * CHANCE)) * 100;
        } else if (computerScore > playerScore) {
            return CHANCE / factor * 100;
        }
    }
}

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
        updateChanceText();
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
                updateChanceText();
                return `You won! ${playerChoice} beats ${computerChoice}`;
            }
            break;
        case 'paper':
            if(computerChoice === 'rock') {
                playerScore.textContent = +playerScore.textContent + 1;
                updateChanceText();
                return `You won! ${playerChoice} beats ${computerChoice}`;
            }
            break;
        case 'rock':
            if(computerChoice === 'scissors') {
                playerScore.textContent = +playerScore.textContent + 1;
                updateChanceText();
                return `You won! ${playerChoice} beats ${computerChoice}`;
            }
            break;
    }
    computerScore.textContent = +computerScore.textContent + 1;
    updateChanceText();
    return `You lost! ${playerChoice} loses to ${computerChoice}`;
}
