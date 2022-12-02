const bcrypt = require("bcrypt")
const db = require("./database")

const saltRounds = 10;

class Auth {
    async signup(username, fullname, email, password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const id = 22
        var values = [id, username, hashedPassword, fullname, email, '2014-03-19 00:00:00.000', 0]
        db.query('INSERT INTO "Users" VALUES($1, $2, $3, $4, $5, $6, $7)', values, (err, res) => {
            if (err) {
                console.log(err.message);
            }
        })
    }

    async login(email, password) {
        //search rows by email
        const {rows} = await db.query('SELECT * FROM public."Users" WHERE "f_Email" = $1', [email])

        //get password from database
        let hash = rows[0].f_Password
        // console.log(hash)

        const match = await bcrypt.compare(password, hash);
        return match
    }
}

module.exports = new Auth;