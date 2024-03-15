const compilerService = require('../services/compilerService');

// Контроллер для создания новой сессии
exports.createSession = async (req, res) => {
    try {
        const sessionToken = await compilerService.createSession();
        res.status(200).json({ sessionToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Контроллер для подключения к сессии
exports.connectSession = async (req, res) => {
    const { sessionToken } = req.body;
    try {
        await compilerService.connectSession(sessionToken);
        res.status(200).json({ message: 'Connected to session' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Контроллер для обработки запроса на компиляцию кода (остается без изменений)
exports.compileCode = async (req, res) => {
    const { code, language } = req.body;

    try {
        const result = await compilerService.compile(code, language);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
