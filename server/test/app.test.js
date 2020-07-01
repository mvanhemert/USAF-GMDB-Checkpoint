const supertest = require('supertest');
const app = require('../app')
const request = supertest(app)

describe('GET /movies', () => {
    it('GETs data from movies endpoint', async done => {
        const res = await request.get('/movies')
        expect(res.body.length).toBeGreaterThan(0)
        done()
    })
})

describe('GET /movies/:id', () => {
      it('GETs data from movies by an id', async done => {
          const res = await request.get('/movies/3')          
          expect(res.body.length).toBeGreaterThan(0)
          done()
      })
})
  
describe('GET /movies?search = <query>', () => {
      it('GETs data from movies with a query', async done => {
          const res = await request.get('/movies?search=Trek')          
          expect(res.body.length).toBeGreaterThan(0)
          expect(res.body.length).toBeLessThan(500)
          done()
      })
})

describe('GET /reviews/:movieId', () => {
  it('GETs reviews from movie database by a movieid', async done => {
      const res = await request.get('/reviews/3')          
      expect(res.body.length).toBeGreaterThan(0)
      done()
  })
})

 

  test('can add a new review to db', done => {
    let newReview =
    {
      last_updated: "2-14-2020",
      movie_id: 3,
      review_text: "great movie",
      review_title: "Gone with the Wind",
      reviewer_id: 33,
      stars: 4,
      imdbid: "3452"
    }
    supertest(app).post('/reviews').send(newReview).set('Accept', 'application/json')
    .expect(201).end(function(error,res){
      if(error) {
        throw error
      }
      done()
    })
    
  })

  test('can create a new user', done => {
    let temp = Date.now().toString();
    let newUser =
    {
      email: temp,
      first_name: "Sam",
      last_name: "Brown",
      password: "98(*gyR"
    }
    supertest(app).post('/register').send(newUser).set('Accept', 'application/json')
    .expect(201).end(function(error,res){
      if(error) {
        throw error
      }
      done()
    })
    
  })
