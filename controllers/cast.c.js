const castsM = require('../models/cast.m')

class CastController {
    
    async getDetail(req, res, next) {
        try {
            if (req.session.loggedin){
                let cast_data = await castsM.getCastDetail(req.params.id)
                // console.log(cast_data)
                res.render('cast_detail_page', {
                    cast: cast_data[0]
                });
            }else{
                req.session.back="/home";
                res.redirect('/login')
            }
            
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new CastController;