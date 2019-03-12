/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) +1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'; //changing img in web from 1 to 6

        // 3. Update the round score IF the rolled number is NOt a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice; // roundScore = roundScore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore; //scores that he had + scores that he just got

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; //Define scores from active player

        // Ckeck if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // Active player changes from 0 to 1, from 1 to 0
        roundScore = 0; //counting Player's-2 scores from what he already had
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0'; // counting scores from 0
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active'); // changing active sides when reach img-1
        
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        
        document.querySelector('.dice').style.display = 'none'; //No dice when changing players
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

document.querySelector('.dice').style.display = 'none'; //get rid of random number at the center, without .dice img

document.getElementById('score-0').textContent ='0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0'; // Setting ('...') to 0, by their IDs from html 
document.getElementById('name-0').textContent = 'Player 1'; //to change "winner" to "player" when starts new game
document.getElementById('name-1').textContent = 'Player 2'; //to change winner to player when starts new game
document.querySelector('.player-0-panel').classList.remove('winner'); //removes "winner" class when new game starts
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active'); //no one of players are activePlayer, but will be only one, we don't define who
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active'); //when we sure that there're no active classes, add active to the Player1 (Player1 is always starts the game)
}




//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x); //to read element form the page in console


//Next player
/*
activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // If 0, then activePlayer 1, if 1, then activePlayer 0 (in Global).// the same to do like:
    if(activePlayer === 0) {
    activePlayer = 1;
    } else { 
    activePlayer = 0;
    } 
*/