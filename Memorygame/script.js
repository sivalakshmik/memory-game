const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restartBtn");

// Image for cards
const icons = ["./images/Burgerking.png", 
               "./images/Domino.png", 
               "./images/Kfc.png",
               "./images/Mc.png",
               "./images/Pizzahut.png",
               "./images/popeyes.png",
               "./images/star.png",
               "./images/done.png"];
let cards = [...icons, ...icons]; // duplicate for pairs

let flippedCards = [];
let matchedCards = [];

// Shuffle function (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create card elements
function createBoard() {
  board.innerHTML = "";
  cards = shuffle(cards);

  cards.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${icon}" alt="card image" />
        </div>
        <div class="card-back">
          <img src="images/5.png" alt="back image" />
        </div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card, icon));
    board.appendChild(card);
  });
}


// Flip logic
function flipCard(card, icon) {
  if (
    flippedCards.length < 2 &&
    !card.classList.contains("flipped") &&
    !matchedCards.includes(icon)
  ) {
    card.classList.add("flipped");
    flippedCards.push({ card, icon });

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check if 2 cards match
function checkMatch() {
  const [first, second] = flippedCards;
  if (first.icon === second.icon) {
    matchedCards.push(first.icon);
    flippedCards = [];
  } else {
    setTimeout(() => {
      first.card.classList.remove("flipped");
      second.card.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Restart game
restartBtn.addEventListener("click", () => {
  flippedCards = [];
  matchedCards = [];
  createBoard();
});

// Initialize
createBoard();
