const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

class ConfirmConstroller {
    async confirm(req, res, next) {
       console.log('1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111')
       let jwtDecoded = jwt.decode(req.query.guid)
       let guid = jwtDecoded.guid;
       let user = User.findOne({where: {guid}})
       if (user) user.isEmailVerified = true

       console.log('$$$' + user.isEmailVerified + '$$$')
       return res.json(user.isEmailVerified)
    }
}

module.exports = new ConfirmConstroller()
