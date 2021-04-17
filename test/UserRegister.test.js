const request = require('supertest')
const app = require('../../app')

describe('TESTING /users/register', () => {
  let userMember = { name: "Makmur", username: "MakmurJaya", password: "123asd", invitation_code: "asam" }

  it('Should return reponse with status code 201', function(done) {

    request(app)
      .post('/user/register')
      .send(userMember)
      .end(function(err, res) {
        if (err) done(err)
        else {
          expect(res.statusCode).toEqual(201)
          expect(Array.isArray(res.body)).toEqual(true)
          done()
        }
      })
  })

  it('Should return reponse with status code 400', function(done) {
    let {name, username, password, role, invitation_code } = userMember

    let data = { name, username, password : '', role, invitation_code }

    request(app)
      .post(`/user/register`)
      .send(data)
      .end(function(err, res) {
        if (err) done(err)
        else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          done()
        }
      })
  })

  it('Should return reponse with status code 400', function(done) {
    let {name, username, password, role, invitation_code } = userMember

    let data = { name, username : '', password, role, invitation_code }

      request(app)
        .post(`/user/register`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(400)
            expect(Array.isArray(res.body)).toEqual(true)
            done()
          }
        })
  })

  it('Should return reponse with status code 401', function(done) {
    let {name, username, password, role, invitation_code } = userMember

    let data = { name, username, password, role, invitation_code: ''} 

      request(app)
        .post(`/user/register`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(400)
            expect(Array.isArray(res.body)).toEqual(true)
            done()
          }
        })
  })
  it('Should return reponse with status code 401', function(done) {
    let {name, username, password, role, invitation_code } = userMember

    let data = { name, username, password, role: '', invitation_code} 

      request(app)
        .post(`/user/register`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(400)
            expect(Array.isArray(res.body)).toEqual(true)
            done()
          }
        })
  })
})
