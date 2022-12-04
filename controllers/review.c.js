const reviewM = require('../models/review.m')

class ReviewController {

    async getReviews(req, res, next) {
        try {
            if (req.session.loggedin) {
                let reviews_data = await reviewM.getReviews(req.params.id)
                return res.render('reviews_page', {
                    reviews: reviews_data,
                })
            } else {
                req.session.back = "/home";
                res.redirect('/login')
            }

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new ReviewController;