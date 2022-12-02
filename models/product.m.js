const db = require("./database")

const querySearch = `SELECT P.*
FROM public."Products" P, public."Categories" C
WHERE C."CatName" = $1 and P."CatID" = C."CatID"`

const queryGetAll = 'SELECT * FROM public."Products"'

const queryGetProduct = 'SELECT * FROM public."Products" WHERE "ProID" = $1'

class Product{
    async search(category){
        const {rows} = await db.query(querySearch, [category])
        return rows
    }

    async getAll(){
        const {rows} = await db.query(queryGetAll)
        return rows
    }

    async getProduct(id){
        const {rows} = await db.query(queryGetProduct, [id])
        return rows
    }
}

module.exports = new Product;