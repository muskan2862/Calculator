let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

const currentDisplay = document.getElementById('current');
const historyDisplay = document.getElementById('history');

function updateDisplay() {
    currentDisplay.textContent = currentInput;
}

function updateHistory() {
    historyDisplay.textContent = previousInput + (operation ? ' ' + getOperatorSymbol(operation) : '');
}

function getOperatorSymbol(op) {
    switch(op) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '÷';
        case '%': return '%';
        default: return op;
    }
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number.toString();
        shouldResetDisplay = false;
    } else {
        currentInput += number.toString();
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation && !shouldResetDisplay) {
        calculate();
    }
    
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
    
    updateHistory();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
    updateHistory();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    // Handle floating point precision issues
    result = Math.round(result * 1000000000) / 1000000000;
    
    historyDisplay.textContent = `${previousInput} ${getOperatorSymbol(operation)} ${currentInput}`;
    currentInput = result.toString();
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// Initialize
updateDisplay();