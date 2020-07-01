const fs = require("fs")
const bodyParser = require("body-parser")

const express = require('express')
const app = express()
const port = 3001

const pg = require('pg')
const { SSL_OP_EPHEMERAL_RSA } = require("constants")
const Pool = pg.Pool
const pool = new Pool({
   user: 'pgdb',
   host: 'localhost',
   database: 'pgdb',
   password: '123',
   port: 5432,
 })
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req,res) => {
   res.send("hello world")
});

app.get('/movies', (req, res) => {
   const movie_query = req.query.search
   console.log(movie_query)
   if(movie_query) {
      pool.query('SELECT * FROM movies WHERE title LIKE $1', ['%' + movie_query + '%'], (error, results) => {
         if (error) throw error
         res.status(200).json(results.rows)
       })  
   } else {
      pool.query('SELECT * FROM movies ORDER BY movie_id ASC', (error, results) => {
         if (error) throw error
         res.status(200).json(results.rows)
    })  
   }
})

app.get('/movies/:id', (req, res) => {
   const movie_id = req.params.id
   //console.log("movie id: ", movie_id)
   pool.query('SELECT * FROM movies WHERE movie_id = $1',[movie_id], (error, results) => {
      if (error) throw error
      res.status(200).json(results.rows)
      
    })  
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app
