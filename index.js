const express = require('express')
const mysql = require('mysql')
const app = express()

const cors = require('cors')
const { config } = require('./config/index')

const coursesApi = require('./routes/coursesApi')
const teachersApi = require('./routes/teachersApi')
const unionApi = require('./routes/unionApi')

const PORT = process.env.PORT || 8080

//Parse and Cors
app.use(express.json())
app.use(cors())

//MySQL
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

//Routes
coursesApi(app)
teachersApi(app)
unionApi(app)

//Check connect
connection.connect(error => {
    if (error) throw error
    console.log('DB server running')
})

app.listen(PORT, () => console.log(`Conection on port ${PORT}`))