import { Dino } from "./Dino.js";
import { Obstaculo } from "./Obstaculo.js";
import { Ambiente } from "./Ambiente.js";
import { AgenteSimples } from "./AgenteSimples.js";

let game = document.getElementById("game");
let bg = document.getElementById("background");
let scoreDOM = document.getElementById("score");

var dinoObj = new Dino(0);

let gameTouched = false;
let gameStarted = false;

let bgPos = 640;

let score = 0;
let scoreTimeStamp = new Date().valueOf();

let cactisIntervals = [];
let cactusTimestamp = new Date().valueOf();
let randomTimeMax = 4000;
let randomTimeMin = 800;
let randomTime = Math.floor(
  Math.random() * (randomTimeMax - randomTimeMin) + randomTimeMin
);

let multiplier = 1.25;

/*
 * função responsável por gerar novos cactos
 */
function generateCactus() {
  let now = new Date().valueOf();

  if (now - cactusTimestamp >= randomTime && now - cactusTimestamp >= 600) {
    cactusTimestamp = now;
    randomTime = Math.floor(
      Math.random() * (randomTimeMax - randomTimeMin) + randomTimeMin
    );

    let cactusobj = new Obstaculo(randomTime, 640);

    let cactus = document.createElement("div");
    cactus.classList.add("cactus");
    cactus.style.left = "640px";
    bg.appendChild(cactus);

    let cactusInterval = setInterval(() => {
      if (gameStarted) {
        if (cactusobj.cactusPosition < -30) {
          clearInterval(cactusInterval);
          bg.removeChild(cactus);
          // ambiente.remove_first_obstaculo(cactusobj);
        } else if (
          cactusobj.cactusPosition > 0 &&
          cactusobj.cactusPosition < 60 &&
          dinoObj.dinoPosition < 35
        ) {
          clearInterval(cactusInterval);
          gameStarted = false;
        } else {
          cactusobj.cactusPosition -= 6 * multiplier;
          cactus.style.left = `${cactusobj.cactusPosition}px`;
        }
      }
    }, 30);
    cactisIntervals.push(cactusInterval);
  }
}

/*
 * função responsável por mover o fundo do jogo
 */
function updateBackground() {
  bgPos -= 7 * multiplier;
  bg.style.backgroundPositionX = `${bgPos}px`;
}
/*
 * função responsável por atualizar o score do jogo
 */
function updateScore() {
  let now = new Date().valueOf();

  if (new Date().valueOf() - scoreTimeStamp >= 100) {
    scoreTimeStamp = now;
    score++;

    if (score > 50 && multiplier < 1.5) {
      multiplier = 1.5;
      randomTimeMax = 3000;
    }
    if (score > 100 && multiplier < 1.75) {
      multiplier = 1.75;
      randomTimeMax = 2000;
      randomTimeMin = 600;
    }
    if (score > 200 && multiplier < 2) {
      randomTimeMax = 1000;
      randomTimeMin = 400;
      multiplier = 2;
    }
    scoreDOM.innerText = String(score).padStart(5, "0");
  }
}

function gameCenter(event) {
  event.preventDefault();

  if (event.code == "Space") {
    dinoObj.jump();
    return;
  }

  if (event.code == "Enter") {
    if (!gameTouched) gameTouched = true;

    if (!gameStarted) {
      document.getElementById("gameOver")?.remove();
      Array.from(bg.children).forEach((node) => {
        node.remove();
      });
      cactisIntervals.forEach((_, index) =>
        clearInterval(cactisIntervals[index])
      );
      multiplier = 1.25;
      randomTimeMax = 4000;
      randomTimeMin = 800;
      randomTime = Math.floor(
        Math.random() * (randomTimeMax - randomTimeMin) + randomTimeMin
      );
      score = 0;
      scoreDOM.innerText = String(score).padStart(5, "0");
      gameStarted = true;
      gameTouched = true;
    }
  }
}

let gameLoop = setInterval(() => {
  if (gameStarted) {
    updateBackground();
    updateScore();
    generateCactus();
  } else {
    if (gameTouched) {
      let gameOver = document.createElement("p");
      gameOver.innerText = "GAME OVER";
      gameOver.id = "gameOver";
      game.appendChild(gameOver);
      gameStarted = false;
      gameTouched = false;
    }
  }
}, 30);

window.addEventListener("keydown", gameCenter);
