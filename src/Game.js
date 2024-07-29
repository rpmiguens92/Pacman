import TileMapp from "./TileMapp.js";

const tileSize = 32; //32px o tamanho de cada imagem que forma o pacman
const velocity = 2;
const canvas = document.getElementById("gameCanvas"); //ligaçao ao index
const ctx = canvas.getContext("2d");
const tileMap = new TileMapp(tileSize);
const pacman = tileMap.getPacman(velocity);

function gameLoop() {
  //console.log("game loop");
  tileMap.draw(ctx);
  pacman.draw(ctx);
}

tileMap.setCanvasSize(canvas); //conectar ao canvas
setInterval(gameLoop, 1000 / 75); //update do jogo

