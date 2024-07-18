export function sensor() {
  let cactos = document.getElementById("background").children;
  if (cactos.length == 0) {
    return null;
  }

  let posicaoCacto = cactos[0];
  return posicaoCacto;
}
