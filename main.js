const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => button.addEventListener('click', addToExpression));

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => button.addEventListener('click', addToExpression));

const operationDisplay = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');

operationDisplay.textContent = '';

const buttonSelections = [];

function addToExpression(e) {
    const button = e.target;

    if (buttonSelections.length === 0) {  // When user selects the first button
        if (isOperator(button) && (button.textContent === '*' || button.textContent === '/')
            || button.textContent === '.') {
            return;
        } else {
            operationDisplay.textContent += button.textContent;
            buttonSelections.push(button);
            return;
        }

    } else {
        // if (isOperator(buttonSelections[-1]) && isOperator(button)) {

        // }

        operationDisplay.textContent +=
            `${isOperator(button) ? ' ' + button.textContent + ' ' : button.textContent}`;

        buttonSelections.push(button);
    }

    console.log(buttonSelections);
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

