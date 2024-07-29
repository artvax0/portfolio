export class Calculator {
    currentValue;
    previousValue;
    operator;

    constructor(currentValue = 0, previousvalue = 0, operator = null) {
        this.currentValue = currentValue;
        this.previousValue = previousvalue;
        this.operator = operator;
    }

    inputNum(num) {
        // concatenate numbers for the display according to the order pressed (53 would be 5 - which turns into 5 and then gets 3 added when 3 is pressed after 5, and so on...)
        this.currentValue = this.currentValue * 10 + num;
    }

    setOperator(operator) {
        if (operator != null) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.currentValue = 0;
        this.operator = operator;
    }

    calculate() {
        if (this.operator == null) {
            return;
        }
        switch (this.operator) {
            case '+':
                this.currentValue += this.previousValue;
                break;
            
            case '-':
                this.currentValue -= this.previousValue;
                break;

            case '*':
                this.currentValue *= this.previousValue;
                break;

            case '/':
                if (this.currentValue == 0) {
                    console.error('Cannot divide by zero');
                    this.currentValue = 0;
                } else {
                    this.currentValue /= this.previousValue;
                }
                
            default:
                console.error('Unknown operation');
                break;
        }
        this.operator = null;
        this.previousValue = 0;
    }

    clear() {
        this.operator = null;
        this.previousValue = 0;
        this.currentValue = 0;
    }

    getResult() {
        return this.currentValue;
    }
}