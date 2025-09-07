const express = require('express');
const router = express.Router();
const resgisterController = require('../controllers/resgisterController');
const loginController = require('../controllers/loginController');
const loadAreaPrivada = require('../controllers/loadAreaPrivada');
const loadAreaAdmin = require('../controllers/loadAreaAdmin');

router.get('/register', resgisterController.getRegister);
router.post('/register', resgisterController.postRegister);

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

router.get('/logout', loginController.logout);

router.get('/area-privada',loadAreaPrivada.getAreaPrivada);
router.post('/area-privada',loadAreaPrivada.postAreaPrivada);

router.get('/area-admin', loadAreaAdmin.loadCorredores);


module.exports = router;