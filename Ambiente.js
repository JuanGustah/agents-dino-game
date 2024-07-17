import { Dino } from './Dino.js';

export class Ambiente {
  lista_de_cactus;
  dino;
  estado;

  constructor() {
    this.lista_de_cactus = []
    this.dino = new Dino(0)
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
