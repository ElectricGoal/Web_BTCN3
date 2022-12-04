const express = require('express');
const router = express.Router();

const pageController = require('../controllers/page.c');
const movieController = require('../controllers/movie.c');
const castController = require('../controllers/cast.c');
const reviewController = require('../controllers/review.c');

router.post('/home/favorite/delete/:id', movieController.deleteMovieFromFav);
router.use('/home/movie/:id/review', reviewController.getReviews);
router.get('/home/movie/:id', movieController.getDetail);
router.post('/home/movie/:id', movieController.addMovieToFav);
router.get('/home/actor/:id', castController.getDetail);
router.use('/home/search/:page', pageController.search);
router.use('/home/favorite', pageController.favorite);
router.get('/login', pageController.login);
router.post('/login', pageController.checkLogin);
router.get('/signup', pageController.signup);
router.post('/signup', pageController.saveUser);
router.use('/home', pageController.home);
router.get('/logout', pageController.logout);
router.use('/', pageController.home);


module.exports = router