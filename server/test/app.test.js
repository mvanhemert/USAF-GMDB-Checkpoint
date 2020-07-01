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
          done()
      })
})