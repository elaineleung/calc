const body = document.querySelector("body");

const simpleContainer = document.getElementById("simple-container");
const simpleInput = document.getElementById("simple-input");
const simpleDisplay = document.getElementById("simple-display");

const classicContainer = document.getElementById("classic-container");
const classicDisplay = document.getElementById("classic-display");

const solveButton = document.getElementById("solve-button");
const resetButton = document.getElementById("reset-button");

const simpleMode = document.querySelector(".simple-mode");
const classicMode = document.querySelector(".classic-mode");

const calcKeys = classicContainer.querySelector(".calculator-keys")
let simpleEval = 0;

// simpleInput.focus();

function solveSimple() {
  const simpleInputVal = simpleInput.value;

  try {
    if (!simpleInputVal) {
      simpleDisplay.textContent = 0;
    } else {
      simpleEval = eval(simpleInputVal);
      simpleEval < 999999999999999
        ? (simpleDisplay.textContent = simpleEval)
        : (simpleDisplay.textContent = "Number too big!");
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
    if (simpleInput.value && (e.key === 'Enter')) {
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

window.addEventListener("keydown", function(e){
  if (classicMode.classList.contains("active")){
    console.log(classicDisplay.textContent)
    const displayed = classicDisplay.textContext
    if (isFinite(e.key)){
      const key = document.querySelector(`button[value="${e.key}"]`)
      console.log(key.textContent)
      classicDisplay.textContent = key.textContent
    } else {
    const action = document.querySelector(`button[data-action="${e.key}"]`)
    console.log(e.key, action)
    }
  }
  // const action = key.dataset.action

  // if (
  //   action === 'add' ||
  //   action === 'subtract' ||
  //   action === 'multiply' ||
  //   action === 'divide'
  // ) {
  //   console.log('operator key!', e.target)
  // } else {
  //   console.log('number key!', e.target)
  // }123
})

resetButton.addEventListener("click", function() {
  simpleDisplay.textContent = "0";
  simpleInput.value = "";
});
