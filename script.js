const simpleContainer = document.getElementById("simple-container");
const classicContainer = document.getElementById("classic-container");
const simpleInput = document.getElementById("simple-input");
const simpleDisplay = document.getElementById("simple-display");

const solveButton = document.getElementById("solve-button");
const resetButton = document.getElementById("reset-button");

const simpleMode = document.getElementById("simple-mode");
const classicMode = document.getElementById("classic-mode");

function solveSimple() {
  let simpleInputVal = simpleInput.value;

  let simpleEval = 0;
  // let simpleVals = ["0"]

  try {
    simpleVals = simpleInputVal.split("");
    simpleEval = eval(simpleInputVal);
    simpleDisplay.textContent = simpleEval;
  } catch (e) {
    null;
  }
}

simpleMode.addEventListener("click", function() {
  simpleContainer.style.display = "flex";
  simpleMode.classList.add("active");
  classicContainer.style.display = "none";
  classicMode.classList.remove("active");
});
classicMode.addEventListener("click", function() {
  classicContainer.style.display = "flex";
  simpleContainer.style.display = "none";
  simpleMode.classList.remove("active");
  classicMode.classList.add("active");
});

window.addEventListener("keyup", function(e) {
  if (simpleMode.classList.contains("active")) {
    solveSimple();
  } else {
    null;
  }
});
resetButton.addEventListener("click", function() {
  simpleDisplay.textContent = "0";
  simpleInput.value = "";
});
