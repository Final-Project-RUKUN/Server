const request = require('supertest')
const app = require('../app.js')
const {User} = require('../models')
const jwt = require('jsonwebtoken')

let access_token_value = null
// let id_create = null

beforeAll(function(done){
  User.findOne({where: {username: "bob123"}})
    .then(data => {
      access_token_value = jwt.sign({id: data.id, name: data.name}, process.env.SECRET)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
})

describe("ERROR POST /suggestions", function(){
  //Suggestion Title Empty
  it("POST /suggestions - 400 ERROR (Title empty)", function(done) {
    const body = {
      title: "",
      description:"blablabla",
    }

    const headers = {
      access_token: access_token_value
    }

    request(app)
      .post("/suggestions")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Title is required"})

          done()
        }
      })
  })

  //Suggestion Description Empty
  it("POST /suggestions - 400 ERROR (Description empty)", function(done) {
    const body = {
      title: "blablabla",
      description: "",
    }

    const headers = {
      access_token: access_token_value
    }
    
    request(app)
      .post("/suggestions")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Description is required"})

          done()
        }
      })
  })
})

describe("ERROR PUT /suggestions/2", function(){
  //Suggestion Not User's
  it("PUT /suggestions/1 - 401 ERROR (Unauthorized)", function(done) {
    const body = {
      title: "",
      description:"blablabla",
    }

    const headers = {
      access_token: access_token_value
    }

    request(app)
      .put("/suggestions/1")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(401)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Unauthorized"})

          done()
        }
      })
  })

  //Suggestion Title Empty
  it("PUT /suggestions/2 - 400 ERROR (Title empty)", function(done) {
    const body = {
      title: "",
      description:"blablabla",
    }

    const headers = {
      access_token: access_token_value
    }

    request(app)
      .put("/suggestions/2")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Title is required"})

          done()
        }
      })
  })

  //Suggestion Description Empty
  it("PUT /suggestions/2 - 400 ERROR (Description empty)", function(done) {
    const body = {
      title: "AdidasNMD",
      description: "",
    }

    const headers = {
      access_token: access_token_value
    }
    
    request(app)
      .put("/suggestions/2")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Description is required"})

          done()
        }
      })
    })
})

describe("ERROR DELETE /suggestions/1", function(){
  //Suggestion Not User's
  it("DELETE /suggestions/1 - 401 ERROR (Unauthorized)", function(done) {
    const headers = {
      access_token: access_token_value
    }

    request(app)
      .delete("/suggestions/1")
      .set(headers)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(401)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Unauthorized"})

          done()
        }
      })
  })
})
