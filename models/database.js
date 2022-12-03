const {Pool, Client} = require('pg')

const db = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "25082002",
    database: "QLPA"
});

module.exports = db;


// db.query('SELECT * FROM public."Users" WHERE "f_Username" = $1', ['abc'], (err, res) => {
//     if (err){
//         console.log(err.message);
//     }else{
//         console.log(res.rows[0])
//         let user = res.rows[0]
//         let email = user.f_Email
//         let password = user.f_Password

//         console.log(email)
//         console.log(password)
//     }
// })