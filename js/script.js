var newGameElem = document.getElementById('js-newGameElement');
var newGameBtn = document.getElementById('js-newGameButton');
var gameState =  'notStarted'; 
var playerNameElem = document.getElementById('js-playerName');

var pickElem = document.getElementById('js-playerPickElement'); 
var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

var playerPickElem = document.getElementById('js-playerPick'); 
var computerPickElem = document.getElementById('js-computerPick'); 

var resultsElem = document.getElementById('js-resultsTableElement'); 
var playerPointsElem = document.getElementById('js-playerPoints'); 
var computerPointsElem = document.getElementById('js-computerPoints');
var result = document.getElementById('js-result'); 
var playerResultElem = document.getElementById('js-playerResult'); 
var computerResultElem = document.getElementById('js-computerResult'); 

var player = {
	name: '',
	score: 0
};

var computer = {
	score: 0
};

function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGameElem.style.display = 'block';
			newGameBtn.innerText = 'Play again';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'block';
			break;
		case 'notStarted':
			resultsElem.style.display = 'none';
			pickElem.style.display = 'none';
			break;
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
	}
}

setGameElements();

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function newGame() {
	player.name = prompt('Please enter your name', 'imie gracza');
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();
	}
	
	playerNameElem.innerHTML = player.name;

	result.innerHTML = '';
	playerPickElem.innerHTML = 'Player Selection';
	computerPickElem.innerHTML = 'Computer Selection';
	playerResultElem.innerHTML = 'Player Choice';
	computerResultElem.innerHTML = 'Computer Choice';
	setGamePoints(); 
}

newGameBtn.addEventListener('click', newGame);

pickRock.addEventListener('click', function() {
	playerPick('rock');
});
pickPaper.addEventListener('click', function() {
	playerPick('paper');
});
pickScissors.addEventListener('click', function() {
	playerPick('scissors');
});

var winnerIs = '';
function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = ' ';
	
	if (playerPick === computerPick) {
		winnerIs = 'noone'; // draw
	} else if (
		(computerPick === 'rock' && playerPick === 'scissors') ||
		(computerPick === 'scissors' && playerPick === 'paper') ||
		(computerPick === 'paper' && playerPick === 'rock')) {
		
		winnerIs = 'computer';
	} else {
		winnerIs = 'player';
	}
}

function addPoints() {
	if (winnerIs === 'player') {
		playerResultElem.innerHTML = 'Win!';
		computerResultElem.innerHTML = 'Lose!';
		player.score++;
	} else if (winnerIs === 'computer') {
		computerResultElem.innerHTML = 'Win!';
		playerResultElem.innerHTML = 'Lose!';
		computer.score++;
	} else {
		computerResultElem.innerHTML = 'Draw!';
		playerResultElem.innerHTML = 'Draw!';
	}
	setGamePoints();
}

function endGame() {
	if(player.score == 10) {
		result.innerHTML = 'You win! Congatulations!';
		gameState = 'ended';
	}
	if(computer.score == 10) {
		result.innerHTML = 'You lost! Try luck next time!';
		gameState = 'ended';
	}
	setGameElements();
}

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random() * 3)];
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	
	checkRoundWinner(playerPick, computerPick);
	addPoints();
	endGame();
}