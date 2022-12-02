const express = require('express');
const router = express.Router();

const pageController = require('../controllers/page.c');
const productController = require('../controllers/product.c');

router.use('/home/product/:id', productController.getDetail);
router.use('/home/search', pageController.search);
router.get('/login', pageController.login);
router.post('/login', pageController.checkLogin);
router.get('/signup', pageController.signup);
router.post('/signup', pageController.saveUser);
router.use('/home', pageController.home);
router.get('/logout', pageController.logout);


module.exports = router