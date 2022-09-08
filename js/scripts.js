const numberButtons = document.querySelectorAll('[data-number]'),
    operationButtons = document.querySelectorAll('[data-operaion]'),
    equalsButton = document.querySelector('[data-equals]'),
    deleteButton = document.querySelector('[data-del]'),
    allClearButton = document.querySelector('[data-clear]'),
    previousElement = document.querySelector('[data-previous]'),
    currentElement = document.querySelector('[data-current]');


class Calculator {

    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.clear();
    }

    clear(){
        this.currentElementText = '';
        this.previousElementText = '';
        this.operation = undefined;
    }

    delete(){
        this.currentElementText = this.currentElementText.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentElementText.includes('.')) return;
        this.currentElementText = this.currentElementText.toString() + number.toString();

    }

    chooseOperation(operation){
        if (this.currentElementText === '') return;
        if (this.previousElementText !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousElementText = this.currentElementText;
        this.currentElementText = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousElementText),
            current = parseFloat(this.currentElementText);
        if( isNaN(prev) || isNaN(current))return
        switch (this.operation){
            case '+':
                computation = prev + current;
                break
            case '*':
                computation = prev * current;
                break
            case '/':
                computation = prev / current;
                break
            case '-':
                computation = prev - current;
                break
            default:
                return
        }
        this.currentElementText = computation;
        this.operation = undefined;
        this.previousElementText = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        }else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentElement.innerText = this.getDisplayNumber(this.currentElementText);
        if(this.operation !== undefined){
            this.previousElement.innerText = `${this.getDisplayNumber(this.previousElementText)} ${this.operation}`;
        }else{
            this.previousElement.innerText= '';
        }
    }
}


const calculator = new Calculator(previousElement, currentElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})