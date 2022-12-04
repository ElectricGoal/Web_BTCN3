const movies = require('../models/movie.m')
const favMovies = require('../models/favMovie.m');
const castsM = require('../models/cast.m')

class MovieController {
    
    async getDetail(req, res, next) {
        try {
            if (req.session.loggedin){
                let movie_detail = await movies.getMovieDetail(req.params.id)
                
                let inFav = await favMovies.isInFav(req.params.id)
                let casts_data = await castsM.getCasts(req.params.id)
                // console.log(casts_data)
                res.render('movie_detail_page', {
                    movie: movie_detail[0],
                    id: movie_detail[0].ID,
                    isAdded: inFav,
                    casts: casts_data
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
                let movie_detail = await movies.getMovieDetail(req.params.id)
                let casts_data = await castsM.getCasts(req.params.id)
                
                res.render('movie_detail_page', {
                    movie: movie_detail[0],
                    id: movie_detail[0].ID,
                    isAdded: true,
                    casts: casts_data
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