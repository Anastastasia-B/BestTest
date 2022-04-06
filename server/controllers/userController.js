const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const nodemailer = require('nodemailer')

const generateJWT = (id, email) => {
    return jwt.sign(
        {id: id, email: email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserConstroller {
    async registration(req, res, next) {
        const {email, password, name} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже сущиствует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, name})

        const token = generateJWT(user.id, user.email)

        let sendMessage = function() { // посылаем письмо для завершения регистрации
            try {
            let transporter = nodemailer.createTransport({
                service: '"Yandex"',
                auth: {
                  user: 'bbesttest@yandex.ru',
                  pass: 'bbesttest=1',
                },
            })

            transporter.sendMail({
                from: '"BestTest" <bbesttest@yandex.ru>',
                to: user.email,
                subject: 'Завершение регистрации',
                html:
                  'Спасибо за регистрацию на портале BestTest! Для завершения регистрации нажмите' +
                  `<a href="http://localhost:3000/confirm?guid=${token}">` +
                    'сюда' + 
                  '</a>.',
            }, function (err, info) {
                if(err)
                  console.log(err)
                //else
                //  console.log(info);
             })

            } catch (e) {
                //console.log('oops')
                ApiError.internal('Внутренние неполадки...')
            }
        }
        sendMessage()

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь с данным email не найден'))
        }
        let passwordCorrect = bcrypt.compareSync(password, user.password)
        if (!passwordCorrect) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJWT(user.id, user.email)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJWT(req.user.id, req.user.email)
        return res.json({token})
    }

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne({where: {id}},
        )
        return res.json(user)
    }
}

module.exports = new UserConstroller()
