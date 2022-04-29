const SUITS = ["♣", "♠", "♥", "♦"];
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];


export default class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.numVal = Number(value) || 10;
  }
}

function newDeck() {
  let deck = SUITS.flatMap(suit => {
    
    return VALUES.map(value => {
      
      return new Card(suit,value);
    })
  })

  deck.forEach(item => {
    if (item.value === "A") {
      item.numVal = 11;
    }
  })
  return deck;
  
}
