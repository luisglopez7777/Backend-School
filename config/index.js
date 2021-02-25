require('dotenv').config()

const config = {
    host: process.env.HOST,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

module.exports = { config }