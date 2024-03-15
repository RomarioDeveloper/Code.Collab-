const express = require('express');
const router = express.Router();
const compilerController = require('../controllers/compilerController');

router.post('/compile', compilerController.compileCode);
router.post('/create-session', compilerController.createSession);
router.post('/connect-session', compilerController.connectSession);

module.exports = router;
