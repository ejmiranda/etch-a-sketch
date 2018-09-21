const container = document.querySelector(`.container`);
const grid = document.querySelector(`.grid`);
const gridHeight = grid.getBoundingClientRect().height;
const gridWidth = grid.getBoundingClientRect().width;
const priPanel = document.querySelector(`.primary`); 
const newBtn = document.querySelector(`.new`);
const clearBtn = document.querySelector(`.clear`);
const secPanel = document.querySelector(`.secondary`);
const sizeInput = document.querySelector(`.size`);
const enterBtn = document.querySelector(`.enter`);

createGrid();
container.insertBefore(secPanel, priPanel);

newBtn.addEventListener(`click`, () => {
  toggleSecondaryPanel();
});

clearBtn.addEventListener(`click`, () => {
  for (let gridSquare of Array.from(grid.children)) {
    gridSquare.classList.remove(`painted`);
    gridSquare.style.backgroundColor = getRandomRGBString(255, 255);
  }
});

enterBtn.addEventListener(`click`, () => {
  createGrid(+sizeInput.value);
  toggleSecondaryPanel();
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

function toggleSecondaryPanel() {
  newBtn.disabled = !newBtn.disabled;
  clearBtn.disabled = !clearBtn.disabled;
  let position = priPanel.getBoundingClientRect().top;
  let id = setInterval(frame, 5);
  function frame() {
    if (position === priPanel.getBoundingClientRect().bottom - 10) {
      clearInterval(id);
    } else {
      position++;
      secPanel.style.top = `${position}px`;
    }
  }
}