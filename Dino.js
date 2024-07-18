export class Dino {
  // regra;
  dinoPosition;
  displayObject;
  isJumping;

  constructor(pos) {
    // this.regra = "correr";
    this.isJumping = false;
    this.dinoPosition = pos;
    this.displayObject = document.getElementById("dino");
  }

  // resetar_regra() {
  //   this.regra = "";
  // }

  up() {
    this.dinoPosition =
      this.dinoPosition - 2.25 < 5 ? 5 : this.dinoPosition - 2.25;
    this.displayObject.style.bottom = `${this.dinoPosition}px`;
  }

  down() {
    this.dinoPosition += 2.25;
    this.displayObject.style.bottom = `${this.dinoPosition}px`;
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;

      let dinoJump = setInterval(() => {
        if (this.dinoPosition >= 80) {
          clearInterval(dinoJump);
          setTimeout(() => {
            let dinoDown = setInterval(() => {
              if (this.dinoPosition <= 5) {
                clearInterval(dinoDown);
                this.isJumping = false;
              } else {
                this.up();
              }
            }, 6);
          }, 150);
        } else {
          this.down();
        }
      }, 6);
    }
  }
}
