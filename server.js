const express = require('express');
const handlebars = require('express-handlebars');
const route = require('./routes');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'abcdef',
    cookie: { maxAge: 600000000 }
}));

//Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'container.hbs'
}));

app.set('view engine', 'hbs');

//Routes init
route(app)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send(err.message)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



