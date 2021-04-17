const request = require('supertest')
const app = require('../../app')

describe('TESTING /users/register', () => {
  let user = { username: "MakmurJaya", password: "123asd" }
  
  it('Should return reponse with status code 200', function(done) {

    request(app)
      .post('/user/login')
      .send(user)
      .end(function(err, res) {
        if (err) done(err)
        else {
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("string")
          done()
        }
      })
  })

  it('Should return reponse with status code 401', function(done) {
      let {username, password} = user

      let data = {username, password : 'xsaxas'}

      request(app)
        .post(`/user/login`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual("object")
            done()
            }
        })
  })

  it('Should return reponse with status code 401', function(done) {
    let {username, password } = user

    let data = {username : 'sabana', password}

      request(app)
        .post(`/user/login`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual("object")
            done()
          }
        })
  })

  it('Should return reponse with status code 401', function(done) {
      let data = {} 

      request(app)
        .post(`/user/login`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            console.log(res.body);
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual("object")
            done()
          }
        })
  })
})
