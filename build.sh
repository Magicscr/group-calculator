#!/bin/bash

echo "=== ЗАПУСК СБОРКИ КАЛЬКУЛЯТОРА ==="

# 1. Загрузка с GitHub
echo "1. Загружаю код с GitHub..."
git pull origin main

# 2. Проверка файлов
echo "2. Проверяю файлы проекта..."
if [ -f "index.html" ]; then
    echo "✅ index.html найден"
else
    echo "❌ index.html не найден"
    exit 1
fi

if [ -f "style.css" ]; then
    echo "✅ style.css найден"
else
    echo "❌ style.css не найден"
    exit 1
fi

if [ -f "script.js" ]; then
    echo "✅ script.js найден"
else
    echo "❌ script.js не найден"
    exit 1
fi

# 3. Создаем папку для сборки
echo "3. Создаю папку для сборки..."
mkdir -p build

# 4. Копируем файлы
echo "4. Копирую файлы..."
cp index.html style.css script.js build/

# 5. Создаем README
echo "5. Создаю инструкцию..."
cat > build/README.txt << EOF
КАЛЬКУЛЯТОР - ИНСТРУКЦИЯ

Чтобы запустить калькулятор:
1. Откройте файл index.html в браузере
2. Все готово!

Функции:
- Сложение, вычитание, умножение, деление
- Sin, Cos, квадратный корень
- Память (M+, M-, MC, MR)
- И многое другое!

Для тестов откройте test.html
EOF

echo "=== СБОРКА ЗАВЕРШЕНА ==="
echo "Файлы находятся в папке: build/"
echo "Чтобы запустить: открой build/index.html в браузере"