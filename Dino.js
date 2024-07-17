export class Dino {
  regra;
  dinoPosition;
  displayObject;
  isJumping;

  constructor(pos){
    this.regra = 'correr';
    this.isJumping = false;
    this.dinoPosition = pos;
    this.displayObject = document.getElementById("dino");
  }

  resetar_regra(){
    this.regra = '';
  }

  up(){
    this.dinoPosition= this.dinoPosition - 2.25 < 5 ? 5 : this.dinoPosition - 2.25
    this.displayObject.style.bottom = `${this.dinoPosition}px`;
  }

  down(){
    this.dinoPosition += 2.25;
    this.displayObject.style.bottom = `${this.dinoPosition}px`;
  }


  jump() {
    //if para impedir pulo no meio de outro pulo
    if (!this.isJumping) {
      this.isJumping = true;
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
        if (this.dinoPosition >= 80) {
          //limpar o intervalo para fazer ele parar de subir
          clearInterval(dinoJump);
          //timeout para fazer ele parar no ar um tempo, similar ao sleep()
          setTimeout(() => {
            let dinoDown = setInterval(() => {
              //if para não fazer ele descer infinitamente
              if (this.dinoPosition <= 5) {
                //limpar o intervalo para fazer ele parar de descer
                clearInterval(dinoDown);
                //permite ele poder pular novamente
                this.isJumping = false;
              } else {
                //diminui a posição y do dinossauro
                this.up();
                //atualiza a posição do dinossauro na DOM
                
              }
            }, 6);
          }, 150);
        } else {
          //aumenta a posição y do dinossauro
          this.down();
          //atualiza a posição do dinossauro na DOM
          
        }
      }, 6);
    }
  }
  
}