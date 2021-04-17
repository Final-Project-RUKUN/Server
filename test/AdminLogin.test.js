const request = require('supertest')
const app = require('../app')

//!POST SUCCESS
describe('TESTING /users/register', () => {
  let userAdmin = { username: "Rendro", password: "123456" }

  it('Should return reponse with status code 200', function(done) {

    request(app)
      .post('/admin/login')
      .send(userAdmin)
      .end(function(err, res) {
        if (err) done(err)
        else {
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("string")
          done()
        }
      })
  })
  it('Should return reponse with status code 404', function(done) {
    let {username, password} = userAdmin

    let data = {username, password : 'xsaxas'}

    request(app)
      .post(`/admin/login`)
      .send(data)
      .end(function(err, res) {
        if (err) done(err)
        else {
          expect(res.statusCode).toEqual(404)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(typeof res.body.message).toEqual("string")
          done()
          }
      })
  })

  it('Should return reponse with status code 404', function(done) {
    let {username, password } = userAdmin

    let data = {username : 'sabana', password}

      request(app)
        .post(`/admin/login`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("message")
            expect(typeof res.body.message).toEqual("string")
            done()
          }
        })
  })

  it('Should return reponse with status code 500', function(done) {
      let data = {} 

      request(app)
        .post(`/admin/login`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("message")
            expect(typeof res.body.message).toEqual("string")
            done()
          }
        })
  })
})
