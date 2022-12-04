const {Pool, Client} = require('pg')
const config = require('../configs/connectStr')

const db = new Pool(config);

module.exports = db;
