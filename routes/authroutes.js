const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller.js');
const authMiddleware = require('../middleware/authMiddleware.js'); 


router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/protected', authMiddleware, authController.protectedRoute);

module.exports = router;
