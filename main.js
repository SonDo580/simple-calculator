const expressionRegex = /[0-9.\+\-\*\/]/;
const operatorRegex = /[\+\-\*\/]/;

const functionKeys = [];
for (let i = 1; i <= 12; i++) {
    functionKeys.push(`F${i}`);
}

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

const mouseModeButton = document.querySelector('#mouseMode');
const keyboardModeButton = document.querySelector('#keyboardMode');
mouseModeButton.addEventListener('click', switchMode);
keyboardModeButton.addEventListener('click', switchMode);

const operationDisplay = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');
operationDisplay.textContent = '';
resultDisplay.textContent = 0;

let expression = '';
let result = 0;

const calculatorButtons = document.querySelector('.buttons').querySelectorAll('button');

function switchMode(event) {
    clearAll();
    const modeButton = event.target;

    if (modeButton.id === 'mouseMode') {
        calculatorButtons.forEach(button => button.disabled = false);
        window.removeEventListener('keydown', handleKeyPress);

        mouseModeButton.classList.toggle('active');
        keyboardModeButton.classList.toggle('active');

    } else if (modeButton.id === 'keyboardMode') {
        calculatorButtons.forEach(button => button.disabled = true);
        window.addEventListener('keydown', handleKeyPress);

        mouseModeButton.classList.toggle('active');
        keyboardModeButton.classList.toggle('active');
    }
}

function addToExpression(event) {
    const button = event.target.textContent;
    addKeyToExpression(button);
}

function addKeyToExpression(key) {
    if (expression === '') {  // If this is the first character
        if (key === '*'
            || key === '/'
            || key === '.') {

            return;
        }

        expression += key;
        operationDisplay.textContent = expression;

    } else {
        const lastKey = expression[expression.length - 1];

        if (isOperator(lastKey) && isOperator(key)
            || isOperator(lastKey) && key === '.'
            || lastKey === '.' && isOperator(key)
            || lastKey === '.' && key === '.') {

            return;
        }

        const numbers = expression.split(/[^0-9.]/);
        if (numbers[0] === '') {
            numbers.shift();
        }
        if (numbers[numbers.length - 1] === '') {
            numbers.pop();
        }

        // Don't let user select 2 '.' in a number
        if (key === '.') {
            if (numbers.length === 1 && numbers[0].indexOf('.') !== -1
                || numbers.length === 2 && numbers[1].indexOf('.') !== -1) {

                return;
            }
        }

        if (numbers.length === 2) {    // Evaluate the first pair when user selects the second operator
            if (isOperator(key)) {
                evaluateExpression();
                expression = result;
            }
        }

        expression += key;
        operationDisplay.textContent = expression;
    }
} 

function handleKeyPress(event) {
    const key = event.key;

    if (key === 'Shift') {
        return;
    } else if (key === 'Enter') {
        return;
    } else if (functionKeys.includes(key)) {
        return;
    } else if (expressionRegex.test(key)) {
        addKeyToExpression(key);
    } else if (key === 'Backspace') {
        removeLastCharacter();
    } else if (key === 'Delete') {
        clearAll();
    } else if (key === '=') {
        evaluateExpression();
    }
}

function removeLastCharacter() {
    expression = expression.slice(0, expression.length - 1);
    operationDisplay.textContent = expression;
}

function clearAll() {
    operationDisplay.textContent = '';
    resultDisplay.textContent = 0;
}

function evaluateExpression() {
    const lastKey = expression[expression.length - 1];

    if (isOperatorKey(lastKey) || lastKey === '.') {
        return;
    }

    const operators = expression.match(/[^0-9.]/g);
    if (expression.indexOf(operators[0]) === 0) {   // In case the first symbol is '+' or '-'
        operators.shift();
    }
    
    if (operators === null) {       // User press '=' when there's only 1 number
        result = +expression;
        resultDisplay.textContent = result; 
        return;
    }

    const operator = operators[0];      
    const opertorIndex = expression.lastIndexOf(operator);      // The first symbol maybe '+' or '-', so we search backwards

    const firstOperand = +expression.slice(0, opertorIndex); 
    const secondOperand = +expression.slice(opertorIndex + 1);

    result = operate(operator, firstOperand, secondOperand);
    if (typeof result === 'number') {   // If there's an error, result will be a string
        result = roundNumber(result);
    }
    resultDisplay.textContent = result; 
}

function isOperator(key) {
    return operatorRegex.test(key);
}

function roundNumber(number) {      
    let fractionalPart = number.toString().split('.')[1];

    if (fractionalPart === undefined) {     // If 'number' is an integer
        return number;
    }

    if (fractionalPart.length > 2) {    
        return +number.toFixed(2);
    }

    return number;     
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