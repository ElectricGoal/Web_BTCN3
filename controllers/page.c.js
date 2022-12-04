const auth = require('../models/auth.m');
const favMovie = require('../models/favMovie.m');
const movies = require('../models/movie.m');

class PageController {
    async home(req, res, next) {
        // res.render('home_page')
        try {
            if (req.session.loggedin){
                let movies_data = await movies.getAll()
                res.render('home_page', {
                    movies: movies_data
                });
            }else{
                req.session.back="/home";
                res.redirect('/login')
            }
            
        } catch (error) {
            next(error);
        }
    }

    async search(req, res, next) {
        // res.render('home_page')
        try {
            if (req.session.loggedin){
                let movies_data = await movies.search(req.body.search)
                res.render('home_page', {
                    movies: movies_data
                });
            }else{
                req.session.back="/home";
                res.redirect('/login')
            }
            
        } catch (error) {
            next(error);
        }
    }

    async favorite(req, res, next) {
        // res.render('home_page')
        try {
            if (req.session.loggedin){
                let fav_movies_data = await favMovie.getFavMovs(req.session.email)
                res.render('favorite_page', {
                    movies: fav_movies_data
                });
            }else{
                req.session.back="/home";
                res.redirect('/login')
            }
            
        } catch (error) {
            next(error);
        }
    }

    login(req, res, next) {
        try {
            if (req.session.loggedin){
                res.redirect('/home');
            }else{
                res.render('login_page');
            }
        } catch (error) {
            next(error);
        }
    }

    signup(req, res, next) {
        try {
            if (req.session.loggedin){
                res.redirect('/home');
            }else{
                res.render('signup_page');
            }
        } catch (error) {
            next(error);
        }
    }

    async saveUser(req, res, next) {
        try {
            const username = req.body.username
            const fullname = req.body.fullname
            const email = req.body.email
            const password = req.body.password

            await auth.signup(username, fullname, email, password)
            res.redirect('/login');
        } catch (error) {
            next(error);
            res.redirect('/signup');
        }
    }

    async checkLogin(req, res, next) {
        try {
            const email = req.body.email
            const password = req.body.password

            let ok = await auth.login(email, password)

            // console.log(ok)

            if (ok) {
                var sess = req.session;  //initialize session variable
                sess.loggedin = true;
                sess.email = email;
                if (sess.back){ 
                    res.redirect(sess.back);
                }
                else {
                    res.redirect('/home');
                }
                
            } else {
                res.render('login_page', {
                    isValid: true
                });
            }

        } catch (error) {
            next(error);
        }
    }

    logout(req, res, next) {
        try {
            req.session.destroy();
            res.redirect("/login");
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PageController;