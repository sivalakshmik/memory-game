const cards = document.querySelectorAll('.board');
const scoreSpan = document.querySelector('.score');
const resetBtn = document.querySelector('.reset-button');

let hasFlippedCard = false;
let lockedBoard = false;
let firstCard, secondCard;
let score = 0;

function updateScore(amount) {
    score += amount;
    scoreSpan.textContent = score;
}

function flipCard() {
    if (lockedBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        
        secondCard = this;
        checkForMatch();

    }


function checkForMatch() {
   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

   isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    updateScore();
    resetBoard();
}

function unflipCards() {
    lockedBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
       
        resetBoard();
    }, 1500);
};

function resetBoard() {
    [hasFlippedCard, lockedBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
function restart() {
    location.reload();
}



cards.forEach(card => card.addEventListener('click', flipCard));
resetBtn.addEventListener('click', restart)