const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const nodemailer = require('nodemailer')
const fs = require('fs');

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
        const guid = function randomString(i) {
            var rnd = '';
            while (rnd.length < i) 
                rnd += Math.random().toString(36).substring(2);
            return rnd.substring(0, i);
        }(20);
        const user = await User.create({email, password: hashPassword, name, guid})

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

            var text = fs.readFileSync("/home/lesha/Рабочий стол/Best_test/server/controllers/confirmEmail.html", "utf8")
            text = text.replace("confirmRef", `http://localhost:5000/api/confirm/${guid}`)

            transporter.sendMail({
                from: '"BestTest" <bbesttest@yandex.ru>',
                to: user.email,
                subject: 'Завершение регистрации',
                html: text,
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
