const request = require('supertest')
const app = require('../app.js')
const {Suggestion} = require('../models')
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

describe("ERROR POST /transactions", function(){
  //Suggestion Title Empty
  it("POST /transactions - 400 ERROR (Title empty)", function(done) {
    const body = {
      title: "",
      amount: 10,
      category: "iuran",
      notes: "iuran sampah bulanan",
      type: "income"
    }

    const headers = {
      access_token: access_token_value
    }

    request(app)
      .post("/transactions")
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

  //Suggestion Amount null
  it("POST /transactions - 400 ERROR (Amount Null)", function(done) {
    const body = {
      title: "Iuran Bulanan",
      amount: null,
      category: "iuran",
      notes: "iuran sampah bulanan",
      type: "income"
    }

    const headers = {
      access_token: access_token_value
    }
    
    request(app)
      .post("/transactions")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Amount is required"})

          done()
        }
      })
  })

  //Suggestion Amount not Float
  it("POST /transactions - 400 ERROR (Amount not Float)", function(done) {
    const body = {
      title: "Iuran Bulanan",
      amount: "null",
      category: "iuran",
      notes: "iuran sampah bulanan",
      type: "income"
    }

    const headers = {
      access_token: access_token_value
    }
    
    request(app)
      .post("/transactions")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Amount must be a float"})

          done()
        }
      })
  })

  //Suggestion Category Empty
  it("POST /transactions - 400 ERROR (Category Empty)", function(done) {
    const body = {
      title: "Iuran Bulanan",
      amount: 100000,
      category: "",
      notes: "iuran sampah bulanan",
      type: "income"
    }

    const headers = {
      access_token: access_token_value
    }
    
    request(app)
      .post("/transactions")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Category is required"})

          done()
        }
      })
  })

  //Suggestion Notes Empty
  it("POST /transactions - 400 ERROR (Notes Empty)", function(done) {
    const body = {
      title: "Iuran Bulanan",
      amount: 100000,
      category: "iuran",
      notes: "",
      type: "income"
    }

    const headers = {
      access_token: access_token_value
    }
    
    request(app)
      .post("/transactions")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Notes is required"})

          done()
        }
      })
  })

  //Suggestion Type Empty
  it("POST /transactions - 400 ERROR (Type Empty)", function(done) {
    const body = {
      title: "Iuran Bulanan",
      amount: 100000,
      category: "iuran",
      notes: "iuran sampah bulanan",
      type: ""
    }

    const headers = {
      access_token: access_token_value
    }
    
    request(app)
      .post("/transactions")
      .set(headers)
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Type is required"})

          done()
        }
      })
  })
})

