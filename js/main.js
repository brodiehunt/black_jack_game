import Deck from './deck.js';
// Card deck initiallised from class, code in deck.js
const deck = new Deck();

// initial variables
let dealerCards = [];
let playerCards = [];
let dealerSum = 0;
let playerSum = 0;
let bank = 2500;
let bet = 20; 

// html elements to add content too
const playerCardsEl = document.getElementById("player_cards_el");
const dealerCardsEl = document.getElementById("dealer_cards_el");
const playerSumEl = document.getElementById("player_sum_el");
const gameMessageEl = document.getElementById("game_message");
const bankEl = document.getElementById("bank_el");
const betEl = document.getElementById("bet_el");

// Button selectors
const startRoundBtn = document.getElementById("start_round_el");
const hitBtn = document.getElementById("hit_el");
const standBtn = document.getElementById("stand_el");
const playAgainBtn = document.getElementById("play_again");
const chip10 = document.getElementById("chip_10");
const chip20 = document.getElementById("chip_20");
const chip50 = document.getElementById("chip_50");
const chip100 = document.getElementById("chip_100");

// Button event listeners
startRoundBtn.addEventListener("click", startRound);
hitBtn.addEventListener("click", hitPlayer);
standBtn.addEventListener("click", stand);
playAgainBtn.addEventListener("click", playAgain);
chip10.addEventListener('click', changeBet);
chip20.addEventListener('click', changeBet);
chip50.addEventListener('click', changeBet);
chip100.addEventListener('click', changeBet);

// Function that starts round, triggered when start round button clicked
function startRound() {
  startRoundBtn.classList.toggle("invisible");
  hitBtn.classList.toggle("invisible");
  standBtn.classList.toggle("invisible")
  gameMessageEl.innerHTML ='';
  bankEl.innerHTML = bank;
  betEl.innerHTML = bet;
  // Push two new cards to the player, and one to the dealer when the round begins
  dealerCards.push(randomCard());
  playerCards.push(randomCard());
  playerCards.push(randomCard());
  // total sum is equal to the sum of all indexes in each respective array.
  // Reduce method returns 1 number, the sum of the each index in the array and it is stored in player/dealerSum variable. 
  playerSum = playerCards.reduce((totalCount, currentCard ) => {
    return totalCount + currentCard.numVal}, 0);
  dealerSum = dealerCards.reduce((totalCount, currentCard) => {
    return totalCount + currentCard.numVal}, 0);

  // loop through each array and ad the cards to the innerText of html element
  playerCards.forEach((card, index) => {
    let newCard = drawCard(card);
    sleep(500 * (index + 1)).then(() => {
      playerCardsEl.appendChild(newCard);
    })
    
  })

  
  dealerCards.forEach((card) => {
    let newCard = drawCard(card);
    dealerCardsEl.appendChild(newCard);
  })
  let flippedCard = document.createElement("div");
  flippedCard.classList.add("card", "flipped");
  dealerCardsEl.appendChild(flippedCard);
  playerSumEl.innerText = `Sum: ${playerSum}`;
  checkNaturalBlackJack();
}

// When player first two cards = 21 (natural blackjack) they win instantly unless dealer also has natural blackjack;
function checkNaturalBlackJack() {
  console.log("Entering check natural blackJack")
  if (playerSum === 21) {
    hitDealer();
    if (dealerSum === 21) {
      roundDraw();
    } else {
      blackJack();
    }
  }
}


// Function that creates div for card, and fills html with content/attributes/classes for styling. Returns an created div element.
function drawCard(card) {
  let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerText = card.suit;
    newCard.setAttribute("data-value", `${card.value} ${card.suit}`);
    if (card.suit === "♣" || card.suit === "♠") {
      newCard.classList.add("black");
    } else {
      newCard.classList.add("red");
    }
    return newCard;
}

// This function needs to, 
// Pick a random card for the player
// add that card to his array of cards,
// Change thier total sum
// End the game if they have 21 or >21
function hitPlayer() {
  let card = randomCard();
  let newCard = drawCard(card)
  playerCards.push(card);
  playerSum += card.numVal;
  playerCardsEl.appendChild(newCard);
  playerSumEl.innerText = `Sum: ${playerSum}`;

  if (playerSum > 21) {
    roundLost();
  }
  if (playerSum === 21) {
    stand();
  }
  // When the dealer hits the player, if they bust game is over.
  // if they get 21, then the dealer flips until > player hand or bust
  // nothing else happens because the program will wait for player to stand.
}

function hitDealer() {
  // remove flipped card from html
  let flippedCard = document.querySelector(".flipped");
  
  if (flippedCard) {
    dealerCardsEl.removeChild(flippedCard);
  }
  
  // draw new card from deck and push to dealers array and add to DOM
  let card = randomCard();
  let newCard = drawCard(card);
  dealerCards.push(card);
  dealerSum += card.numVal;
  dealerCardsEl.appendChild(newCard);
}


// Called when player stands or gets 21 after hitting. 
async function stand() {
  await sleep(500);
  hitDealer();
  if (dealerSum < 17) {
    stand();
  } else if (dealerSum > 21) {
    roundWon();
  } else {
    if (dealerSum > playerSum) {
      roundLost();
    } else if (dealerSum === playerSum) {
      roundDraw();
    } else {
      roundWon();
    }
  }
  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



// Function Run if person gets blackJack
// if natural black jack, check to see if dealer has black jack, if so draw, if not, win
// if win, congrats message, if draw, its a draw message
function blackJack() {
  gameMessageEl.innerText = "You've Got BlackJack!";
  bank += bet;
  bankEl.innerHTML = bank;
  removePlayButtons();
}

function roundLost() {
  if (playerSum > 21) {
    gameMessageEl.innerText = "You've Bust!";
  } else {
    gameMessageEl.innerText = "You Loose!";
  }
  bank -= bet;
  bankEl.innerHTML = bank;
  removePlayButtons();
}

function roundWon() {
  gameMessageEl.innerText = "You've Won!";
  bank += bet;
  bankEl.innerHTML = bank;
  removePlayButtons();
}

function roundDraw() {
  gameMessageEl.innerText = "It's a Draw!";
  removePlayButtons();
}

// resets variables to initial value, wipes html content from containers, toggles buttons to re-appear ready for new round.
function playAgain() {
  dealerCards = [];
  playerCards = [];
  dealerSum = 0;
  playerSum = 0;
  playerCardsEl.innerHTML ='';
  dealerCardsEl.innerHTML='';
  playerSumEl.innerHTML = '';
  gameMessageEl.innerHTML = 'Deal Cards to Play Again';
  startRoundBtn.classList.toggle("invisible");
  playAgainBtn.classList.toggle("invisible");
}



function removePlayButtons() {
  hitBtn.classList.toggle("invisible");
  standBtn.classList.toggle("invisible");
  playAgainBtn.classList.toggle("invisible");
}

function changeBet(event) {
  if (event.target.id == "chip_10") {
    bet = 10;
    betEl.innerHTML = bet;
  } else if (event.target.id == "chip_20") {
    bet = 20;
    betEl.innerHTML = bet;
  } else if (event.target.id == "chip_50") {
    bet = 50;
    betEl.innerHTML = bet;
  } else {
    bet = 100;
    betEl.innerHTML = bet;
  }
}




// Pulls a random card from the deck of cards imported and created at top of page
function randomCard() {
  let index = Math.floor(Math.random() * 52); 
  let card = deck.cards[index]
  return card;
}
