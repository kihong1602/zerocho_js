const $form = document.querySelector('#form');
const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
const $timer = document.querySelector('#timer');

let row; // 행 사이즈
let cell; // 열 사이즈
let mine; // 지뢰 개수
const CODE = {
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0,
}

let data;
let openCount = 0;
let startTime;
let interval;

function onSubmit(e) {
  e.preventDefault();
  row = parseInt(e.target.row.value);
  cell = parseInt(e.target.cell.value);
  mine = parseInt(e.target.mine.value);
  openCount = 0;
  clearInterval(interval);

  $tbody.innerHTML = '';
  drawTable();
  startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.textContent = `${time}초`;
  }, 1000);
}

$form.addEventListener('submit', onSubmit);

function plantMine() { // 지뢰 심기
  const candidate = Array(row * cell).fill(0).map((arr, i) => i);
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let i = 0; i < shuffle.length; i++) {
    const ver = Math.floor(shuffle[i] / cell);
    const hor = shuffle[i] % cell;
    data[ver][hor] = CODE.MINE;
  }
  return data;
}

function onRightClick(e) {
  e.preventDefault();
  const target = e.target;
  const row = target.parentNode.rowIndex;
  const col = target.cellIndex;
  const cell = data[row][col];

  switch (cell) {
    case CODE.MINE: {
      data[row][col] = CODE.QUESTION_MINE;
      target.className = 'question';
      target.textContent = '?';
      break;
    }
    case CODE.QUESTION_MINE: {
      data[row][col] = CODE.FLAG_MINE;
      target.className = 'flag';
      target.textContent = '!';
      break;
    }
    case CODE.FLAG_MINE: {
      data[row][col] = CODE.MINE;
      target.className = '';
      target.textContent = '';
      break;
    }
    case CODE.NORMAL: {
      data[row][col] = CODE.QUESTION;
      target.className = 'question';
      target.textContent = '?';
      break;
    }
    case CODE.QUESTION: {
      data[row][col] = CODE.FLAG;
      target.className = 'flag';
      target.textContent = '!';
      break;
    }
    case CODE.FLAG: {
      data[row][col] = CODE.NORMAL;
      target.className = '';
      target.textContent = '';
      break;
    }
  }
}

function countMine(row, col) { // 주변 지뢰 개수 세기
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let count = 0;
  mines.includes(data[row - 1]?.[col - 1]) && count++;
  mines.includes(data[row - 1]?.[col]) && count++;
  mines.includes(data[row - 1]?.[col + 1]) && count++;
  mines.includes(data[row][col - 1]) && count++;
  mines.includes(data[row][col + 1]) && count++;
  mines.includes(data[row + 1]?.[col - 1]) && count++;
  mines.includes(data[row + 1]?.[col]) && count++;
  mines.includes(data[row + 1]?.[col + 1]) && count++;
  return count;
}

function open(row, col) {
  if (data[row]?.[col] >= CODE.OPENED) {
    return;
  }

  const target = $tbody.children[row]?.children[col];
  if (!target) {
    return;
  }

  const count = countMine(row, col);
  target.textContent = count || '';
  target.className = 'opened';
  data[row][col] = count;

  openCount++;
  console.log(openCount);

  if (openCount === row * cell - mine) {
    const time = (new Date() - startTime) / 1000;
    clearInterval(interval);
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
    setTimeout(() => {
      alert(`승리했습니다! ${time}초가 걸렸습니다.`);
    }, 0);
  }
  return count;
}

function openAround(row, col) {
  setTimeout(() => {
    const count = open(row, col);
    if (count === 0) {
      openAround(row - 1, col - 1);
      openAround(row - 1, col);
      openAround(row - 1, col + 1);
      openAround(row, col - 1);
      openAround(row, col + 1);
      openAround(row + 1, col - 1);
      openAround(row + 1, col);
      openAround(row + 1, col + 1);
    }
  }, 0);
}

function onLeftClick(e) {
  const target = e.target;
  const row = target.parentNode.rowIndex;
  const col = target.cellIndex;
  const cell = data[row][col];
  if (cell === CODE.NORMAL) {
    openAround(row, col);
  } else if (cell === CODE.MINE) {
    target.textContent = '펑';
    target.className = 'opened';
    clearInterval(interval);
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.addEventListener('click', onLeftClick);
  }
}

function drawTable() { // 맵 그리기
  data = plantMine();
  data.forEach(row => {
    const $tr = document.createElement('tr');
    row.forEach(cell => {
      const $td = document.createElement('td');
      if (cell === CODE.MINE) {
        $td.textContent = '';
      }
      $tr.append($td);
    });
    $tbody.append($tr);
    $tbody.addEventListener('contextmenu', onRightClick);
    $tbody.addEventListener('click', onLeftClick);
  });
}