import { atuador } from "./atuador.js";
import { sensor } from "./sensor.js";

export class AgenteBaseadoModelo {
  estado;
  modelo;
  regras;
  acao;

  constructor() {
    this.regras = {
      obstaculo: "pular",
      livre: "nada",
    };
    this.modelo = {
      obsctacleSpeed: 6,
      multiplier: {
        1: 1.25,
        2: 1.5,
        3: 1.75,
        4: 2,
      },
    };
    this.acao = null;
    this.estado = null;
  }

  agente_baseado_modelo(percepcao) {
    this.estado = this.atualizar_estado(
      this.estado,
      this.acao,
      percepcao,
      this.modelo
    );

    let regra = this.regra_correspondente(this.estado, this.regras);
    this.acao = this.acao_da_regra(regra);
    return this.acao;
  }

  atualizar_estado(estado, acao, percepcao, modelo) {
    if (estado == null) {
      let posicaoCacto = percepcao.posicaoCacto.offsetLeft;
      if (posicaoCacto < 100) {
        return "obstaculo";
      }
      return "livre";
    } else {
      if (acao == 0) {
        let multiplier;

        if (percepcao.score < 50) {
          multiplier = modelo.multiplier[1];
        }
        if (percepcao.score > 50 && percepcao.score <= 100) {
          multiplier = modelo.multiplier[2];
        }
        if (percepcao.score > 100 && percepcao.score <= 200) {
          multiplier = modelo.multiplier[3];
        }
        if (percepcao.score > 200) {
          multiplier = modelo.multiplier[4];
        }

        let posicaoCacto = percepcao.posicaoCacto.offsetLeft;
        if (posicaoCacto - modelo.obsctacleSpeed * multiplier < 100) {
          return "obstaculo";
        }
        return "livre";
      }
    }
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

var am = new AgenteBaseadoModelo();

// setInterval(() => {
//   let p = sensor();
//   if (p) {
//     let ac = am.agente_baseado_modelo(p);
//     atuador(ac);
//   }
// }, 30);
