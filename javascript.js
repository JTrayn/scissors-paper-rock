
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

function getPlayerChoice(message){
    try {
        let choice = prompt(message).toLowerCase();
        if((choice !== 'scissors') && (choice !== 'paper') && (choice !== 'rock')) {
            throw new Error("Invalid selection. Please choose 'scissors', 'paper' or 'rock'.");            
        }
        return choice;
    } catch (e) {
        console.error(e.message);
    }
}

function calculateResult(playerChoice, computerChoice){

    switch (playerChoice) {
        case 'scissors':
            if(computerChoice === 'scissors') return 'draw';
            else if(computerChoice === 'paper') return 'win';
            break;
        case 'paper':
            if(computerChoice === 'paper') return 'draw';
            else if(computerChoice === 'rock') return 'win';
            break;
        case 'rock':
            if(computerChoice === 'rock') return 'draw';
            else if(computerChoice === 'scissors') return 'win';
            break;
    }
    return 'loss';
}

let computerChoice;
let playerChoice;
let result;
let resolved = false;
let message = "Choose scissors, paper or rock!";

while (!resolved) {

    computerChoice = getComputerChoice();
    playerChoice = getPlayerChoice(message);
    result = calculateResult(playerChoice, computerChoice);

    if(result == 'win'){
        console.log(`Congratulations, you win! ${playerChoice} beats ${computerChoice}`);
        resolved = true;
    } else if (result == 'loss') {
        console.log(`Sorry, you lose... ${playerChoice} loses to ${computerChoice}`);
        resolved = true;
    } else {
        message = `It was a draw! ${playerChoice} vs ${computerChoice}. Try again!`;
    }
}