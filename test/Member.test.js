const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User } = require('../models')

let access_token = null
const body = {
  title: "Ga Setuju Beli Kursi",
  description:"Karena kursi digudang sudah ada"
}

beforeAll(function async (done){
  try {
    const data = await User.findOne({where: {username: "prasatya"}})
    
    access_token = jwt.sign({id: data.id, name: data.name}, process.env.SECRET)
    done()
     
  } catch (error) {
    done(error)
  }
})

//! SCOPE SUCCESS SUGGESTIONS
describe("SUCCESS /suggestions", function(){
  //CREATE suggestion
  it("POST /suggestions - 201 OK", function(done) {

  request(app)
    .post("/suggestions")
    .set({ access_token })
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
          expect(res.body).toHaveProperty("description", body.description)
          expect(typeof res.body.description).toEqual("string")
          done()
        }
      })
  })

  //READ Product
  it("GET /suggestions - 200 OK", function(done) { 
    
    request(app)
      .get("/suggestions")
      .set({ access_token })
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(200)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toHaveProperty("id")
          expect(typeof res.body[0].id).toEqual("number")
          expect(res.body[0]).toHaveProperty("title")
          expect(typeof res.body[0].name).toEqual("string")
          expect(res.body[0]).toHaveProperty("description")
          expect(typeof res.body[0].description).toEqual("string")
          
          done()
        }
      })
  })

  //PUT suggestions
  it("PUT /suggestions/1 - 200 OK", function(done) {
  
    request(app)
      .put("/suggestions/1")
      .set({ access_token })
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("title", body.title)
          expect(typeof res.body.title).toEqual("string")
          expect(res.body).toHaveProperty("description", body.description)
          expect(typeof res.body.description).toEqual("string")

          done()
        }
      })
  })

  //DELETE suggestions
  it("DELETE /suggestions/1 - 200 OK", function(done) {
    
    request(app)
      .delete("/suggestions/1")
      .set({ access_token })
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual("Suggestion has been successfully deleted.")

          done()
        }
      })
  })
})
