let display = document.getElementById('display');
let memory = 0;
let memoryIndicator = document.getElementById('memoryIndicator');

// Функция для добавления символа на дисплей
function appendToDisplay(value) {
    display.value += value;
}

// Функция для очистки дисплея
function clearDisplay() {
    display.value = '';
}

// Функция для удаления последнего символа
function backspace() {
    display.value = display.value.slice(0, -1);
}

// Основная функция вычисления
function calculate() {
    try {
        // Заменяем × на * для корректного вычисления
        let expression = display.value.replace(/×/g, '*');
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Error';
    }
}

// Тригонометрические функции (работают с радианами)
function calculateSin() {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.sin(value);
}

function calculateCos() {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.cos(value);
}

// Степени и корни
function calculatePower() {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.pow(value, 2);
}

function calculateSqrt() {
    let value = parseFloat(display.value);
    if (isNaN(value) || value < 0) {
        display.value = 'Error';
        return;
    }
    display.value = Math.sqrt(value);
}

// Округление
function calculateFloor() {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.floor(value);
}

function calculateCeil() {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.ceil(value);
}

// Остаток от деления
function calculateModulus() {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    // Просим пользователя ввести делитель
    let divisor = prompt("Введите делитель:");
    if (divisor === null) return;
    
    let divisorNum = parseFloat(divisor);
    if (isNaN(divisorNum) || divisorNum === 0) {
        display.value = 'Error';
        return;
    }
    display.value = value % divisorNum;
}

// Логарифм
function calculateLog() {
    let value = parseFloat(display.value);
    if (isNaN(value) || value <= 0) {
        display.value = 'Error';
        return;
    }
    display.value = Math.log10(value);
}

// Константа π
function calculatePi() {
    display.value = Math.PI;
}

// Функции памяти
function memoryAdd() {
    let currentValue = parseFloat(display.value) || 0;
    memory += currentValue;
    updateMemoryIndicator();
    clearDisplay();
}

function memorySubtract() {
    let currentValue = parseFloat(display.value) || 0;
    memory -= currentValue;
    updateMemoryIndicator();
    clearDisplay();
}

function memoryClear() {
    memory = 0;
    updateMemoryIndicator();
}

function memoryRecall() {
    display.value = memory;
}

function updateMemoryIndicator() {
    memoryIndicator.textContent = `M: ${memory}`;
}

// Обработка клавиатуры
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        backspace();
    }
});