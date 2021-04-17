const route = require('express').Router()
const SuggestionConroller = require('../controllers/suggestionController')

route.get('/', SuggestionConroller.fetchSuggestions)

route.post('/', SuggestionConroller.addSuggestion)

route.get('/:id', SuggestionConroller.getSuggestion)

route.put('/:id', SuggestionConroller.updateSuggestion)

route.delete('/:id', SuggestionConroller.deleteSuggestion)


module.exports = route
