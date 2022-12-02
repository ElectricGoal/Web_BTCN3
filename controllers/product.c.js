const product = require('../models/product.m')

class ProductController {
    async getDetail(req, res, next) {
        // res.render('home_page')
        try {
            if (req.session.loggedin){
                let product_detail = await product.getProduct(req.params.id)
                // console.log(typeof product_detail[0].FullDes)
                res.render('product_detail_page', {
                    product: product_detail[0],
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

module.exports = new ProductController;