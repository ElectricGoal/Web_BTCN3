const express = require('express');
const router = express.Router();

const pageController = require('../controllers/page.c');
const movieController = require('../controllers/movie.c');

router.post('/home/favorite/delete/:id', movieController.deleteMovieFromFav);
router.get('/home/movie/:id', movieController.getDetail);
router.post('/home/movie/:id', movieController.addMovieToFav);
router.use('/home/search', pageController.search);
router.use('/home/favorite', pageController.favorite);
router.get('/login', pageController.login);
router.post('/login', pageController.checkLogin);
router.get('/signup', pageController.signup);
router.post('/signup', pageController.saveUser);
router.use('/home', pageController.home);
router.get('/logout', pageController.logout);


module.exports = router