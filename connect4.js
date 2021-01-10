/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
function makeBoard() {
  for (let i = 0; i<HEIGHT;i++){
    board[i] = new Array(WIDTH).fill(null);
  }
  return board; 
};

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board')
  // TODO: add comment for this code
  // creates a tablerow, gives it an id of 'column-top', and adds a click event listener that passes to handleClick()
  // this is where you put in the pieces and how it assigns the x value for where you clicked
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {      //need to iterate down the arrays 
  for (let i = HEIGHT - 1; i >= 0; i--){
    if (i === 0){
      alert('You can not place a piece there!');
      return null;
    }
    if (board[i][x] === null) {       //if this spot is null, that spot is empty
      return i;                     //return that spot for y
    } else if (board[i][x] === 'piece1' || 'piece2'){
      if (board[i-1][x] === null){
        return i-1;
      }
    } else
      return null;
    }
  }

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {       //board[x][y] is the spot in the array of arrays
  newDiv = document.createElement('div');
  board[y][x] = currPlayer;
  document.getElementById(`${y}-${x}`).appendChild(newDiv).classList.add('piece' + currPlayer)
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // //x is the target that was clicked (try to get td id # to use in arrays)
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  if (checkForTie()) {
    return endGame(`It's a tie!`);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  currPlayer = (currPlayer === 1) ? 2 : 1;            //this is a switch players function, use where needed
}

function checkForTie() {
  const isNull = (currentValue) => currentValue !== null;
  const isATie = board.every(element => element.every(isNull));
  return isATie;
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {              //start iterating along each row
    for (let x = 0; x < WIDTH; x++) {             //in each row, iterate along each cell
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];           //and each time you change cells, make a horiz, vert, etc variables that represent where those would be on the board variable starting at that cell
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {      //now compare those variables to the board and see if they meet the "win" condition of every piece being a legal space holding the currPlayer variable (1 or 2)
        return true;                  //and if it's true, you have a win
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
