const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User } = require('../models')

let access_token = null

beforeAll(function async (done){
  try {
    const data = await User.findOne({where: {username: "prasatya"}})
    
    access_token = jwt.sign({id: data.id, name: data.name}, process.env.SECRET)
    done()
     
  } catch (error) {
    done(error)
  }
})
//! SCOPE FOR SUCCESS TRANSACTON
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
    request(app)
      .post("/transactions")
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
          expect(res.body).toHaveProperty("amount", body.amount)
          expect(typeof res.body.amount).toEqual("number")
          expect(res.body).toHaveProperty("category", body.category)
          expect(typeof res.body.category).toEqual("string")
          expect(res.body).toHaveProperty("notes", body.notes)
          expect(typeof res.body.notes).toEqual("string")
          expect(res.body).toHaveProperty("type", body.type)
          expect(typeof res.body.type).toEqual("string")

          done()
        }
    })
  })
  //*FETCH TRANSACTION
  it("POST /transactions - 201 OK", function(done) {
    const body = {
      title: "Iuran Sampah",
      amount: 10,
      category: "iuran",
      notes: "iuran sampah bulanan",
      type: "income"
    }
    request(app)
      .get("/transactions")
      .set({ access_token })
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(200)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(res.body[0]).toHaveProperty("id")
          expect(typeof res.body[0].id).toEqual("number")
          expect(res.body[0]).toHaveProperty("title", body.title)
          expect(typeof res.body[0].title).toEqual("string")
          expect(res.body[0]).toHaveProperty("amount", body.amount)
          expect(typeof res.body[0].amount).toEqual("number")
          expect(res.body[0]).toHaveProperty("category", body.category)
          expect(typeof res.body[0].category).toEqual("string")
          expect(res.body[0]).toHaveProperty("notes", body.notes)
          expect(typeof res.body[0].notes).toEqual("string")
          expect(res.body[0]).toHaveProperty("type", body.type)
          expect(typeof res.body[0].type).toEqual("string")

          done()
        }
    })
  })
})

//! SCOPE FOR ERROR 
describe("ERROR POST /transactions", function(){
  //Suggestion Title Empty
  it("POST /transactions - 400 ERROR (Title empty)", function(done) {
    const errorBody = {
      title: "",
      amount: 10,
      category: "iuran",
      notes: "iuran sampah bulanan",
      type: "income"
    }


    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
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

  // //Suggestion Amount null
  // it("POST /transactions - 400 ERROR (Amount Null)", function(done) {
  //   const body = {
  //     title: "Iuran Bulanan",
  //     amount: null,
  //     category: "iuran",
  //     notes: "iuran sampah bulanan",
  //     type: "income"
  //   }

  //   const headers = {
  //     access_token: access_token_value
  //   }
    
  //   request(app)
  //     .post("/transactions")
  //     .set(headers)
  //     .send(body)
  //     .end(function(err,res){
  //       if(err) {
  //         done(err)
  //       } else {
  //         expect(res.statusCode).toEqual(400)
  //         expect(Array.isArray(res.body)).toEqual(true)
  //         expect(typeof res.body[0]).toEqual("object")
  //         expect(res.body[0]).toEqual({"message": "Amount is required"})

  //         done()
  //       }
  //     })
  // })

  //Suggestion Amount not Float
  it("POST /transactions - 400 ERROR (Amount not Float)", function(done) {
    const errorBody = {
      title: "Iuran Bulanan",
      amount: "RP.10000",
      category: "iuran",
      notes: "iuran sampah bulanan",
      type: "income"
    }
    
    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
      .end(function(err,res){
        if(err) done(err)
        else {
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
    const errorBody = {
      title: "Iuran Bulanan",
      amount: 100000,
      category: "",
      notes: "iuran sampah bulanan",
      type: "income"
    }
    
    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
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
    const errorBody = {
      title: "Iuran Bulanan",
      amount: 100000,
      category: "iuran",
      notes: "",
      type: "income"
    }
    
    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
      .end(function(err,res){
        if(err) done(err)
        else {
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
    const errorBody = {
      title: "Iuran Bulanan",
      amount: 100000,
      category: "iuran",
      notes: "iuran sampah bulanan",
      type: ""
    }
    
    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
      .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(typeof res.body[0]).toEqual("object")
          expect(res.body[0]).toEqual({"message": "Type is required"})

          done()
        }
      })
  })
})

