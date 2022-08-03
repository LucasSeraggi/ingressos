const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controllers');

//Registrar novo usuário
router.post('/register', userController.registerNewUser);

//Login de usuário
router.post('/login', userController.loginUser);

//Dados do usuário
router.get('/profile', auth, userController.userProfile);

module.exports = router;