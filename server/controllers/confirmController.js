const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

class ConfirmConstroller {
    async confirm(req, res, next) {
       const {guid} = req.params
       let user = await User.findOne({where: {guid}})
       res.set('Content-Type', 'text/html')
       if (user)
       res.end("<h2>Вы успешно подтвердили email!</h2>");
       else
       res.end("<h2>Что-то пошло не так...<h2>");
       ////перенаправить на главную страницу
       user.update({is_email_varified : true})
       return true
    }
}

module.exports = new ConfirmConstroller()
