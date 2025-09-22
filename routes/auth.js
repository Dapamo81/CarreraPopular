const express = require('express');
const router = express.Router();
const resgisterController = require('../controllers/resgisterController');
const loginController = require('../controllers/loginController');
const loadAreaPrivada = require('../controllers/loadAreaPrivada');
const loadAreaAdmin = require('../controllers/loadAreaAdmin');
const editController = require('../controllers/editController');
const deleteController = require('../controllers/deleteController');
const loadPodio = require('../controllers/loadPodio');

router.get('/register', resgisterController.getRegister );
router.post('/register', resgisterController.postRegister);

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

router.get('/login-admin', loginController.getLoginAdmin);
router.post('/login-admin', loginController.postLoginAdmin);

router.get('/logout', loginController.logout);

router.get('/area-privada',loadAreaPrivada.getAreaPrivada);
router.post('/area-privada',loadAreaPrivada.postAreaPrivada);

router.get('/area-admin', loadAreaAdmin.loadCorredores);

router.get('/edit/:email', editController.getLoadCorredor);
router.post('/edit', editController.postUploadCorredor);

router.get('/delete/:id', deleteController.getDeleteCorredor);

router.get('/podio',loadPodio.getLoadPodio)


module.exports = router;