let displayScreen = document.querySelector('.calculator-screen');
let inputString = '';
let result = null;
let currentOperator = '';
let inputArray = []; 


const operate = function(operator, num1, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 == 0) {
                return 'Error';
            }
            return num1 / num2;
        default:
            return 'Error';
    }
}
 
let numberKeys = document.querySelectorAll('.number');
numberKeys.forEach(key => {
    key.addEventListener('click', function() {
        if (inputArray[inputArray.length - 1] == "equal") {
            inputString = '';
            result = null;
            currentOperator = '';
            inputArray = [];
        }
        inputString += key.value;
        displayScreen.value = inputString;
        inputArray.push("number");
    });
});

let decimalKey = document.querySelector('.decimal');
decimalKey.addEventListener('click', function() {
    if (inputArray[inputArray.length - 1] == "number" && !inputString.includes('.')) {
        inputString += '.';
        displayScreen.value = inputString;
    }
});

let operatorKeys = document.querySelectorAll('button[value="+"], button[value="*"], button[value="/"]');
operatorKeys.forEach(key => {
    key.addEventListener('click', function() {
        if (inputArray[inputArray.length - 1] == 'equal') {
            currentOperator = key.value;
            inputString = '';
            inputArray.push("operator");
            displayScreen.value = result;
        }
        else if (inputArray[inputArray.length - 1] != "number") {
            return;
        }
        else {
            let inputNum = parseFloat(inputString);
            result == null ? result = inputNum : result = operate(currentOperator, result, inputNum);
            currentOperator = key.value;
            inputString = '';
            inputArray.push("operator");
            displayScreen.value = result;
        }
    });
});

let minusKey = document.querySelector('button[value="-"]');
minusKey.addEventListener('click', function() {
    if (inputString == '') {
        inputString += '-';
        inputArray.push("negative");
        displayScreen.value = inputString;
    }
    else if (inputArray[inputArray.length - 1] == 'equal') {
        currentOperator = "-";
        inputString = '';
        inputArray.push("operator");
        displayScreen.value = result;
    }
    else if (inputArray[inputArray.length - 1] != "number") {
        return;
    }
    else {
        let inputNum = parseFloat(inputString);
        result == null ? result = inputNum : result = operate(currentOperator, result, inputNum);
        currentOperator = '-';
        inputString = '';
        inputArray.push("operator");
        displayScreen.value = result;
    }
});

let equalKey = document.querySelector('.equal-sign');
equalKey.addEventListener('click', function() {
    if (inputArray[inputArray.length - 1] != "number") {
        return;
    }
    else if (currentOperator == '') {
        return;
    }
    else {
        let inputNum = parseFloat(inputString);
        result = operate(currentOperator, result, inputNum);
        currentOperator = '';
        inputArray.push("equal");
        displayScreen.value = result;
    }
});

let clearKey = document.querySelector('button[value="all-clear"]');
clearKey.addEventListener('click', function() {
    inputString = '';
    result = null;
    currentOperator = '';
    inputArray = [];
    displayScreen.value = '';
});

let delKey = document.querySelector('button[value="del"]');
delKey.addEventListener('click', function() {
    if (inputArray[inputArray.length - 1] == "equal" ||
        inputArray[inputArray.length - 1] == "operator") {
        return;
    }
    else {
        inputString = inputString.slice(0, -1);
        inputArray.pop();
        displayScreen.value = inputString;
    }
});


//Keyboard functionality
document.addEventListener('keydown', function(event) {
    let key = event.key;

    if (!isNaN(key)) {
        document.querySelector(`button[value="${key}"]`).dispatchEvent(new Event('click'));
    }
    else if (key === '.') {
        document.querySelector('.decimal').dispatchEvent(new Event('click'));
    }
    else if (['+', '-', '*', '/'].includes(key)) {
        document.querySelector(`button[value="${key}"]`).dispatchEvent(new Event('click'));
    }
    else if (key === 'Enter') {
        document.querySelector('.equal-sign').dispatchEvent(new Event('click'));
    }
    else if (key === 'Backspace') {
        document.querySelector('button[value="del"]').dispatchEvent(new Event('click'));
    }
    else if (key === 'Escape') {
        document.querySelector('button[value="all-clear"]').dispatchEvent(new Event('click'));
    }
});