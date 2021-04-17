const { verifyToken } = require('../helpers/useJwt')
const { User } = require('../models')

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

const authorize = (req, res, next) =>{
    let { id } = req.currentUser
}

module.exports = { authenticate, authorize }
