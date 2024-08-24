const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
let seriesLength = parseInt(document.getElementById('seriesLength').value);

document.getElementById('seriesLength').addEventListener('change', function() {
    seriesLength = parseInt(this.value);
    resetGame();
});

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        
        document.getElementById('animation').classList.remove('hidden');
        document.getElementById('animation').classList.add('visible');

        setTimeout(() => {
            document.getElementById('animation').classList.remove('visible');
            document.getElementById('animation').classList.add('hidden');
            
            const result = determineWinner(playerChoice, computerChoice);
            updateScore(result);
            
            document.getElementById('result').textContent = `You chose ${playerChoice}, Computer chose ${computerChoice}. You ${result}!`;
            document.getElementById('score').textContent = `Player: ${playerScore} | Computer: ${computerScore}`;

            currentRound++;
            if (currentRound >= seriesLength) {
                endSeries();
            }
        }, 2000);
    });
});

function determineWinner(player, computer) {
    if (player === computer) {
        return 'tie';
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

function updateScore(result) {
    if (result === 'win') {
        playerScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
}

function endSeries() {
    let finalMessage = '';
    if (playerScore > computerScore) {
        finalMessage = `You won the series! Final score: Player ${playerScore} - Computer ${computerScore}`;
    } else if (playerScore < computerScore) {
        finalMessage = `You lost the series! Final score: Player ${playerScore} - Computer ${computerScore}`;
    } else {
        finalMessage = `The series is a tie! Final score: Player ${playerScore} - Computer ${computerScore}`;
    }

    alert(finalMessage);
    resetGame();
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 0;
    document.getElementById('result').textContent = '';
    document.getElementById('score').textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}
