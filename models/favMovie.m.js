const db = require("./database")

const queryAddMovie = `
INSERT INTO "FavMovies" VALUES (
	$1,
    $2
);
`

class FavMovies{
    async addMovie(email, movID) {
        // console.log(req.session.email)
        const {rows} = await db.query('SELECT * FROM public."Users" WHERE "f_Email" = $1', [email])
        await db.query(queryAddMovie, [rows[0].f_ID, movID])
    }
}

module.exports = new FavMovies;