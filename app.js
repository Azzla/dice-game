/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result is added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, currentP, gamePlaying, winningScore, lastDice1, lastDice2;
newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying)
	{
		let dice1 = Math.floor(Math.random() * 6) + 1;
		let dice2 = Math.floor(Math.random() * 6) + 1;

		let diceDOM1 = document.querySelector('.dice1');
		let diceDOM2 = document.querySelector('.dice2');

		let currentPText = document.getElementById('current-' + currentP);

		diceDOM1.style.display='block';
		diceDOM2.style.display='block';
		diceDOM1.src='dice-'+ dice1 +'.png';
		diceDOM2.src='dice-'+ dice2 +'.png';

		if ((dice1 === 6 && lastDice1 === 6) || (dice2 === 6 && lastDice2 === 6)) {
			scores[currentP] = 0;
			document.getElementById('score-' + currentP).textContent = '0';
			switchPlayer();
		}
		else if (dice1 !== 1 && dice2 !== 1) {
			roundScore += (dice1 + dice2);
			currentPText.textContent = roundScore;
		}
		else {
			switchPlayer();
		}

		lastDice1 = dice1;
		lastDice2 = dice2;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying)
	{
		let currentPScore = document.getElementById('score-' + currentP);

		if (roundScore > 0) {
			scores[currentP] += roundScore;
			currentPScore.textContent = scores[currentP];
		}

		if (!winningScore) {
			winningScore = 100;
		}

		if (scores[currentP] >= winningScore) {
			document.querySelector('#name-' + currentP).textContent = 'Winner!';
			hideDice();
			document.querySelector('.player-'+currentP+'-panel').classList.remove('active');
			document.querySelector('.player-'+currentP+'-panel').classList.add('winner');
			gamePlaying = false;
		}
		else {
			switchPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function switchPlayer() {
	roundScore = 0;

	document.getElementById('current-' + currentP).textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	hideDice();

	currentP = 1 - currentP;
}

function newGame() {
	scores = [0,0];
	roundScore = 0;
	currentP = 0;
	gamePlaying = true;
	winningScore = document.getElementById('win-score').value;

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');

	hideDice();
	document.getElementById('score-0').textContent='0';
	document.getElementById('score-1').textContent='0';
	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';
	document.getElementById('name-0').textContent='Player 1';
	document.getElementById('name-1').textContent='Player 2';
}

function hideDice() {
	document.querySelector('.dice1').style.display='none';
	document.querySelector('.dice2').style.display='none';
}


////////////////////////////////////////////////////////
