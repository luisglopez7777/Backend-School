const express = require('express')
const mysql = require('mysql')
const { config } = require('../config/index')

function teachersApi(app) {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    })
    const router = express.Router()
    app.use('/', router)

    app.get('/teachers', (req, res) => {
        const sql = 'SELECT * FROM teachers'
        connection.query(sql, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.json(results)
            } else {
                res.send('No result')
            }
        })
    })

    app.get('/teachers/:id', (req, res) => {
        const { id } = req.params
        const sql = `SELECT * FROM teachers WHERE id = ${id}`
        connection.query(sql, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.json(results)
            } else {
                res.send('No result')
            }
        })
    })

    app.post('/teachers', (req, res) => {
        const sql = `INSERT INTO teachers SET ?`
        const teacher = {
            name: req.body.name,
        }
        connection.query(sql, teacher, err => {
            if (err) throw err
            res.send('Teacher created')
        })
    })

    app.delete('/teachers/:id', (req, res) => {
        const { id } = req.params
        const sql = `DELETE FROM teachers WHERE id=${id}`

        connection.query(sql, err => {
            if (err) throw err
            res.send('Teacher deleted')
        })
    })

}

module.exports = teachersApi