const mainContainer = document.getElementById("main-container");
const equationField = document.getElementById("equation-field");
const solveButton = document.getElementById("solve-button");
const resetButton = document.getElementById("reset-button");
const solutionDisplay = document.getElementById("solution-display");

function solve() {
  solutionDisplay.textContent = "0";
  if (equationField.value) {
    try {
      let result = eval(equationField.value);
      solutionDisplay.textContent = result;
    } catch (e) {
      if (e) {
        const error = "Yikes, error!";
        solutionDisplay.textContent = error;
      }
    }
  }
}

solveButton.addEventListener("click", solve);

window.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    solve();
  }
});
resetButton.addEventListener("click", function() {
  solutionDisplay.textContent = "0";
  equationField.value = "";
});
