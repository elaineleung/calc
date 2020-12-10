const body = document.querySelector("body");
const simpleContainer = document.getElementById("simple-container");
const classicContainer = document.getElementById("classic-container");
const simpleInput = document.getElementById("simple-input");
const simpleDisplay = document.getElementById("simple-display");

const solveButton = document.getElementById("solve-button");
const resetButton = document.getElementById("reset-button");

const simpleMode = document.querySelector(".simple-mode");
const classicMode = document.querySelector(".classic-mode");
let simpleEval = 0;

// simpleInput.focus();

function solveSimple() {
  const simpleInputVal = simpleInput.value;

  try {
    if (!simpleInputVal) {
      simpleDisplay.textContent = 0;
    } else {
      simpleEval = eval(simpleInputVal);
      simpleDisplay.textContent = simpleEval;
    }
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
    if (e.keyCode === 13) {
      try {
        simpleInput.value = eval(simpleInput.value);
      } catch (e) {
        null;
      }
      // } else if (e.keyCode === 8) {
      //   simpleDisplay.textContent = "0";
      //   simpleInput.value = "";
    } else {
      solveSimple();
    }
  } else {
    null;
  }
});

resetButton.addEventListener("click", function() {
  simpleDisplay.textContent = "0";
  simpleInput.value = "";
});
