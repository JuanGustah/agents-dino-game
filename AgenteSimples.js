import { atuador } from "./atuador.js";
import { sensor } from "./sensor.js";

export class AgenteSimples {
  regras;

  constructor() {
    this.regras = {
      obstaculo: "pular",
      livre: "nada",
    };
  }

  agente_reativo_simples(percepcao) {
    let estado = this.interpreta_entrada(percepcao);
    let regra = this.regra_correspondente(estado, this.regras);
    let acao = this.acao_da_regra(regra);
    return acao;
  }

  interpreta_entrada(percepcao) {
    if (percepcao) {
      let posicaoCacto = percepcao.posicaoCacto.offsetLeft;
      if (posicaoCacto < 100) {
        return "obstaculo";
      }
      return "livre";
    }
    return "livre";
  }

  regra_correspondente(estado, regras) {
    return regras[estado];
  }

  acao_da_regra(regra) {
    if (regra === "pular") {
      return 1;
    } else {
      return 0;
    }
  }
}

var ag = new AgenteSimples();

// setInterval(() => {
//   let p = sensor();
//   if (p) {
//     let ac = ag.agente_reativo_simples(p);
//     atuador(ac);
//   }
// }, 30);
