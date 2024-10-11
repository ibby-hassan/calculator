let displayScreen = document.querySelector('.calculator-screen');
let inputString = '';
let inputArray = [];

//Tested, works. 
let numberKeys = document.querySelectorAll('.number');
numberKeys.forEach(key => {
    key.addEventListener('click', function() {
        inputString += key.value;
        displayScreen.value = inputString;
    });
});

//Tested, works.
let operatorKeys = document.querySelectorAll('.operator');
operatorKeys.forEach(key => {
    key.addEventListener('click', function() {
        if (inputString == '') {
            return;
        }
        inputArray.push(inputString);
        inputArray.push(key.value);
        inputString = '';
        displayScreen.value = inputString;
    });
});

//Tested, works.
let allClearKey = document.querySelector('button[value="all-clear"]');
allClearKey.addEventListener('click', function() {
    inputString = '';
    inputArray = [];
    displayScreen.value = inputString;
});

//Tested, works.
let clearKey = document.querySelector('button[value="clear"]');
clearKey.addEventListener('click', function() {
    inputString = '';
    displayScreen.value = inputString;
});

let equalsKey = document.querySelector('.equal-sign');
equalsKey.addEventListener('click', function() {
    if (inputString == '') {
        return;
    }
    inputArray.push(inputString);
    let equation = inputArray.join('');
    let result = eval(equation);
    displayScreen.value = String(result);
    inputArray = [];
    inputString = '';
});