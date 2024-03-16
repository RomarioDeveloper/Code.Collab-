const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Регистрация
router.post('/register', authController.register);
// Авторизация
router.post('/login', authController.login);
// Получение информации о пользователе
router.get('/user', authMiddleware, authController.getUser);
