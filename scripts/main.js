let grid = document.querySelector(`.grid`);
let newBtn = document.querySelector(`.new`);
let clearBtn = document.querySelector(`.clear`);
let sizePanel = document.querySelector(`.size-panel`);
let sizeInput = document.querySelector(`.size`);
let enterBtn = document.querySelector(`.enter`);

createGrid();

clearBtn.addEventListener(`click`, () => {
  for (gridRow of Array.from(grid.children)) {
    for (gridBlock of Array.from(gridRow.children)) {
      gridBlock.classList.remove(`painted`);
    }
  }
});

newBtn.addEventListener(`click`, () => {
  toggleSizePanel();
});

enterBtn.addEventListener(`click`, () => {
  createGrid(+sizeInput.value);
  toggleSizePanel();
});

function createGrid(size = 16) {
  clearGrid();
  for (let i = 0; i < size; i++) {
    let gridRow = document.createElement(`div`);
    for (let j = 0; j < size; j++) {
      let gridBlock = document.createElement(`div`);
      gridBlock.classList.add(`grid-block`);
      gridBlock.addEventListener(`mousemove`, (event) => {
        gridBlock.classList.add(`painted`);
      });
      gridRow.appendChild(gridBlock);
    }
    grid.appendChild(gridRow);
  }
}

function clearGrid() {
  for (let gridRow of Array.from(grid.children)) {
      grid.removeChild(gridRow);
    }
}

function toggleSizePanel() {
  sizePanel.classList.toggle(`visible`);  
  newBtn.disabled = !newBtn.disabled;
  clearBtn.disabled = !clearBtn.disabled;
}
