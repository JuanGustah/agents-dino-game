export function sensor() {
  let cactos = document.getElementById("background").children;
  let score = Number(document.getElementById("score").innerText);
  if (cactos.length == 0) {
    return null;
  }

  let posicaoCacto = cactos[0];
  return {
    posicaoCacto,
    score,
  };
}
