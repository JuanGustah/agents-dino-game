class Dino {
  regra;
  dinoPosition;

  constructor(pos){
    this.regra = 'correr'
    this.dinoPosition = pos
  }

  resetar_regra(){
    this.regra = '';
  }
}
class Obstaculo {
  cactusPosition;
  cod;

  constructor(cod, pos) {
    this.cactusPosition = pos;
    this.cod = cod;
  }
}
class Ambiente {
  lista_de_cactus;
  dino;
  estado;

  constructor() {
    this.lista_de_cactus = []
  }

  add_obstaculo(obstaculo) {
    this.lista_de_cactus.push(obstaculo)
  }

  remove_first_obstaculo(obstaculo) {
    const index = this.lista_de_cactus.findIndex(cacto => cacto.cod === obstaculo.cod);
    if (index !== -1) {
        this.lista_de_cactus.splice(index, 1);
    }
  }

  reset(){
    this.lista_de_cactus = [];
  }

  reseta_estado(){
    this.estado = '';
  }

}


// Pegando elementos da DOM
let game = document.getElementById("game");
let bg = document.getElementById("background");
let dino = document.getElementById("dino");
let scoreDOM = document.getElementById("score");

//Defindo variáveis de controle do loop do jogo

//variável que define se o jogo já foi iniciado anterioremente
let gameTouched = false;
//variável que define se o jogo já está atualmente em execução
let gameStarted = false;

/*
 * variável que define a posição atual do background
 * (como o background repet no eixo-x então, a estratégia é
 *  fazer ele mudar a posição cada vez mais para a esquerda,
 *  forçando o css a repetir o conteúdo, dando a impressão
 *  que ele é infinito)
 */
let bgPos = 640;

//valor inteiro do score para incremento
let score = 0;
/*
 * valor em milisegundos que será consultado,
 * pois o loop do jogo executa muito mais rápido do que o score deve alterar
 */
let scoreTimeStamp = new Date().valueOf();

//estrutura para guardar todos os intervalos dos cactus inseridos, para limpá-los caso o jogo reinicie
let cactisIntervals = [];
/*
 * valor em milisegundos que será consultado,
 * pois o loop do jogo executa muito mais rápido do que os cactus devem aparecer
 */
let cactusTimestamp = new Date().valueOf();
//tempo entre o surgimento de um cacto e outro, aleatório igual o jogo base
let randomTimeMax = 4000;
let randomTimeMin = 800;
let randomTime = Math.floor(
  Math.random() * (randomTimeMax - randomTimeMin) + randomTimeMin
);

//variável de controle para que não seja possível pular quando já está pulando
let isJumping = false;
/*
 * variável de controle da posição do dinossauro no eixo y
 * não é necessário controlar o eixo x do dino porque ele não 'anda'
 */
let dinoPosition = 0;

let multiplier = 1;

/*
 * função responsável por gerar novos cactos
 */
