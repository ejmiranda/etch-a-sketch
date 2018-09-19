const grid = document.querySelector(`.grid`);
const gridHeight = grid.getBoundingClientRect().height;
const gridWidth = grid.getBoundingClientRect().width;
const newBtn = document.querySelector(`.new`);
const clearBtn = document.querySelector(`.clear`);
const secPanel = document.querySelector(`.secondary`);
const sizeInput = document.querySelector(`.size`);
const enterBtn = document.querySelector(`.enter`);

createGrid();

newBtn.addEventListener(`click`, () => {
  toggleSecondaryPanel();
});

clearBtn.addEventListener(`click`, () => {
  for (gridSquare of Array.from(grid.children)) {
    gridSquare.classList.remove(`painted`);
  }
});

enterBtn.addEventListener(`click`, () => {
  createGrid(+sizeInput.value);
  toggleSecondaryPanel();
});

function removeGrid() {
  for (let gridSquare of Array.from(grid.children)) {
      grid.removeChild(gridSquare);
    }
}

function toggleSecondaryPanel() {
  secPanel.classList.toggle(`visible`);  
  newBtn.disabled = !newBtn.disabled;
  clearBtn.disabled = !clearBtn.disabled;
}

function createGrid(gridSize = 16) {
  removeGrid();
  for (i = 0; i < gridSize*gridSize; i++) {
    let gridSquare = document.createElement(`div`);
    gridSquare.style.height = `${gridHeight / gridSize}px`;
    gridSquare.style.width = `${gridWidth / gridSize}px`;
    gridSquare.classList.add(`grid-square`);
    gridSquare.addEventListener(`mousemove`, (event) => {
      gridSquare.classList.add(`painted`);
    });
    grid.appendChild(gridSquare);
  }
}
