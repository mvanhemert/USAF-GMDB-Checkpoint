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
   pool.query('SELECT * FROM movies WHERE movie_id = $1',[movie_id], (error, results) => {
      if (error) throw error
      res.status(200).json(results.rows)
      
    })  
})

app.get('/reviews/:movieId', (req, res) => {
   const movie_id = req.params.movieId
   pool.query('SELECT * FROM reviews WHERE movie_id = $1',[movie_id], (error, results) => {
      if (error) throw error
      res.status(200).json(results.rows)     
    })  
})

app.post('/reviews', (req, res) => {
   const review = req.body
   const movie_id = review.movie_id
   const review_text = review.review_text
   console.log(JSON.stringify(review))
   pool.query('INSERT INTO reviews (last_updated, movie_id, review_text, review_title, reviewer_id, stars, imdbid) VALUES($1, $2, $3, $4, $5,$6, $7)', 
      [review.last_updated, movie_id, review_text, review.review_title, review.reviewer_id, review.stars, review.imdbid], (error, results) => {
      if (error) throw error
      res.status(201).send()
   })
})

app.post('/register', (req, res) => {
   const user = req.body
   const last_name = user.last_name
   const email = user.email
   console.log(JSON.stringify(user))
   pool.query('INSERT INTO users (last_name,email) VALUES($1, $2)', [last_name,email], (error, results) => {
      if (error) throw error
      res.status(201).send()
   })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app
