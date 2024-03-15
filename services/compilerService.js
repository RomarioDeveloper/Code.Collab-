// Здесь предполагается использование специфичных компиляторов для различных языков
// Например, для Node.js можно использовать пакет child_process для запуска компиляции/запуска кода на JavaScript.

const { exec } = require('child_process');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const WebSocket = require('ws');

const sessions = new Map();


// Функция для компиляции/запуска кода на языке JavaScript (Node.js)
exports.compile = async (code, language) => {
    // Проверка выбранного языка (в данном случае, предполагается использование только JavaScript)
    if (language !== 'javascript') {
        throw new Error('Unsupported language');
    }

    // Создание временного файла для кода
    const codePath = '/tmp/code.js'; // Путь к временному файлу на сервере
    const fs = require('fs');
    fs.writeFileSync(codePath, code);

    // Компиляция/запуск кода через Node.js
    return new Promise((resolve, reject) => {
        exec(`node ${codePath}`, (error, stdout, stderr) => {
            // Удаление временного файла после компиляции/запуска
            fs.unlinkSync(codePath);

            if (error) {
                reject(stderr); // Ошибка компиляции/запуска
            } else {
                resolve(stdout); // Результат выполнения кода
            }
        });
    });
};

// Функция для выполнения кода на Python
const executePythonCode = async (code) => {
    const codePath = '/tmp/code.py'; // Путь к временному файлу на сервере
    fs.writeFileSync(codePath, code);

    return new Promise((resolve, reject) => {
        exec(`python3 ${codePath}`, (error, stdout, stderr) => {
            fs.unlinkSync(codePath); // Удаление временного файла

            if (error) {
                reject(stderr); // Ошибка компиляции/запуска
            } else {
                resolve(stdout); // Результат выполнения кода
            }
        });
    });
};


// Функция для создания новой сессии
exports.createSession = async () => {
    const sessionToken = uuidv4();
    sessions.set(sessionToken, new WebSocket.Server({ noServer: true }));
    return sessionToken;
};

// Функция для подключения к сессии по веб-токену
exports.connectSession = async (sessionToken) => {
    const sessionServer = sessions.get(sessionToken);
    if (!sessionServer) {
        throw new Error('Session not found');
    }

    // Создание WebSocket соединения для клиента
    const wss = new WebSocket.Server({ noServer: true });
    sessionServer.on('connection', (ws) => {
        wss.on('message', (message) => {
            // Пересылка сообщения всем подключенным клиентам в сессии
            sessionServer.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('message', (message) => {
            // Пересылка сообщения всем подключенным клиентам в сессии
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });
    });
};

// Функция для компиляции/запуска кода (остается без изменений)
exports.compile = async (code, language) => {
    // Логика компиляции/запуска кода
};
