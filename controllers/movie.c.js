const movies = require('../models/movie.m')
const favMovies = require('../models/favMovie.m');

class MovieController {
    
    async getDetail(req, res, next) {
        try {
            if (req.session.loggedin){
                let movie_detail = await movies.getMovieDetail(req.params.id)
                // console.log(typeof product_detail[0].FullDes)
                let inFav = await favMovies.isInFav(req.params.id)
                res.render('movie_detail_page', {
                    movie: movie_detail[0],
                    id: movie_detail[0].ID,
                    isAdded: inFav,
                });
            }else{
                req.session.back="/home";
                res.redirect('/login')
            }
            
        } catch (error) {
            next(error);
        }
    }

    async addMovieToFav(req, res, next) {
        try {
            if (req.session.loggedin){
                await favMovies.addMovie(req.session.email, req.params.id)
                // let url = '/home/movie/' + req.params.id
                // res.redirect(url)
                let movie_detail = await movies.getMovieDetail(req.params.id)
                // console.log(typeof product_detail[0].FullDes)
                res.render('movie_detail_page', {
                    movie: movie_detail[0],
                    id: movie_detail[0].ID,
                    isAdded: true,

                });
            }else{
                req.session.back="/home";
                res.redirect('/login')
            }
            
        } catch (error) {
            next(error);
        }
    }

    async deleteMovieFromFav(req, res, next) {
        try {
            if (req.session.loggedin){
                await favMovies.deleteMovie(req.session.email, req.params.id)
                res.redirect('/home/favorite')
            }else{
                req.session.back="/home";
                res.redirect('/login')
            }
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MovieController;