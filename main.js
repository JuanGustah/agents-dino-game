let game = document.getElementById("game");
let bg = document.getElementById("background");
let dino = document.getElementById("dino");
let scoreDOM = document.getElementById("score");

let gameTouched = false;
let gameStarted = false;

let bgPos = 640;
let gameRunning = false;

let score = 0;
let scoreTimeStamp = new Date().valueOf();

let cactusTimestamp = new Date().valueOf();
let randomTime = Math.random() * 4000;

let isJumping = false;
let dinoPosition = 0;

function generateCactus() {
  let now = new Date().valueOf();
  if (
    now - cactusTimestamp >= Math.floor(randomTime) &&
    //margem de segurança \/
    now - cactusTimestamp >= 800
  ) {
    cactusTimestamp = now;
    randomTime = Math.random() * 4000;

    let cactusPosition = 640;
    let cactus = document.createElement("div");
    cactus.classList.add("cactus");
    cactus.style.left = "640px";
    bg.appendChild(cactus);

    let cactusInterval = setInterval(() => {
      if (gameStarted) {
        if (cactusPosition < -30) {
          clearInterval(cactusInterval);
          bg.removeChild(cactus);
        } else if (
          cactusPosition > 0 &&
          cactusPosition < 60 &&
          dinoPosition < 35
        ) {
          clearInterval(cactusInterval);
          gameStarted = false;
        } else {
          cactusPosition -= 6;
          cactus.style.left = `${cactusPosition}px`;
        }
      }
    }, 30);
  }
}
function updateBackground() {
  bgPos -= 7;
  bg.style.backgroundPositionX = `${bgPos}px`;
}
function updateScore() {
  let now = new Date().valueOf();
  if (new Date().valueOf() - scoreTimeStamp >= 100) {
    scoreTimeStamp = now;
    score++;
    scoreDOM.innerText = String(score).padStart(5, "0");
  }
}
function jump() {
  if (!isJumping) {
    let dinoJump = setInterval(() => {
      if (dinoPosition >= 80) {
        clearInterval(dinoJump);
        setTimeout(() => {
          let dinoDown = setInterval(() => {
            if (dinoPosition <= 8) {
              clearInterval(dinoDown);
              isJumping = false;
            } else {
              dinoPosition -= 5;
              dino.style.bottom = `${dinoPosition}px`;
            }
          }, 15);
        }, 100);
      } else {
        dinoPosition += 8;
        dino.style.bottom = `${dinoPosition}px`;
      }
    }, 15);
  }
}

function gameCenter(event) {
  event.preventDefault();

  if (!gameTouched) gameTouched = true;

  if (event.code == "Enter" && !gameStarted) {
    gameStarted = true;
  }
}

let gameLoop = setInterval(() => {
  if (gameStarted) {
    updateBackground();
    updateScore();
    generateCactus();
  }else{
    if(gameTouched){
        
    }
  }
}, 30);

window.addEventListener("keyup", gameCenter);
window.addEventListener("click", jump);
