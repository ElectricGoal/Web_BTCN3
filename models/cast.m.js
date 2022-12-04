const db = require("./database")

const queryGetCasts = `
SELECT C."ID", C."Image", C."Name", R."CharacterName"
FROM public."Roles" R, public."Casts" C
WHERE R."MovID" = $1 and R."CastID" = C."ID"
`

const queryGetDetail = `
SELECT *
FROM public."Casts"
WHERE "ID" = $1
`

const querySearch = `
SELECT *
FROM public."Casts"
WHERE "Name" LIKE $1
ORDER BY "ID" ASC 
LIMIT 3
OFFSET $2
`

class Casts{
    async getCasts(movID) {
        const {rows} = await db.query(queryGetCasts, [movID])
        return rows
    }

    async getCastDetail(castID) {
        const {rows} = await db.query(queryGetDetail, [castID])
        return rows
    }

    async search(name, page) {
        const {rows} = await db.query(querySearch, ['%' + name + '%', page * 3])
        return rows
    }
}

module.exports = new Casts;