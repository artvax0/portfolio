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

function updateDisplay() {
    document.getElementById('display').innerHTML = calculator.getResult();
}