const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User } = require('../models')

let access_token = null


beforeAll(async function(done){
  try {

    const user = await User.findOne({where: {username: "MakmurJaya"}})

    access_token = jwt.sign({id: user.id, username: user.username}, process.env.KEY)

    done()
     
  } catch 
  (error) {
    done(error)
  }
})

describe("ROLE ADMIN CAN FETCH, EDIT AND DELETE USER", function(){
  //CREATE suggestion
  it("POST /villagers - 201 OK", function(done) {

  request(app)
    .get("/midtrans?amount=10000&category=Iuran&note=3bulan&title=Iuran joko &username=fadhoo")
    .set({ access_token })
    .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(500)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual("Network Error")
          done()
        }
      })
  })
})