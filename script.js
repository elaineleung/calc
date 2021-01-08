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

const calculator = {
  displayValue: '0',
  allInputs: [],
  firstOperand: null,
  waitingForNextOperand: false,
  operator: null,
  equalSignPressed: false,
};

let simpleEval = 0;
let simpleView = true;

const updateDisplay = () => {
  classicDisplay.value = calculator.displayValue
}

const allClear = () => {
  calculator.displayValue = '0';
  calculator.allInputs = [];
  calculator.equalSignPressed = false;
  calculator.waitingForNextOperand = false;
}

if (simpleView === true) updateDisplay();
// simpleInput.focus();
const solveSimple = () => {
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

const inputDigit = (digit) => {
  const { displayValue, waitingForNextOperand,equalSignPressed } = calculator;

  console.log(equalSignPressed)
  if (equalSignPressed === true) {
    allClear();
    calculator.displayValue = digit;
    calculator.equalSignPressed = false;
  } else if (waitingForNextOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForNextOperand = false;
  } else {   
    calculator.displayValue = displayValue === '0' ? digit 
    : displayValue + digit
  }
}

const inputDecimal = (dot) => {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

const handleOperator = (nextOperator) => {
  const { displayValue, firstOperand, waitingForNextOperand, equalSignPressed } = calculator;
  const inputValue = parseFloat(displayValue);

  if (equalSignPressed === true) {
    calculator.allInputs.push(nextOperator);
    calculator.equalSignPressed = false;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue
    calculator.allInputs.push(inputValue)
    calculator.allInputs.push(nextOperator.toString())
  } else if (waitingForNextOperand === true) {
    calculator.allInputs.pop()
    calculator.allInputs.push(nextOperator.toString())
  } else {
    calculator.allInputs.push(inputValue)
    calculator.displayValue = eval(calculator.allInputs.join(''))
    calculator.allInputs.push(nextOperator.toString())
  }
  // else if (!isNaN(calculator.allInputs[calculator.allInputs.length-1])) {
  //   calculator.allInputs.pop()
  //   calculator.allInputs.push(nextOperator.toString())
  // } else {
  //   calculator.allInputs.push(inputValue)
  //   calculator.allInputs.push(nextOperator.toString())
  // }
  calculator.waitingForNextOperand = true;
  // calculator.allInputs.push(nextOperator.toString())
  calculator.operator = nextOperator;
  console.log(calculator.allInputs[calculator.allInputs.length-1])
  console.log(calculator.allInputs)
  console.log(calculator.allInputs.length)
}



const calculateEquation = () => {
  const { displayValue, allInputs, equalSignPressed } = calculator; 
  const inputValue = parseFloat(displayValue)
  
  if (equalSignPressed === true) {
    null
  } else {
  allInputs.push(inputValue)
  calculator.displayValue = eval(calculator.allInputs.join(''))
  calculator.equalSignPressed = true
  calculator.waitingForNextOperand = false;
  console.log(allInputs)
  }
}

calcKeys.addEventListener('click', (event) => {
  const { target } = event;
  // if (!target.matches('button')) {
  //   return;
  // }
  if (target.classList.contains('operator')) {
    handleOperator(target.value)
  } else if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
  } else if (target.classList.contains('all-clear')) {
    allClear();
  } else if (target.classList.contains('equal-sign')) {
    calculateEquation();
  } else {
  inputDigit(target.value);
  }
  updateDisplay();
})


simpleMode.addEventListener("click", () => {
  simpleContainer.style.display = "flex";
  simpleMode.classList.add("active");
  classicContainer.style.display = "none";
  classicMode.classList.remove("active");
  simpleView = true;
});

classicMode.addEventListener("click", () => {
  classicContainer.style.display = "flex";
  simpleContainer.style.display = "none";
  simpleMode.classList.remove("active");
  classicMode.classList.add("active");
  simpleView = false;
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

// window.addEventListener("keydown", function(e){
//   if (classicMode.classList.contains("active")){
//     const displayed = classicDisplay.textContext;
//     const key = document.querySelector(`button[value="${e.key}"]`)
//     if (isFinite(e.key)){
//       let pressed;
//       if(classicDisplay.textContent === '0'){
//         pressed = e.key
//         classicDisplay.textContent = calcNum.textContent;
//         console.log(pressed)
//       } else {
//         pressed = pressed.toString().concat(e.key)
//         console.log("pressed", pressed)
//      }
//     } else {
//     const action = document.querySelector(`button[data-action="${e.key}"]`)
//     console.log(e.key, action)
//     }
//   }
//   // const action = key.dataset.action

//   // if (
//   //   action === 'add' ||
//   //   action === 'subtract' ||
//   //   action === 'multiply' ||
//   //   action === 'divide'
//   // ) {
//   //   console.log('operator key!', e.target)
//   // } else {
//   //   console.log('number key!', e.target)
//   // }123
// })

resetButton.addEventListener("click", function() {
  simpleDisplay.textContent = "0";
  simpleInput.value = "";
});
