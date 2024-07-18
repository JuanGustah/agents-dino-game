var counter = 10;
var state = "far";
var action = "";

function doNothing() {
  console.log("Done nothing");
}

function act(rule) {
  if (rule == "jump") {
    jump();
  }
  return doNothing();
}

function sensor() {
  return document.getElementById("background").children;
}

function updateState(state, action, percept, model) {
  let hasCactusClose = Array.from(percept).some((element) => {
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

function associetedRule(state, rules) {
  return rules[state];
}

function dinoAgent(percept) {
  let rules = {
    close: "jump",
    far: "nothing",
  };

  let state = updateState(state, action, percept, model);
  let rule = associetedRule(state, rules);
  return act(rule);
}

// var myFunction = function () {
//   dinoAgent();
//   setTimeout(myFunction, counter);
// };
// setTimeout(myFunction, counter);
