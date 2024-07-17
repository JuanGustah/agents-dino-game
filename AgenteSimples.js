export class AgenteSimples {
  regras; 
  
  constructor() {
    this.regras = {
      "obstaculo": "pular"
    }
 
  }

  agente_reativo_simples(ambiente, dinoObj) {
    ambiente.estado = this.interpreta_entrada(ambiente)
    dinoObj.regra = this.regra_correspondente(ambiente.estado, this.regras)  
  
    this.acao_da_regra(dinoObj);
  
    ambiente.reseta_estado();
    dinoObj.resetar_regra();
  
  }

  regra_correspondente(estado, regras) {
    return this.regras[estado] !== undefined ? this.regras[estado] : null;
  }
  
  //ambiente é lista de cactos ou seja o ambiente atual
  interpreta_entrada(ambiente) {
    if (ambiente.lista_de_cactus.length > 0) {
      let cacto = ambiente.lista_de_cactus[0].cactusPosition;
      if (cacto < 100) {
        return "obstaculo"
      }
      return "livre"
    }
  }
  
  acao_da_regra(dinoObj) {
    if(dinoObj.regra === "pular"){
      dinoObj.jump();
    }
  }
}