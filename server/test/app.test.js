const supertest = require('supertest');
const app = require('../app')
const request = supertest(app)

describe('GET /movies', () => {
    it('GETs data from movies endpoint', async done => {
        const res = await request.get('/movies')
        console.log(res)
        expect(res.body.length).toBeGreaterThan(0)
        done()
    })

 //   it('responds with a 200 and a list of students', (done) => {
 //       request(app)
 //         .get('/students')
 //         .expect('[{"id":1,"name":"Bob","grade":"A-"},{"id":2,"name":"Tom","grade":"C+"}]')
 //         .expect(200, done)
 //   })
})