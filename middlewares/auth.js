const { verifyToken } = require('../helpers/useJwt')
const { User, Suggestion, Transaction } = require('../models')

const authenticate = async (req, res, next) =>{
    try {
        let { access_token } = req.headers
        let decoded = verifyToken(access_token)
        console.log(decoded);
        if (decoded) {
            const user = await User.findOne({where: { username: decoded.username } })
            if (user) {
                req.currentUser = { id : user.id, role: user.role, VillageId: user.VillageId }
                next()
            } else {
              next({ code : 401,
                message : 'Unauthoraized'
              })
            }
        } else {
          next({ code : 401,
            message : 'Invalid Token'
          })
        }
    } catch (error) {
      console.log(error);
        next(error)
    }
}

const authorize = async (req, res, next) =>{
  let { id } = req.currentUser
  try {
    const user = await User.findByPk(id)
    if (user.role === 'admin') {
      next()
    } else {
      if (req.params.id) {
        const { id: SuggestionId } = req.params
        
        const suggestion = await Suggestion.findByPk(SuggestionId)

        if (suggestion) {
          next()
        } else {
          next({ status : 401,
            message : 'Unauthorized'
          })
        }
      }
      next({ status : 401,
        message : 'Unauthorized'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate, authorize }
