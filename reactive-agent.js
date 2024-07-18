var counter = 10;

function doNothing() {
  console.log("Done nothing");
}

function act(rule) {
  if (rule == "jump") {
    jump();
  }
  return doNothing();
}

function perceive() {
  let bgChildren = document.getElementById("background").children;
  let hasCactusClose = Array.from(bgChildren).some((element) => {
    if (element.offsetLeft >= 80 && element.offsetLeft <= 110) {
      return true;
    }
    return false;
  });

  if (hasCactusClose) {
    return "close";
  }
  return "far";
}

function associetedRule(perception, rules) {
  return rules[perception];
}

function dinoAgent() {
  let rules = {
    close: "jump",
    far: "nothing",
  };

  let state = perceive();
  let rule = associetedRule(state, rules);
  return act(rule);
}

// var myFunction = function () {
//   dinoAgent();
//   setTimeout(myFunction, counter);
// };
// setTimeout(myFunction, counter);
