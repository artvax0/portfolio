// Import
// import { updateDOM } from "./domBuilder.js";

import { game } from "./app.js";

// Card Handling
const cardColours = ['red', 'blue', 'green', 'yellow'];
const cardValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


export class Card {
    #colour;
    #value;

    get colour() {
        return this.#colour;
    }
    set colour(value) {
        this.#colour = value;
    }

    get value() {
        return this.#value;
    }
    set value(value) {
        this.#value = value;
    }

    constructor(colour, value) {
        this.colour = colour;
        this.value = value;
    }
}

export class CardManager {
    deck = [];
    name;

    newCard() {
        let newCard = new Card(cardColours[Math.floor(Math.random() * cardColours.length)], cardValues[Math.floor(Math.random() * cardValues.length)]);
        this.deck.push(newCard);
        game.updatePlayerCards();
        game.playTurn();
    }

    playCard(index, fieldColour, fieldValue) {
        if (this.deck[index].colour == fieldColour || this.deck[index].value == fieldValue) {
            console.debug('Playing card...');
            console.debug(this.deck[index]);
            game.updateField(this.deck[index].colour, this.deck[index].value);
            this.deck.splice(index, 1);
            game.updatePlayerCards();
            game.updateCardPile();
            game.checkWinner();
            game.playTurn();
        } else {
            console.warn(`Can't place this card`);
        }
    }
}