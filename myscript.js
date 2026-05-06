// Basic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? 'Error: Cannot divide by zero' : a / b;
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
    default:
      return 'Error: Invalid operator';
  }
}

// DOM elements
const numberKeys = document.querySelectorAll('.number');
const operatorKeys = document.querySelectorAll('.operator');
const decimalKey = document.querySelector('.decimal');
const output = document.querySelector('.output');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const delButton=document.querySelector('.del');

// Variables
let displayValue = '';
let operator = '';
let operands = [];
//let decimalPressed = false;

// Functions
function clearDisplay() {
  displayValue = '';
  operator = '';
  operands = [];
  //decimalPressed = false;
  output.innerHTML = '0';
}

function updateDisplay(value) {
  const lastNumber = displayValue.split(/[\+\-\*\/]/).pop();

  // prevent multiple leading zeros
  if (lastNumber === "0" && value === "0") return;

  // replace 0 with number (01 → 1)
  if (lastNumber === "0" && value !== ".") {
    displayValue = displayValue.slice(0, -1) + value;
  } else {
    displayValue += value;
  }

  output.innerHTML = displayValue;
}

function handleNumberClick(e) {
  const number = e.target.textContent;
  updateDisplay(number);
}

function handleOperatorClick(e) {
  const clickedOperator = e.target.textContent;

  if (displayValue !== '') {
    if (operator === '') {
      operands.push(displayValue);
      displayValue += clickedOperator;
      output.innerHTML = displayValue;
      operator = clickedOperator;
    } else {
      const lastCharacter = displayValue.slice(-1);
      if (lastCharacter === '+' || lastCharacter === '-' || lastCharacter === '*' || lastCharacter === '/') {
        displayValue = displayValue.slice(0, -1) + clickedOperator;
        output.innerHTML = displayValue;
        operator = clickedOperator;
      } else {
        calculate();
        displayValue += clickedOperator;
        output.innerHTML = displayValue;
        operator = clickedOperator;
      }
    }
  }
}

function handleDecimalClick() {
  const lastNumber = displayValue.split(/[\+\-\*\/]/).pop();

  if (!lastNumber.includes('.')) {
    displayValue += '.';
    output.innerHTML = displayValue;
  }
}

function calculate() {
  if (operator !== '') {
    const parts = displayValue.split(operator);

    let num1 = parts[0];
    let num2 = parts[1];

    displayValue = parseFloat(operate(operator, num1, num2).toFixed(6));

    output.innerHTML = displayValue;
    operator = '';
    operands = [];
  }
}

function deleteLastDigit() {
  if (displayValue.length > 0) {
    displayValue = displayValue.slice(0, -1);
    output.innerHTML = displayValue;
  }
}

// Event listeners
numberKeys.forEach((numberKey) => {
  numberKey.addEventListener('click', handleNumberClick);
});

operatorKeys.forEach((operatorKey) => {
  operatorKey.addEventListener('click', handleOperatorClick);
});

decimalKey.addEventListener('click', handleDecimalClick);

clearButton.addEventListener('click', clearDisplay);

equalButton.addEventListener('click', calculate);

delButton.addEventListener('click',deleteLastDigit);

// runs as soon as the page loads or reloads
init();


