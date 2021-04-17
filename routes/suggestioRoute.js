const route = require('express').Router()
const SuggestionConroller = require('../controllers/suggestionController')
const { authorize } = require('../middlewares/auth')


route.get('/', SuggestionConroller.fetchSuggestions)

route.post('/', SuggestionConroller.addSuggestion)

route.get('/:id', SuggestionConroller.getSuggestion)

route.use('/:id', authorize)

route.put('/:id', SuggestionConroller.updateSuggestion)

route.delete('/:id', SuggestionConroller.deleteSuggestion)

module.exports = route
