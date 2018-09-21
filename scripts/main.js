const container = document.querySelector(`.container`);
const grid = document.querySelector(`.grid`);
const gridHeight = grid.getBoundingClientRect().height;
const gridWidth = grid.getBoundingClientRect().width;
const priPanel = document.querySelector(`.primary`); 
const newBtn = document.querySelector(`.new`);
const clearBtn = document.querySelector(`.clear`);
const secPanel = document.querySelector(`.secondary`);
const sizeSelect = document.querySelector(`.size`);
const enterBtn = document.querySelector(`.enter`);
const cancelBtn = document.querySelector(`.cancel`);

createGrid();
container.insertBefore(secPanel, priPanel);
for (let i = 16; i <= 48; i += 8) {
  let option = document.createElement(`option`);
  option.value = i;
  option.textContent = i;
  sizeSelect.appendChild(option);
}

newBtn.addEventListener(`click`, () => {
  toggleNewBtn();
  if (newBtn.classList.contains(`pressed`)) {
    toggleSecondaryPanel(true);
  } else {
    toggleSecondaryPanel(false);
  }
});

clearBtn.addEventListener(`click`, () => {
  for (let gridSquare of Array.from(grid.children)) {
    gridSquare.classList.remove(`painted`);
    gridSquare.style.backgroundColor = getRandomRGBString(255, 255);
  }
});

enterBtn.addEventListener(`click`, () => {
  createGrid(+sizeSelect.value);
  toggleNewBtn();
  toggleSecondaryPanel(false);
});

cancelBtn.addEventListener(`click`, () => {
  toggleNewBtn();
  toggleSecondaryPanel(false);
});

function createGrid(gridSize = 16) {
  removeGrid();
  for (let i = 0; i < gridSize*gridSize; i++) {
    let gridSquare = document.createElement(`div`);
    gridSquare.style.height = `${gridHeight / gridSize}px`;
    gridSquare.style.width = `${gridWidth / gridSize}px`;
    gridSquare.classList.add(`grid-square`);
    gridSquare.addEventListener(`mouseover`, (event) => {
      paintGridSquare(gridSquare);
    });
    grid.appendChild(gridSquare);
  }
}

function removeGrid() {
  for (let gridSquare of Array.from(grid.children)) {
      grid.removeChild(gridSquare);
    }
}

function paintGridSquare(gridSquareToPaint) {
  if (gridSquareToPaint.classList.contains(`painted`)) {
    let currentRGBString = gridSquareToPaint.style.backgroundColor    
    gridSquareToPaint.style.backgroundColor = getDarkerRGBString(currentRGBString, 10);
  } else {
    gridSquareToPaint.classList.add(`painted`);
    gridSquareToPaint.style.backgroundColor = getRandomRGBString(0, 255);
  }
}

function getDarkerRGBString(string, percentage) {
  let color = {r: 0, g: 0, b: 0};
  let colorArray = string.slice(4, string.length - 1).split(`, `);
  color.r = colorArray[0] - (Math.floor(percentage / 100 * 255));
  color.g = colorArray[1] - (Math.floor(percentage / 100 * 255));
  color.b = colorArray[2] - (Math.floor(percentage / 100 * 255));
  for (value in color) {
    value = (value < 0) ? 0 : value;
  }
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function getRandomRGBString(fromValue, toValue) {
  let color = {r: 0, g: 0, b: 0};
  color.r = Math.floor((Math.random() * toValue) + fromValue);
  color.g = Math.floor((Math.random() * toValue) + fromValue);
  color.b = Math.floor((Math.random() * toValue) + fromValue);
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function toggleNewBtn() {
  newBtn.classList.toggle(`pressed`);
}

function toggleSecondaryPanel(isHidden) {
  let fromValue = 0;
  let toValue = 0;
  if (isHidden) {
    fromValue = priPanel.getBoundingClientRect().top;
    toValue = priPanel.getBoundingClientRect().bottom - 
        secPanel.getBoundingClientRect().height + 10;
  } else {
    fromValue = priPanel.getBoundingClientRect().bottom - 
        secPanel.getBoundingClientRect().height + 10;
    toValue = priPanel.getBoundingClientRect().top - 25;
  }
  let position = fromValue;
  let interval = setInterval(frame, 5);
  function frame() {
    if (position === toValue) {
      clearInterval(interval);
    } else {
      if (fromValue < toValue) {
        position++;
      } else {
        position--;
      }
      secPanel.style.top = `${position}px`;
    }
  }
}