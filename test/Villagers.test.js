const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User } = require('../models')

let access_token_member = null

let access_token_admin = null


beforeAll(async function(done){
  try {
    const dataAdmin = await User.findOne({where: {username: "Makarya"}})
    const dataMember = await User.findOne({where: {username: "MakmurJaya"}})

    access_token_admin = jwt.sign({id: dataAdmin.id, username: dataAdmin.username}, process.env.KEY)

    access_token_member = jwt.sign({id: dataMember.id, username: dataMember.username}, process.env.KEY)

    done()
     
  } catch 
  (error) {
    done(error)
  }
})

//! SCOPE SUCCESS
describe("ROLE ADMIN CAN FETCH, EDIT AND DELETE USER", function(){
  //CREATE suggestion
  it("POST /villagers - 201 OK", function(done) {

  request(app)
    .get("/villagers")
    .set({ access_token: access_token_admin })
    .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(200)
          expect(Array.isArray(res.body.Users)).toEqual(true)
          expect(typeof res.body.Users[0]).toEqual('object')
          expect(res.body.Users[0]).toHaveProperty("id")
          expect(typeof res.body.Users[0].id).toEqual("number")
          expect(res.body.Users[0]).toHaveProperty("name")
          expect(typeof res.body.Users[0].name).toEqual("string")
          expect(res.body.Users[0]).toHaveProperty("username")
          expect(typeof res.body.Users[0].username).toEqual("string")
          expect(res.body.Users[0]).toHaveProperty("role")
          expect(typeof res.body.Users[0].role).toEqual("string")
          expect(res.body.Users[0]).toHaveProperty("VillageId")
          expect(typeof res.body.Users[0].VillageId).toEqual("number")
          expect(res.body.Users[0]).toHaveProperty("push_token")
          expect(typeof res.body.Users[0].push_token).toEqual("string")
          done()
        }
      })
  })

  //DELETE USER
  // it("DELETE /user - 200 OK", function(done) { 
    
  //   request(app)
  //     .delete("/user/23")
  //     .set({ access_token })
  //     .end(function(err, res){
  //       if(err) done(err)
  //       else {
  //         expect(res.statusCode).toEqual(200)
  //         expect(typeof res.body).toEqual("object")
  //         expect(res.body).toHaveProperty("message")
  //         expect(res.body.message).toEqual("Successfully deleted user")

  //         done()
  //       }
  //     })
  // })

  it("PUT /user - 200 OK", function(done) { 
    
    request(app)
      .put("/admin/change/24")
      .set({ access_token: access_token_admin })
      .end(function(err, res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual("Successfully change role admin")

          done()
        }
      })
  })
})

//! SCOPE ERROR
describe("ERROR UNAUTHORIZED", function(){
  //CREATE suggestion
  it("POST /villagers - 401 UNAUTHORIZED", function(done) {

  request(app)
    .get("/villagers")
    .set({ access_token: access_token_member })
    .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual("Unauthorized")
          done()
        }
      })
  })

  //DELETE USER
  // it("DELETE /user - 200 OK", function(done) { 
    
  //   request(app)
  //     .delete("/user/23")
  //     .set({ access_token })
  //     .end(function(err, res){
  //       if(err) done(err)
  //       else {
  //         expect(res.statusCode).toEqual(200)
  //         expect(typeof res.body).toEqual("object")
  //         expect(res.body).toHaveProperty("message")
  //         expect(res.body.message).toEqual("Successfully deleted user")

  //         done()
  //       }
  //     })
  // })

  it("PUT /user - 200 OK", function(done) { 
    
    request(app)
      .put("/admin/change/20")
      .set({ access_token: access_token_member })
      .end(function(err, res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual("Unauthorized")

          done()
        }
      })
  })
})
