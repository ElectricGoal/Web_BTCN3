const db = require("./database")

const queryAddMovie = `
INSERT INTO "FavMovies" VALUES (
	$1,
    $2
);
`

const queryGetFavMovs = `
SELECT * 
FROM public."FavMovies" F, public."Movies" M
WHERE F."MovID" = M."ID" AND F."f_ID" = $1
`

class FavMovies{
    async getFavMovs(email) {
        const {rows} = await db.query('SELECT * FROM public."Users" WHERE "f_Email" = $1', [email])
        let data = await db.query(queryGetFavMovs, [rows[0].f_ID])
        return data.rows
    }

    async addMovie(email, movID) {
        const {rows} = await db.query('SELECT * FROM public."Users" WHERE "f_Email" = $1', [email])
        await db.query(queryAddMovie, [rows[0].f_ID, movID])
    }

    async deleteMovie(email, movID) {
        const {rows} = await db.query('SELECT * FROM public."Users" WHERE "f_Email" = $1', [email])
        await db.query('DELETE FROM "FavMovies" WHERE "f_ID" = $1 AND "MovID" = $2', [rows[0].f_ID, movID])
    }

    async isInFav(movID){
        const {rows} = await db.query('SELECT * FROM public."FavMovies" WHERE "MovID" = $1', [movID])
        return rows.length != 0 ? true : false
    }
}

module.exports = new FavMovies;