const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => button.addEventListener('click', addToExpression));

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => button.addEventListener('click', addToExpression));

const decimalPoint = document.querySelector('#decimalPoint');
decimalPoint.addEventListener('click', addToExpression);

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', removeLastSelection);

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearAll);

const evaluateButton = document.querySelector('#evaluate');
evaluateButton.addEventListener('click', evaluateExpression);

const operationDisplay = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');
operationDisplay.textContent = '';
resultDisplay.textContent = 0;

let buttonSelections = [];
let expression = '';
let result = 0;

function addToExpression(event) {
    const button = event.target;

    if (buttonSelections.length === 0) {  // When user selects the first button
        if (button.textContent === '*'
            || button.textContent === '/'
            || button.textContent === '.') {

            return;
        }

        buttonSelections.push(button);
        expression += button.textContent;
        operationDisplay.textContent = expression;

    } else {
        const lastButton = buttonSelections[buttonSelections.length - 1];
        if (isOperator(lastButton) && isOperator(button)
            || isOperator(lastButton) && button.textContent === '.'
            || lastButton.textContent === '.' && isOperator(button)) {

            return;
        }

        buttonSelections.push(button);
        expression += button.textContent;
        operationDisplay.textContent = expression;
    }
}

function isOperator(element) {
    return element.classList.contains('operator');
}

function removeLastSelection() {
    buttonSelections.pop();
    expression = expression.slice(0, expression.length - 1);
    operationDisplay.textContent = expression;
}

function clearAll() {
    buttonSelections = [];
    operationDisplay.textContent = '';
    resultDisplay.textContent = '';
}

function evaluateExpression() {
    const lastButton = buttonSelections[buttonSelections.length - 1];
    if (isOperator(lastButton) || lastButton.textContent === '.') {
        return;
    }

    const operators = expression.match(/[^0-9.]/g);
    const operator = operators.length === 2 ? operators[1] : operators[0];      // In case the first one is + or -
    const opertorIndex = expression.indexOf(operator);
    
    const firstOperand = +expression.slice(0, opertorIndex);
    const secondOperand = +expression.slice(opertorIndex + 1);

    result = operate(operator, firstOperand, secondOperand);
    resultDisplay.textContent = result;
}

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
    if (b === 0) {
        return 'Can\'t divide by 0!';
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return 'Invalid operator!';
    }
}

