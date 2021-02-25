const express = require('express')
const mysql = require('mysql')
const { config } = require('../config/index')

function unionApi(app) {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    })
    const router = express.Router()
    app.use('/', router)

    app.get('/union/teachers/:id', (req, res) => {
        const { id } = req.params
        const sql = `SELECT 
                      teachers.name as teacher_name,
                      courses.name as course_name
                    FROM course_teacher as ct 
                            INNER JOIN teachers
                            ON ct.teacher_id = teachers.id                        
                            INNER JOIN courses 
                            ON ct.course_id = courses.id
                            WHERE ${id} = teachers.id`
        connection.query(sql, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.json(results)
            } else {
                res.send('No result')
            }
        })
    })

    app.get('/union/courses/:id', (req, res) => {
        const { id } = req.params
        const sql = `SELECT 
                      teachers.name as teacher_name,
                      courses.name as course_name
                    FROM course_teacher as ct 
                            INNER JOIN teachers
                            ON ct.teacher_id = teachers.id                        
                            INNER JOIN courses 
                            ON ct.course_id = courses.id
                            WHERE ${id} = courses.id`
        connection.query(sql, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.json(results)
            } else {
                res.send('No result')
            }
        })
    })
}

module.exports = unionApi
