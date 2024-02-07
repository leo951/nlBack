const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');
const userValidation = require('../middlewares/validators/user.validator');

router.post('/user/login', userValidation, user.login);

router.put('/user/update', verifyToken, user.updateUser);

router.get('/user/delete/:id', verifyToken, user.deleteUser);

router.get('/user', verifyToken, user.getUser)

module.exports = router;

