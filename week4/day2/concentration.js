const $wrapper = document.querySelector('#wrapper');

const total = parseInt(prompt('카드 수를 짝수로 입력하세요(최대 20).'));
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink', 'cyan', 'violet', 'gray', 'black'];
const FLIPPED = 'flipped';

let colorSlice = colors.slice(0, total / 2);
let colorCopy = colors.concat(colorSlice);
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;
let startTime;

const shuffle = () => {
  while (colorCopy.length > 0) {
    const randomIdx = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIdx, 1));
  }
}

const createCard = (idx) => {
  const card = document.createElement('div');
  card.className = 'card';
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  cardFront.style.backgroundColor = shuffled[idx];
  cardInner.appendChild(cardBack);
  cardInner.appendChild(cardFront);
  card.appendChild(cardInner);
  return card;
}

function onClickCard() {
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }
  this.classList.toggle(FLIPPED);
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }

  const card1 = clicked[0].querySelector('.card-front').style.backgroundColor;
  const card2 = clicked[1].querySelector('.card-front').style.backgroundColor;
  if (card1 === card2) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    if (completed.length !== total) {
      return;
    }

    const endTime = new Date();
    setTimeout(() => {
      alert(`축하합니다! ${(endTime - startTime) / 1000}초 걸렸습니다.`);
      resetGame();
    }, 1000);
    return;
  }

  clickable = false;
  setTimeout(() => {
    clicked[0].classList.remove(FLIPPED);
    clicked[1].classList.remove(FLIPPED);
    clicked = [];
    clickable = true;
  }, 500);
}

const startGame = () => {
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll('.card').forEach((card, idx) => {
    setTimeout(() => {
      card.classList.add(FLIPPED);
      clickable = true;
      startTime = new Date();
    }, 1000 + 100 * idx);

    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => card.classList.remove(FLIPPED));
      clickable = true;
    }, 5000);
  });
}

const resetGame = () => {
  $wrapper.innerHTML = '';
  colorCopy = colorSlice.concat(colorSlice);
  shuffled = [];
  completed = [];
  clickable = false;
  startGame();
}

startGame();