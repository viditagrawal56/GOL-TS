const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 800;

const BOARD_ROWS = 32;
const BOARD_COLS = 32;

const CELL_WIDTH = BOARD_WIDTH / BOARD_COLS;
const CELL_HEIGHT = BOARD_HEIGHT / BOARD_ROWS;

type State = "alive" | "dead";

const board: Array<Array<State>> = [];

for (let i = 0; i < BOARD_ROWS; i++) {
  board.push(new Array(BOARD_COLS).fill("dead"));
}

function drawGrid(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.strokeStyle = "#AAAAAA";
  ctx.lineWidth = 1;
  for (let i = 1; i < BOARD_COLS; i++) {
    let x = i * CELL_WIDTH;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, BOARD_HEIGHT);
  }
  for (let i = 1; i < BOARD_ROWS; i++) {
    let y = i * CELL_HEIGHT;
    ctx.moveTo(0, y);
    ctx.lineTo(BOARD_WIDTH, y);
  }
  ctx.stroke();
}

function drawBoard(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == "alive") {
        const x = j * CELL_WIDTH;
        const y = i * CELL_HEIGHT;
        ctx.fillStyle = "#5050FF";
        ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
      }
    }
  }
}

function drawGame(ctx: CanvasRenderingContext2D) {
  drawGrid(ctx);
  drawBoard(ctx);
}

const app = document.getElementById("app") as HTMLCanvasElement;
if (app === null) throw new Error("Cannot find the canvas");
app.height = BOARD_HEIGHT;
app.width = BOARD_WIDTH;

const ctx = app.getContext("2d");
if (ctx === null) throw new Error("Cannot find the context");
ctx.fillStyle = "#181818";
ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

app.addEventListener("click", (e) => {
  let col = Math.floor(e.offsetX / CELL_WIDTH);
  let row = Math.floor(e.offsetY / CELL_HEIGHT);
  board[row][col] = "alive";
  drawBoard(ctx);
});

drawGame(ctx);
