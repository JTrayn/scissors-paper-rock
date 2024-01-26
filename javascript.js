/********************
 SCISSORS PAPER ROCK
*********************/

// GLOBAL VARIABLES:
let computerChoice;
let playerChoice;
let result;
let resolved;
let message = "Choose scissors, paper or rock!";
let textbox = document.querySelector("#textbox");
let button = document.querySelector("#playgame");

button.addEventListener("click", runGame);

// Main game loop. Runs game, alerts player of result, and handles draws and incorrect input.
async function runGame(){

    resolved = false;
    
    while (!resolved) {
        // Pauses loop to allow textbox to render update
        await sleep(0);
        try {
            computerChoice = getComputerChoice();
            playerChoice = getPlayerChoice(message);
            if (playerChoice === 'cancel') {
                break;
            }
            result = calculateResult(playerChoice, computerChoice);
        
            if(result == 'win'){
                textbox.textContent += `Congratulations, you win! ${playerChoice} beats ${computerChoice}\n`;
                resolved = true;
            } else if (result == 'loss') {
                textbox.textContent += `Sorry, you lose... ${playerChoice} loses to ${computerChoice}\n`;
                resolved = true;
            } else {
                textbox.textContent += (message = `It was a draw! ${playerChoice} vs ${computerChoice}. Try again!`) + "\n";
            }
        } catch (e) {
            
            console.error(`${e.message}\n`);
            message = "Invalid selection. Try again."
            
        }
    }
}

// Calculates and returns computer choice
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

// Returns player choice from input prompt
function getPlayerChoice(message){
    let choice = prompt(message);
    // Stop game if prompt cancelled
    if(choice === null) {
        return 'cancel';
    }
    choice = choice.toLowerCase();
    if((choice !== 'scissors') && (choice !== 'paper') && (choice !== 'rock')) {
        throw new Error("Invalid selection. Please choose 'scissors', 'paper' or 'rock'.");            
    }
    return choice;
}

// Takes both player and computer choices and returns 'win', 'loss or 'draw'
function calculateResult(playerChoice, computerChoice){

    if (playerChoice === computerChoice) return 'draw';
    switch (playerChoice) {
        case 'scissors':
            if(computerChoice === 'paper') return 'win';
            break;
        case 'paper':
            if(computerChoice === 'rock') return 'win';
            break;
        case 'rock':
            if(computerChoice === 'scissors') return 'win';
            break;
    }
    return 'loss';
}

// Helper function for async
function sleep(ms) {
    return new Promise(resolve => 
        setTimeout(resolve, ms));
}