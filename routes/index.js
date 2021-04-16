const route = require('express').Router()
const userRoute = require('./userRoute')
const villageRoute = require('./villageRoute')
const historyRoute = require('./historyRoute')
const suggestionRoute = require('./suggestioRoute')


route.use('/user', userRoute)

route.use('/village', villageRoute)

route.use('/history', historyRoute)

route.use('/suggestion', suggestionRoute)

module.exports = route
