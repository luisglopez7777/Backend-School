const express = require('express')
const mysql = require('mysql')
const { config } = require('../config/index')

function coursesApi(app) {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    })
    const router = express.Router()
    app.use('/', router)

    app.get('/courses', (req, res) => {
        const sql = 'SELECT * FROM courses'
        connection.query(sql, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.json(results)
            } else {
                res.send('No result')
            }
        })
    })

    app.get('/courses/:id', (req, res) => {
        const { id } = req.params
        const sql = `SELECT * FROM courses WHERE id = ${id}`
        connection.query(sql, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.json(results)
            } else {
                res.send('No result')
            }
        })
    })

    app.post('/courses', (req, res) => {
        const sql = `INSERT INTO courses SET ?`
        const course = {
            name: req.body.name,
        }

        connection.query(sql, course, err => {
            if (err) throw err
            res.send('Course created')
        })
    })

    app.delete('/courses/:id', (req, res) => {
        const { id } = req.params
        const sql = `DELETE FROM courses WHERE id=${id}`

        connection.query(sql, err => {
            if (err) throw err
            res.send('Course deleted')
        })
    })
}

module.exports = coursesApi