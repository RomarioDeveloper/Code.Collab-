const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Регистрация
app.post('/register', authController.register);
// Авторизация
app.post('/login', authController.login);
// Получение информации о пользователе
app.get('/user', authMiddleware, authController.getUser);
