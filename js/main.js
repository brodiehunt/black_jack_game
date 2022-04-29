import Deck from './deck.js';
const deck = new Deck();
console.log(deck);
let dealerCards = [];
let playerCards = [];
let dealerSum = 0;
let playerSum = 0;
const playerCardsEl = document.getElementById("player_cards_el");
const dealerCardsEl = document.getElementById("dealer_cards_el");
const playerSumEl = document.getElementById("player_sum_el");
const startRoundBtn = document.getElementById("start_round_el")
const hitBtn = document.getElementById("hit_el")
const standBtn = document.getElementById("stand_el")

startRoundBtn.addEventListener("click", startRound);
hitBtn.addEventListener("click", hit);


function startRound() {

  startRoundBtn.classList.toggle("invisible");
  hitBtn.classList.toggle("invisible");
  standBtn.classList.toggle("invisible")
  
  // Push two new cards to the player, and one to the dealer when the round begins
  dealerCards.push(randomCard());
  playerCards.push(randomCard());
  playerCards.push(randomCard());
  

  // total sum is equal to the sum of all indexes in each respective array.
  // Reduce method returns 1 number, the sum of the each index in the array and it is stored in player/dealerSum variable. 
  playerSum = playerCards.reduce((totalCount, currentCard, ) => {
    return totalCount + currentCard.numVal}, 0);

  dealerSum = dealerCards.reduce((totalCount, currentCard) => {
    return totalCount + currentCard.numVal}, 0);
    console.log(playerSum, dealerSum);


  // loop through each array and ad the cards to the innerText of html element
  playerCards.forEach((card) => {
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerText = card.suit;
    newCard.setAttribute("data-value", `${card.value} ${card.suit}`);
    if (card.suit === "♣" || card.suit === "♠") {
      newCard.classList.add("black");
    } else {
      newCard.classList.add("red");
    }
    playerCardsEl.appendChild(newCard);
  })
  dealerCards.forEach((card) => {
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerText = card.suit;
    newCard.setAttribute("data-value", `${card.value} ${card.suit}`);
    if (card.suit === "♣" || card.suit === "♠") {
      newCard.classList.add("black");
    } else {
      newCard.classList.add("red");
    }
    dealerCardsEl.appendChild(newCard);
  })

  playerSumEl.innerText += playerSum;
}

// This function needs to, 
// Pick a random card for the player
// add that card to his array of cards,
// Change thier total sum
// End the game if they have 21 or >21
function hit() {
  let card = randomCard();
  playerCards.push(card);
  playerSum += card;
  playerCardsEl.innerText += ` ${card}`;
  playerSumEl.innerText = `Sum: ${playerSum};`;

  if (playerSum === 21) {
    console.log('You Won!!')

    refreshRound();
    // From here game needs to be refreshed
  } else if (playerSum > 21) {
    console.log('You Loose');
    refreshRound();
    
    // From here, game needs to be refreshed
  } else {
    console.log("hit or stand?")
  }
}

function refreshRound() {
  dealerCards = [];
  playerCards = [];
  dealerSum = 0;
  playerSum = 0;
  dealerCardsEl.innerText = "Dealer Cards:";
  playerCardsEl.innerText = "Player Cards:";
  playerSumEl.innerText = "Player Cards Sum: ";
  startRoundBtn.classList.toggle("invisible");
  hitBtn.classList.toggle("invisible");
  standBtn.classList.toggle("invisible")
}

function randomCard() {
  let index = Math.ceil(Math.random() * 52); 
  let card = deck.cards[index]
  return card;
}
