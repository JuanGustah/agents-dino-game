export function atuador(action) {
  switch (action) {
    case 0:
      break;
    case 1:
      const event = new KeyboardEvent("keydown", {
        key: "Space",
        code: "Space",
      });
      window.dispatchEvent(event);
      break;
  }
}
