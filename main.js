const expressionRegex = /[0-9.\+\-\*\/]/;
const operatorRegex = /[\+\-\*\/]/;
const functionKeyRegex = /F[1-12]/;

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

let buttonSelections = [];
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
            || lastButton.textContent === '.' && isOperator(button)
            || lastButton.textContent === '.' && button.textContent === '.') {

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
        if (button.textContent === '.') {
            if (numbers.length === 1 && numbers[0].indexOf('.') !== -1
                || numbers.length === 2 && numbers[1].indexOf('.') !== -1) {

                return;
            }
        }

        if (numbers.length === 2) {    // Evaluate the first pair when user selects the second operator
            if (isOperator(button)) {
                evaluateExpression();
                expression = result;
            }
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
    resultDisplay.textContent = 0;
}

function evaluateExpression() {
    const lastButton = buttonSelections[buttonSelections.length - 1];
    if (isOperator(lastButton) || lastButton.textContent === '.') {
        return;
    }

    const operators = expression.match(/[^0-9.]/g);
    if (expression.indexOf(operators[0]) === 0) {   // In case the first symbol is '+' or '-'
        operators.shift();
    }
    
    if (operators === null) {       // User start evaluating (click '=') when there's only 1 number
        result = +expression;
        resultDisplay.textContent = result; 
        return;
    }

    const operator = operators[0];      
    const opertorIndex = expression.lastIndexOf(operator);      // The first symbol maybe '+' or '-', so we search backwards

    const firstOperand = +expression.slice(0, opertorIndex);
    const secondOperand = +expression.slice(opertorIndex + 1);

    result = operate(operator, firstOperand, secondOperand);
    if (result.toString().length > 2) {
        result = result.toFixed(2);
    }
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

function handleKeyPress(event) {
    const key = event.key;

    if (key === 'Shift' || functionKeyRegex.test(key)) {
        return;
    }

    if (expressionRegex.test(key)) {
        addKeyToExpression(key);
    }
}

function addKeyToExpression(key) {
    console.log(key);

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

        if (isOperatorKey(lastKey) && isOperatorKey(key)
            || isOperatorKey(lastKey) && key === '.'
            || lastKey === '.' && isOperatorKey(key)
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
            if (isOperatorKey(key)) {
                // evaluateExpression();
                result = 'test';
                expression = result;
            }
        }

        expression += key;
        operationDisplay.textContent = expression;
    }
} 

function isOperatorKey(key) {
    return operatorRegex.test(key);
}