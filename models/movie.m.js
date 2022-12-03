const db = require("./database")
const fs = require('fs');

const pathMoviesDb = './db/movies.json';
const pathCastsDb = './db/casts.json';

const querySearch = `
SELECT *
FROM public."Movies" M
WHERE M."Title" LIKE $1
`

const queryGetAll = `
SELECT * FROM public."Movies"
ORDER BY "Rating" DESC
`

const queryGetDetail = 'SELECT * FROM public."Movies" WHERE "ID" = $1'

const queryImportMovie = `
INSERT INTO "Movies" VALUES (
	$1,
	$2,
	$3,
	$4,
	$5,
	$6,
	$7,
	$8,
	$9
);
`

const queryImportCast = `
INSERT INTO "Casts" VALUES (
	$1,
	$2,
	$3,
	$4,
	$5,
	$6,
	$7
);
`

const queryImportReview = `
INSERT INTO "Reviews" ("Author", "AuthorRating", "HelpfulnessScore", "VoteUp", "VoteDown", "LanguageCode", "ReviewText", "ReviewTitle", "SubmissionDate", "MovID") VALUES (
	$1,
	$2,
	$3,
	$4,
	$5,
	$6,
	$7,
	$8,
	$9,
	$10
)
`

const queryImportRole = `
INSERT INTO "Roles" ("CharacterName", "MovID", "CastID") VALUES (
	$1,
    $2,
    $3
);
`

class Movie {
    async search(title) {
        const { rows } = await db.query(querySearch, ['%' + title + '%'])
        return rows
    }

    async getAll() {
        const { rows } = await db.query(queryGetAll)
        return rows
    }

    async getMovieDetail(id) {
        const { rows } = await db.query(queryGetDetail, [id])
        return rows
    }

    async importMovieFromJson() {
        return new Promise((resolve, reject) => {
            fs.readFile(pathMoviesDb, async(err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // resolve(JSON.parse(data));
                    let movies = JSON.parse(data)
                    for (let i = 0; i < movies.length; i++) {
                        const { rows } = await db.query('SELECT * FROM public."Movies" WHERE "ID" = $1', [movies[i].id])
                        if (rows != ""){
                            // console.log(rows)
                            continue
                        }

                        await db.query(queryImportMovie, [
                            movies[i].id,
                            movies[i].img == null ? "none" : movies[i].img,
                            movies[i].title == null ? "none" : movies[i].title,
                            movies[i].year == null ? 0 : movies[i].year,
                            movies[i].topRank == null ? 0 : movies[i].topRank,
                            movies[i].rating == null ? 0 : movies[i].rating,
                            movies[i].ratingCount == null ? 0 : movies[i].ratingCount,
                            movies[i].genres == null ? [] : movies[i].genres,
                            movies[i].synopses == null ? "none" : movies[i].synopses.text,
                        ])

                        let reviews = movies[i].reviews
                        for (let j = 0; j < reviews.length; j++){
                            await db.query(queryImportReview, [
                                reviews[j].author == null ? "none" : reviews[j].author,
                                reviews[j].authorRating == null ? 0 : reviews[j].authorRating,
                                reviews[j].helpfulnessScore == null ? 0 : reviews[j].helpfulnessScore,
                                reviews[j].interestingVotes == null ? 0 : reviews[j].interestingVotes.up == null ? 0: reviews[j].interestingVotes.up,
                                reviews[j].interestingVotes == null ? 0 : reviews[j].interestingVotes.down == null ? 0: reviews[j].interestingVotes.down,
                                reviews[j].languageCode == "none" ? 0 : reviews[j].languageCode,
                                reviews[j].reviewText == null ? "none" : reviews[j].reviewText,
                                reviews[j].reviewTitle == null ? "none" : reviews[j].reviewTitle,
                                reviews[j].submissionDate == null ? "none" : reviews[j].submissionDate,
                                movies[i].id
                            ])
                        }

                        let roles = movies[i].casts

                        for (let j = 0; j < roles.length; j++){
                            const res = await db.query('SELECT * FROM public."Casts" WHERE "ID" = $1', [roles[j].id])
                            // console.log(res.rows)
                            if (res.rows.length != 0){
                                // console.log(rows)
                                await db.query(queryImportRole, [
                                    roles[j].characters,
                                    movies[i].id,
                                    roles[j].id
                                ])
                            }
                            
                        }
                    }
                }
            })
        },
        );
    }

    async importCastFromJson() {
        return new Promise((resolve, reject) => {
            fs.readFile(pathCastsDb, async(err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // resolve(JSON.parse(data));
                    let casts = JSON.parse(data)
                    for (let i = 0; i < casts.length; i++) {
                        const { rows } = await db.query('SELECT * FROM public."Casts" WHERE "ID" = $1', [casts[i].id])
                        if (rows != ""){
                            // console.log(rows)
                            continue
                        }

                        let birthDate = casts[i].birthDate
                        if (typeof birthDate == 'string'){
                            let parts = birthDate.split("-")
                            if (parts.length < 3){
                                birthDate = null
                            }
                        }
                        
                        db.query(queryImportCast, [
                            casts[i].id,
                            casts[i].image == null ? "none" : casts[i].image,
                            casts[i].name == null ? "none" : casts[i].name,
                            birthDate,
                            casts[i].birthPlace == null ? "none" : casts[i].birthPlace,
                            casts[i].gender == null ? "" : casts[i].gender,
                            casts[i].heightCentimeters == null ? 0 : casts[i].heightCentimeters,
                        ])
                    }
                }
            })
        },
        );
    }
}

let movie = new Movie
// movie.importCastFromJson()
// movie.importMovieFromJson()
movie.search("Spider")

module.exports = new Movie;