function generateCactus() {
  //recupera o tempo atual para comparação
  let now = new Date().valueOf();
  /*
   * if para garantir que mesmo que o loop do game seja mais veloz,
   * o cacto só irá gerar no tempo certo
   * o score deverá mudar apenas com o intervalo aleatório de no máximo 4s definido anteriormente
   * e no mínimo 800ms, para possibilitar ser possível de jogar e evitar bugs
   */
  if (now - cactusTimestamp >= randomTime && now - cactusTimestamp >= 600) {
    //atualiza o valor da última vez que foi executado, para verificação posterior
    cactusTimestamp = now;
    //atualiza o valor de quando deverá ser executado novamente
    randomTime = Math.floor(
      Math.random() * (randomTimeMax - randomTimeMin) + randomTimeMin
    );

    //variável de controle para fazer o cactus se mover
    //cacto começa no fim da tela
    let cactusobj = new Obstaculo(randomTime, 640)
    ambiente.add_obstaculo(cactusobj)
    //cria o cacto na estrutra html, mas não insere ainda
    let cactus = document.createElement("div");
    //define uma classe css para o cacto
    cactus.classList.add("cactus");
    //define a posição que o cacto deverá ter na tela
    cactus.style.left = "640px";
    //insere o cacto na tela, dentro da div do background
    bg.appendChild(cactus);

    /*
     * como o cactor deve atualizar pixel a pixel,
     * é preciso fazer um interval que vai atualizar isso em uma qtd X de tempo.
     */
    let cactusInterval = setInterval(() => {
      //como esse intervalo está alheio ao loop principal, deve verificar também se o jogo já iniciou
      if (gameStarted) {
        //if para verificar se o cacto já saiu da área visivel da tela
        if (cactusobj.cactusPosition < -30) {
          //para a movimentação do cacto
          clearInterval(cactusInterval);
          //remove o cacto da tela
          bg.removeChild(cactus);
          ambiente.remove_first_obstaculo(cactusobj)
        
        }
        //verifica se o dinossauro colidiu com o cacto
        //o cacto tem que estar na tela(>0)
        //o cacto tem que ter enconstado no eixo X do dino(<60)
        //o dinossauro tem que estar na altura do cacto(<35)
        else if (
          cactusobj.cactusPosition > 0 &&
          cactusobj.cactusPosition < 60 &&
          dinoObj.dinoPosition < 35
        ) {
          //para a movimentação do cacto
          clearInterval(cactusInterval);
          //finaliza o jogo(derrota)
          gameStarted = false;
        } else {
          //atualiza a posição do cacto
          cactusobj.cactusPosition -= 6 * multiplier;
          //atualiza a posição do cacto na tela
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
  //diminui a variável de controle do background, fazendo ele ir para trás
  bgPos -= 7 * multiplier;
  //atualiza a posição do background com o novo valor
  bg.style.backgroundPositionX = `${bgPos}px`;
}
/*
 * função responsável por atualizar o score do jogo
 */
function updateScore() {
  //recupera o tempo atual para comparação
  let now = new Date().valueOf();
  /*
   * if para garantir que mesmo que o loop do game seja mais veloz,
   * o score só irá mudar no tempo certo
   * o score deverá mudar apenas a cada 100ms (número arbitrário)
   */
  if (new Date().valueOf() - scoreTimeStamp >= 100) {
    //atualiza o valor de quando deverá ser executado novamente
    scoreTimeStamp = now;
    //aumenta o score em 1
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
      multiplier = 3;
    }
    //atualiza o score com 5 casa decimais, ex: 00234
    scoreDOM.innerText = String(score).padStart(5, "0");
  }
}
/*
 * função responsável por fazer o dinossauro pular
 */
function jump() {
  //if para impedir pulo no meio de outro pulo
  if (!isJumping) {
    isJumping = true;
    /*
     * como o dinossauro deve atualizar pixel a pixel,
     * é preciso fazer um interval que vai atualizar isso em uma qtd x de tempo.
     * Além disso, o pulo é a subida, pausa e descida do dinossauro. Para cada etapa, um intervalo.
     * Nesse caso, a cada 15ms o dinossauro sobe 8px (números arbitrários)
     * Pausa por 15ms no ar (números arbitrários)
     * Por fim, a cada 15ms o dinossauro desce 5px (números arbitrários)
     */
    let dinoJump = setInterval(() => {
      //if para não fazer ele subir infinitamente
      if (dinoObj.dinoPosition >= 80) {
        //limpar o intervalo para fazer ele parar de subir
        clearInterval(dinoJump);
        //timeout para fazer ele parar no ar um tempo, similar ao sleep()
        setTimeout(() => {
          let dinoDown = setInterval(() => {
            //if para não fazer ele descer infinitamente
            if (dinoObj.dinoPosition <= 5) {
              //limpar o intervalo para fazer ele parar de descer
              clearInterval(dinoDown);
              //permite ele poder pular novamente
              isJumping = false;
            } else {
              //diminui a posição y do dinossauro
              dinoObj.dinoPosition = dinoObj.dinoPosition - 2.25 < 5 ? 5 : dinoObj.dinoPosition - 2.25;
              //atualiza a posição do dinossauro na DOM
              dino.style.bottom = `${dinoObj.dinoPosition}px`;
            }
          }, 6);
        }, 150);
      } else {
        //aumenta a posição y do dinossauro
        dinoObj.dinoPosition += 2.25;
        //atualiza a posição do dinossauro na DOM
        dino.style.bottom = `${dinoObj.dinoPosition}px`;
      }
    }, 6);
  }
}

/*
 * função responsável por comandar todas os eventos de tecla que a aplicação recebe
 */
function gameCenter(event) {
  //impede side effects, como atualizar a página,etc
  event.preventDefault();

  //permite pular com barra de espaço
  if (event.code == "Space") {
    //jump();
    return;
  }

  //comanda o jogo pelo enter
  if (event.code == "Enter") {
    //define que se o jogo não foi executado antes, agora foi
    if (!gameTouched) gameTouched = true;

    //define que se o jogo não está executando antes, inicializa
    if (!gameStarted) {
      //remove o título de gameover, caso exista (por isso esse trecho: ?.)
      document.getElementById("gameOver")?.remove();
      //remove todo os cactus que foram inseridos
      Array.from(bg.children).forEach((node) => {
        node.remove();
      });
      //remove todos os intervalos dos cactus
      cactisIntervals.forEach((_, index) =>
        clearInterval(cactisIntervals[index])
      );
      multiplier = 1.25;
      randomTimeMax = 4000;
      randomTimeMin = 800;
      randomTime = Math.floor(
        Math.random() * (randomTimeMax - randomTimeMin) + randomTimeMin
      );
      //atualiza o valor inteiro do score
      score = 0;
      //atualiza o valor na tela do score
      scoreDOM.innerText = String(score).padStart(5, "0");
      //define o jogo como iniciado
      gameStarted = true;
    }
  }
}

/*
 * loop do jogo, padrão de projeto de jogos,
 * em que diferentemente da web, não responde a eventos mas sim
 * atualiza os estados através de um loop contínuo.
 * Nesse caso, o "tick" de gameplay ocorre a cada 30ms
 */
var ambiente = new Ambiente();
var dinoObj = new Dino(0);
let gameLoop = setInterval(() => {
  //só executa caso o jogo tenha sido iniciado
  if (gameStarted) {
    //atualiza o bg
    updateBackground();
    //atualiza o score
    updateScore();
    //gera um novo cacto
    generateCactus();
    agente_reativo_simples(ambiente);
  } else {
    //se o jogo não tiver iniciado, verifica se o jogo já foi executado alguma vez anteriormente (derrota)
    if (gameTouched) {
      let gameOver = document.createElement("p");
      gameOver.innerText = "GAME OVER";
      gameOver.id = "gameOver";
      ambiente.reset()
      //adiciona a mensagem de gameover na tela
      game.appendChild(gameOver);
      //define as variáveis de controle para falso para poder executar do zero novamente
      gameStarted = false;
      gameTouched = false;
    }
  }
}, 30);

const regras = {
  "obstaculo": "pular"
}

function agente_reativo_simples(percepcao) {
  percepcao.estado = interpreta_entrada(percepcao)
  dinoObj.regra = regra_correspondente(percepcao.estado, regras)  

  acao_da_regra(dinoObj.regra);

  percepcao.reseta_estado();
  dinoObj.resetar_regra();

}

function regra_correspondente(estado, regras) {
  return regras[estado] !== undefined ? regras[estado] : null;
}
//percepcao é lista de cactos ou seja o ambiente atual
function interpreta_entrada(percepcao) {
  if (percepcao.lista_de_cactus.length > 0) {
    let cacto = percepcao.lista_de_cactus[0].cactusPosition;
    if (cacto < 100) {
      return "obstaculo"
    }
    return "livre"
  }
}

function acao_da_regra(regra) {
  if(regra === "pular"){
    jump();
  }
}

//escuta todas as vezes que uma tecla é apertada
window.addEventListener("keydown", gameCenter);
