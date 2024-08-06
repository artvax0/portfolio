import { Calculator } from "./calculator.js"

const calculator = new Calculator();
document.getElementById('digit-1').addEventListener('click', () => {
    calculator.inputNum(1);
    updateDisplay();
});
document.getElementById('digit-2').addEventListener('click', () => {
    calculator.inputNum(2);
    updateDisplay();
});
document.getElementById('digit-3').addEventListener('click', () => {
    calculator.inputNum(3);
    updateDisplay();
});
document.getElementById('digit-4').addEventListener('click', () => {
    calculator.inputNum(4);
    updateDisplay();
});
document.getElementById('digit-5').addEventListener('click', () => {
    calculator.inputNum(5);
    updateDisplay();
});
document.getElementById('digit-6').addEventListener('click', () => {
    calculator.inputNum(6);
    updateDisplay();
});
document.getElementById('digit-7').addEventListener('click', () => {
    calculator.inputNum(7);
    updateDisplay();
});
document.getElementById('digit-8').addEventListener('click', () => {
    calculator.inputNum(8);
    updateDisplay();
});
document.getElementById('digit-9').addEventListener('click', () => {
    calculator.inputNum(9);
    updateDisplay();
});
document.getElementById('digit-0').addEventListener('click', () => {
    calculator.inputNum(0);
    updateDisplay();
});
document.getElementById('clr').addEventListener('click', () => {
    calculator.clear();
    updateDisplay();
});
document.getElementById('add').addEventListener('click', () => {
    calculator.setOperator('+');
    updateDisplay();
});
document.getElementById('subtract').addEventListener('click', () => {
    calculator.setOperator('-');
    updateDisplay();
});
document.getElementById('multiply').addEventListener('click', () => {
    calculator.setOperator('*');
    updateDisplay();
});
document.getElementById('divide').addEventListener('click', () => {
    calculator.setOperator('/');
    updateDisplay();
});
document.getElementById('equals').addEventListener('click', () => {
    calculator.calculate();
    updateDisplay();
});

// keyboard detection
document.addEventListener('keydown',(e) => {
    console.log(e);
    
    switch (e.key) {
        case '0':
            calculator.inputNum(0);
            updateDisplay();
            break;

        case '1':
            calculator.inputNum(1);
            updateDisplay();
            break;
        
        case '2':
            calculator.inputNum(2);
            updateDisplay();
            break;

        case '3':
            calculator.inputNum(3);
            updateDisplay();
            break;
            
        case '4':
            calculator.inputNum(4);
            updateDisplay();
            break;
            
        case '5':
            calculator.inputNum(5);
            updateDisplay();
            break;
            
        case '6':
            calculator.inputNum(6);
            updateDisplay();
            break;
            
        case '7':
            calculator.inputNum(7);
            updateDisplay();
            break;
            
        case '8':
            calculator.inputNum(8);
            updateDisplay();
            break;

        case '9':
            calculator.inputNum(9);
            updateDisplay();
            break;
            
        case 'Backspace':
            calculator.clear();
            updateDisplay();
            break;
            
        case '+':
            calculator.setOperator('+');
            updateDisplay();
            break;

        case '-':
            calculator.setOperator('-');
            updateDisplay();
            break;

        case '*':
            calculator.setOperator('*');
            updateDisplay();
            break;

        case '/':
            calculator.setOperator('/');
            updateDisplay();
            break;

        case 'Enter' || '=':
            calculator.calculate();
            updateDisplay();

        default:
            break;
    }
})

function updateDisplay() {
    document.getElementById('display').innerHTML = calculator.getResult();
}