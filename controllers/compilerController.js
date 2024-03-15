const compilerService = require('../services/compilerService.js');

exports.compileCode = async (req, res) => {
    const { code, language } = req.body;
    try {
        const result = await compilerService.compile(code, language);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Compilation error' });
    }
};
