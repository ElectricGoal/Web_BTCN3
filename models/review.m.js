const db = require("./database")

const queryGetCasts = `
SELECT C."ID", C."Image", C."Name", R."CharacterName"
FROM public."Roles" R, public."Casts" C
WHERE R."MovID" = $1 and R."CastID" = C."ID"
`

const queryGetAll = `
SELECT *
FROM public."Reviews"
WHERE "MovID" = $1
`

class Reviews{
    async getReviews(movID) {
        const {rows} = await db.query(queryGetAll, [movID])
        return rows
    }
}

module.exports = new Reviews;