const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const {User} = require('../models')

let access_token_value = null

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

describe("SUCCESS /transactions", function(){
  //CREATE Product
  it("POST /transactions - 201 OK", function(done) {
    const body = {
      title: "Iuran Sampah",
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
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("id")
          expect(typeof res.body.id).toEqual("number")
          expect(res.body).toHaveProperty("title", body.title)
          expect(typeof res.body.title).toEqual("string")
          expect(res.body).toHaveProperty("amount", body.amount)
          expect(typeof res.body.amount).toEqual("number")
          expect(res.body).toHaveProperty("category", body.category)
          expect(typeof res.body.category).toEqual("string")
          expect(res.body).toHaveProperty("notes", body.notes)
          expect(typeof res.body.notes).toEqual("string")
          expect(res.body).toHaveProperty("type", body.type)
          expect(typeof res.body.type).toEqual("string")
          expect(res.body).toHaveProperty("createdAt")
          expect(typeof res.body.createdAt).toEqual("string")
          expect(res.body).toHaveProperty("updatedAt")
          expect(typeof res.body.updatedAt).toEqual("string")

          done()
        }
    })
  })
})
