const bcrypt = require("bcrypt")
const db = require("./database")

const saltRounds = 10;

const querySignUp = `
INSERT INTO "Users" ("f_Username", "f_Password", "f_Name", "f_Email", "f_DOB", "f_Permission") 
VALUES($1, $2, $3, $4, $5, $6)
`

class Auth {
    async signup(username, fullname, email, password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        let date = new Date();
        var values = [username, hashedPassword, fullname, email, date, 0]
        db.query(querySignUp, values, (err, res) => {
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