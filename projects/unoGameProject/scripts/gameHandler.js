// Import
import { CardManager } from "./deckHandler.js";
import { loadSettings } from "./storageHandler.js";

// game essentials vars
const cardPile = document.getElementById('card-pile');
const player1Cards = document.getElementById('player1-cards');
const player2Cards = document.getElementById('player2-cards');
const player3Cards = document.getElementById('player3-cards');
const player4Cards = document.getElementById('player4-cards');
const deck = document.getElementById('deck');
const popup = document.getElementById('popup-wrapper');
const txtWinner = document.getElementById('text-winner');
const restartBtn = document.getElementById('restart-btn');
// extra additions vars
const playerSettings = loadSettings();
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const player3Name = document.getElementById('player3-name');
const player4Name = document.getElementById('player4-name');
const player1Count = document.getElementById('player1-count');
const player2Count = document.getElementById('player2-count');
const player3Count = document.getElementById('player3-count');
const player4Count = document.getElementById('player4-count');

export class Game {
    field = new CardManager();
    turn = -1;
    player1 = new CardManager();
    player2 = new CardManager();
    player3 = new CardManager();
    player4 = new CardManager();
    gameActive = false;

    // Methods
    startGame() {
        console.debug('Game started...');
        //assign names to players
        this.player1.name = playerSettings ? JSON.parse(playerSettings).plrName :'Player 1';
        this.player2.name = 'Bot 0I';
        this.player3.name = 'Bot I0';
        this.player4.name = 'Bot II';
        player1Name.innerText = this.player1.name;
        player2Name.innerText = this.player2.name;
        player3Name.innerText = this.player3.name;
        player4Name.innerText = this.player4.name;
        // assign 8 cards to all players
        this.field.newCard();
        for (let i = 0; i < 8; i++) {
            this.player1.newCard();
            this.player2.newCard();
            this.player3.newCard();
            this.player4.newCard();
        }
        // let player pick up card if its their turn
        deck.addEventListener('click', () => {
            if (this.gameActive && this.turn % 4 == 0) {
                this.player1.newCard();
            };
        })
        restartBtn.addEventListener('click', () => {this.restartGame()})
        this.updatePlayerCards();
        this.updateCardPile();
        this.gameActive = true;
        this.playTurn();
    }

    // update the player cards DOM
    updatePlayerCards() {
        player1Cards.innerHTML = '';
        player2Cards.innerHTML = '';
        player3Cards.innerHTML = '';
        player4Cards.innerHTML = '';

        this.player1.deck.forEach((card, index) => {
            let playerCard = document.createElement('div');
            playerCard.className = 'card';
            playerCard.style.backgroundColor = card.colour;
            playerCard.innerText = card.value;
            // play card
            playerCard.addEventListener('click', () => {
                if (this.gameActive) {
                    if (this.turn % 4 == 0) {
                        this.player1.playCard(index, this.field.deck[0].colour, this.field.deck[0].value);
                    }
                }
            })
            player1Cards.appendChild(playerCard);
        })
        // set up hidden decks for bots
        this.player2.deck.forEach(() => {
            let playerCard = document.createElement('div');
            playerCard.className = 'card';
            playerCard.style.backgroundColor = 'darkgray';
            player2Cards.appendChild(playerCard);
        })

        this.player3.deck.forEach(() => {
            let playerCard = document.createElement('div');
            playerCard.className = 'card';
            playerCard.style.backgroundColor = 'darkgray';
            player3Cards.appendChild(playerCard);
        })

        this.player4.deck.forEach(() => {
            let playerCard = document.createElement('div');
            playerCard.className = 'card';
            playerCard.style.backgroundColor = 'darkgray';
            player4Cards.appendChild(playerCard);
        })
        // update DOM deck counter
        player1Count.innerText = this.player1.deck.length;
        player2Count.innerText = this.player2.deck.length;
        player3Count.innerText = this.player3.deck.length;
        player4Count.innerText = this.player4.deck.length;
    }

    // update the field values
    updateField(cardColour, cardValue) {
        this.field.deck[0].colour = cardColour;
        this.field.deck[0].value = cardValue;
        this.updateCardPile();
    }

    // update card pile DOM
    updateCardPile() {
        cardPile.style.backgroundColor = this.field.deck[0].colour;
        cardPile.innerText = this.field.deck[0].value;
    }
    // move turn to next player
    playTurn() {
        if (this.gameActive) {
            this.turn++;
            if (this.turn % 4 != 0) {
                // play a bot's turn after 1.5s
                setTimeout(() => this.botTurn(this.turn % 4), 1500);
            }
        }
    }

    // bot algorithm
    botTurn(turn) {
        // assign bot to their corresponding turns
        let bot;
        switch (turn) {
            case 1:
                bot = this.player2;
                console.debug(`Playing player 2's turn!`)
                break;
            case 2:
                bot = this.player3;
                console.debug(`Playing player 3's turn!`)
                break;

            case 3:
                bot = this.player4;
                console.debug(`Playing player 4's turn!`)
                break;

            default:
                console.error('Invalid turn for bot')
                break;
        }
        // check which cards the bot can place
        const playableCards = bot.deck.filter((card)=>card.colour == this.field.deck[0].colour || card.value == this.field.deck[0].value);
        // bot: play a card if can, else pick up a card
        if (playableCards.length > 0) {
            console.debug(playableCards);
            bot.playCard(bot.deck.indexOf(playableCards[0]), this.field.deck[0].colour, this.field.deck[0].value);
        } else {
            console.debug('Picking up card');
            bot.newCard();
        }
    }
    // check if any of the players won
    checkWinner() {
        if(this.player1.deck.length == 0) {
            this.endGame(this.player1.name);
        }
        if(this.player2.deck.length == 0) {
            this.endGame(this.player2.name);
        }
        if(this.player3.deck.length == 0) {
            this.endGame(this.player3.name);
        }
        if(this.player4.deck.length == 0) {
            this.endGame(this.player4.name);
        }
    }
    // end the game and announce the winner
    endGame(winner) {
        this.gameActive = false;
        console.log(`The winner is ${winner}`);
        popup.style.display = 'flex';
        txtWinner.innerText = `The winner is ${winner}`;
    }

    restartGame() {
        this.player1.deck = [];
        this.player2.deck = [];
        this.player3.deck = [];
        this.player4.deck = [];
        popup.style.display = 'None';
        this.startGame();
    }

    // For Debugging Purposes
    printGameInfo() {
        console.debug('Printing All Cards...');
        console.debug(this.field);
        console.debug(this.player1);
        console.debug(this.player2);
        console.debug(this.player3);
        console.debug(this.player4);
        console.debug('Printing Turn...')
        console.debug(this.turn);
    }
}