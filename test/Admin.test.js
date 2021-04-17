const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User } = require('../models')

let access_token = null

beforeAll(function async (done){
  try {
    const data = await User.findOne({where: { username: "Krisna" }})
    
    access_token = jwt.sign({id: data.id, name: data.name}, process.env.SECRET)
    done()
     
  } catch (error) {
    done(error)
  }
})