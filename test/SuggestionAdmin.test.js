const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User } = require('../models')

let access_token = null
const body = {
  title: "Ga Setuju Beli Kursi",
  description:"Karena kursi digudang sudah ada"
}
let id

beforeAll(function async (done){
  try {
    const data = await User.findOne({where: {username: "prasatya"}})
    
    access_token = jwt.sign({id: data.id, name: data.name}, process.env.SECRET)
    done()
     
  } catch (error) {
    done(error)
  }
})

//! SCOPE SUGGESTIONS SUCCESS
describe("SUCCESS /suggestions", function(){
  //CREATE suggestion
  it("POST /suggestions - 201 OK", function(done) {

  request(app)
    .post("/suggestions")
    .set({ access_token })
    .send(body)
    .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("id")
          expect(typeof res.body.id).toEqual("number")
          expect(res.body).toHaveProperty("title", body.title)
          expect(typeof res.body.title).toEqual("string")
          expect(res.body).toHaveProperty("description", body.description)
          expect(typeof res.body.description).toEqual("string")
          id = res.body.id
          done()
        }
      })
  })

  //READ Suggestion
  it("GET /suggestions - 200 OK", function(done) { 
    
    request(app)
      .get("/suggestions")
      .set({ access_token })
      .end(function(err, res){
        if(err) done(err)
        else {
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
      .put(`/suggestions/${id}`)
      .set({ access_token })
      .send(body)
      .end(function(err, res){
        if(err) done(err)
        else {
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
})

//! SUGGESTION ERROR
describe("ERROR POST /suggestions", function(){
  //Suggestion Title Empty
  it("POST /suggestions - 400 ERROR (Title empty)", function(done) {
    const errBody = {
      title: "",
      description:"Sampah banyak tersendat di selokan",
    }

    request(app)
      .post("/suggestions")
      .set({ access_token })
      .send(errBody)
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
    const errBody = {
      title: "iuran",
      description: "",
    }

    request(app)
      .post("/suggestions")
      .set({ access_token })
      .send(errBody)
      .end(function(err,res){
        if(err) done(err)
        else {
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

    request(app)
      .put(`/suggestions/${id}`)
      .set({ access_token })
      .send(body)
      .end(function(err,res){
        if(err) done(err)
        else {
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
        if(err) done(err)
        else {
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
    const errBody = {
      title: "Iuran",
      description: "",
    }
    
    request(app)
      .put("/suggestions/2")
      .set({ access_token })
      .send(errBody)
      .end(function(err, res){
        if(err) done(err)
        else {
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

    request(app)
      .delete("/suggestions/1")
      .set({ access_token })
      .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Unauthorized"})

          done()
        }
      })
  })
})
