let displayScreen = document.querySelector('.calculator-screen');
let inputString = '';

//Tested, works. 
let numberKeys = document.querySelectorAll('.number-key');
numberKeys.forEach(key => {
    key.addEventListener('click', function() {
        inputString += key.value;
        displayScreen.value = inputString;
    });
});

//Tested, works.
let clearKey = document.querySelector('button[value="all-clear"]');
clearKey.addEventListener('click', function() {
    inputString = '';
    displayScreen.value = inputString;
});