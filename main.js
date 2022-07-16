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

// const evaluateButton = document.querySelector('#evaluate');
// evaluateButton.addEventListener('click', evaluateExpression);

const operationDisplay = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');
operationDisplay.textContent = '';
resultDisplay.textContent = '';

let buttonSelections = [];
let expression = '';

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

// function evaluateExpression() {
//     const lastButton = buttonSelections[buttonSelections.length - 1];
//     if (isOperator(lastButton) || lastButton.textContent === '.') {
//         return;
//     }

//     let expression = getExpression();
//     const operands = expression.split(/[^0-9.]/);
//     const operator = expression[expression.search(/[^0-9.]/)];

//     resultDisplay.textContent = operate(operator, +operands[0], +operands[1]);
// }

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

