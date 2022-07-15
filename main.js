const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => button.addEventListener('click', addToExpression));

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => button.addEventListener('click', addToExpression));

const operationDisplay = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');

operationDisplay.textContent = '';

const expressionElements = [];

function addToExpression(e) {
    const button = e.target;

    if (expressionElements.length === 0) {  // When user selects the first button
        if (isOperator(button) && (button.textContent === '+' || button.textContent === '-')) {
            operationDisplay.textContent += button.textContent;
        } else if (isOperator(button) || button.textContent === '.') {    // Can't select '*', '/', and '.' first
            return;
        }
    }

    operationDisplay.textContent += 
    `${isOperator(button) ? ' ' + button.textContent + ' ' : button.textContent}`;
    
    
}

function isOperator(element) {
    return element.classList.contains('operator');
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

