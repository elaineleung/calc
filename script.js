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

// Calculator Mode

const calculator = {
  displayValue: '0',
  allInputs: [],
  hasFirstOperand: false,
  waitingForNextOperand: false,
  operator: null,
  equalSignPressed: false,
};

const updateDisplay = () => {
  classicDisplay.value = calculator.displayValue
}

const resetCalc = () => {
  calculator.allInputs = [];
  calculator.equalSignPressed = false;
  calculator.waitingForNextOperand = false;
  calculator.hasFirstOperand = false;
}

const allClear = () => {
  calculator.displayValue = '0';
  resetCalc();
}

const inputDigit = (digit) => {
  const { displayValue, waitingForNextOperand,equalSignPressed } = calculator;

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
  const { displayValue, hasFirstOperand, waitingForNextOperand, equalSignPressed } = calculator;
  
  const inputValue = parseFloat(displayValue);

  switch (true) {
    case equalSignPressed:
      calculator.displayValue = inputValue;
      calculator.allInputs.push(nextOperator);
      break;
    case hasFirstOperand === false && !isNaN(inputValue):
      calculator.hasFirstOperand = true;
      calculator.allInputs.push(inputValue);
      calculator.allInputs.push(nextOperator.toString());
      break;
    case waitingForNextOperand:
      calculator.allInputs.pop();
      calculator.allInputs.push(nextOperator.toString());
      break;
    default:
      calculator.allInputs.push(inputValue);
      calculator.displayValue = eval(calculator.allInputs.join(''));
      calculator.allInputs.push(nextOperator.toString());
  }
  calculator.equalSignPressed = false;
  calculator.waitingForNextOperand = true;
  calculator.operator = nextOperator;
  
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
  }
}

const reverseSign = () => {
  const { displayValue } = calculator;
  const positive = Math.abs(calculator.displayValue);
  const negative = 0 - calculator.displayValue;

  if (displayValue < 0) {
    resetCalc();
    calculator.displayValue = positive;
  } else {
    resetCalc();
    calculator.displayValue = negative;
  } 
  calculator.hasFirstOperand = true;
  updateDisplay();
}


calcKeys.addEventListener('click', (event) => {
  const { target } = event;

  if (!target.matches('button')) {
    return;
  }

  switch (true) {
    case target.classList.contains('operator'):
      handleOperator(target.value);
      break;
    case target.classList.contains('decimal'):
      inputDecimal(target.value);
      break;
    case target.id === 'all-clear':
      allClear();
      break;
    case target.classList.contains('equal-sign'):
      calculateEquation();
      break;
    case target.id === 'plus-min':
      reverseSign();
      break;
    default:
      inputDigit(target.value);
  }

  updateDisplay();
})

window.addEventListener("keydown", function(e){
  if (classicMode.classList.contains("active")) {
   
    const allKeys = '1234567890.+-*/c'
    if (allKeys.includes(e.key) || e.key === 'Enter') {
      const keyPressed = document.querySelector(`button[value="${e.key}"]`)

      switch (true) {
        case keyPressed.classList.contains('operator'):
          handleOperator(e.key);
          break;
        case keyPressed.classList.contains('decimal'):
          inputDecimal(target.value);
          break;
        case keyPressed.id === 'all-clear':  
          allClear();
          break;
        case keyPressed.classList.contains('equal-sign'):  
          calculateEquation();
          break;
        default:
          inputDigit(e.key);
      }
      updateDisplay();
    }
  }
})

// Simple Mode

const simple = {
  displayValue: 0,
  view: true,
}

const solveSimple = () => {
  const { displayValue } = simple;
  const simpleInputVal = simpleInput.value;

  try {
    if (!simpleInputVal) {
      simpleDisplay.textContent = 0;
    } else {
      simple.displayValue = eval(simpleInputVal);
      displayValue < 999999999999999
        ? (simpleDisplay.textContent = simple.displayValue)
        : (simpleDisplay.textContent = "Number too big!");
    }
  } catch (e) {
    null;
  }
}

simpleMode.addEventListener("click", () => {
  simpleContainer.style.display = "flex";
  simpleMode.classList.add("active");
  classicContainer.style.display = "none";
  classicMode.classList.remove("active");
  simple.view = true;
});

classicMode.addEventListener("click", () => {
  classicContainer.style.display = "flex";
  simpleContainer.style.display = "none";
  simpleMode.classList.remove("active");
  classicMode.classList.add("active");
  simple.view = false;
});

window.addEventListener("keyup", function(e) {
  if (simpleMode.classList.contains("active")) {
    if (simpleInput.value && (e.key === 'Enter')) {
      try {
        simpleInput.value = eval(simpleInput.value);
      } catch (e) {
        null;
      }

    } else {
      solveSimple();
    }
  } else {
    null;
  }
});

if (simple.view === true) updateDisplay();

resetButton.addEventListener("click", function() {
  simpleDisplay.textContent = "0";
  simpleInput.value = "";
});
