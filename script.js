let display = document.getElementById('display');
let memory = 0;
let memoryIndicator = document.getElementById('memoryIndicator');

// Функция для добавления символа на дисплей
function appendToDisplay(value) {
    if (display) {
        display.value += value;
    }
}

// Функция для очистки дисплея
function clearDisplay() {
    if (display) {
        display.value = '';
    }
}

// Функция для удаления последнего символа
function backspace() {
    if (display) {
        display.value = display.value.slice(0, -1);
    }
}

// Основная функция вычисления
// Основная функция вычисления
function calculate() {
    if (!display) return;
    
    try {
        // Заменяем × на * для корректного вычисления
        let expression = display.value.replace(/×/g, '*');
        
        // Проверяем на деление на ноль перед вычислением
        if (expression.includes('/0') || expression.match(/\/\s*0(?!\.)/)) {
            display.value = 'Error';
            return;
        }
        
        // Обрабатываем проценты
        expression = expression.replace(/(\d+)%/g, function(match, number) {
            return '(' + number + '/100)';
        });
        
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Error';
    }
}

// Тригонометрические функции (работают с радианами)
function calculateSin() {
    if (!display) return;
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.sin(value);
}

function calculateCos() {
    if (!display) return;
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.cos(value);
}

// Степени и корни
function calculatePower() {
    if (!display) return;
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.pow(value, 2);
}

function calculateSqrt() {
    if (!display) return;
    let value = parseFloat(display.value);
    if (isNaN(value) || value < 0) {
        display.value = 'Error';
        return;
    }
    display.value = Math.sqrt(value);
}

// Округление
function calculateFloor() {
    if (!display) return;
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.floor(value);
}

function calculateCeil() {
    if (!display) return;
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
    display.value = Math.ceil(value);
}

// Остаток от деления
function calculateModulus() {
    if (!display) return;
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }
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
    if (!display) return;
    let value = parseFloat(display.value);
    if (isNaN(value) || value <= 0) {
        display.value = 'Error';
        return;
    }
    display.value = Math.log10(value);
}

// Константа π
function calculatePi() {
    if (display) {
        display.value = Math.PI;
    }
}

// Функции памяти
function memoryAdd() {
    if (!display) return;
    let currentValue = parseFloat(display.value) || 0;
    memory += currentValue;
    updateMemoryIndicator();
    clearDisplay();
}

function memorySubtract() {
    if (!display) return;
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
    if (display) {
        display.value = memory;
    }
}

function updateMemoryIndicator() {
    if (memoryIndicator) {
        memoryIndicator.textContent = `M: ${memory}`;
    }
}

// Обработка клавиатуры
if (document) {
    document.addEventListener('keydown', function(event) {
        if (!display) return;
        
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
}

// Сделаем функции глобальными для тестов
window.appendToDisplay = appendToDisplay;
window.clearDisplay = clearDisplay;
window.backspace = backspace;
window.calculate = calculate;
window.calculateSin = calculateSin;
window.calculateCos = calculateCos;
window.calculatePower = calculatePower;
window.calculateSqrt = calculateSqrt;
window.calculateFloor = calculateFloor;
window.calculateCeil = calculateCeil;
window.calculateModulus = calculateModulus;
window.calculateLog = calculateLog;
window.calculatePi = calculatePi;
window.memoryAdd = memoryAdd;
window.memorySubtract = memorySubtract;
window.memoryClear = memoryClear;
window.memoryRecall = memoryRecall;
window.updateMemoryIndicator = updateMemoryIndicator;