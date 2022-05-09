const Uuid = require('uuid')
const fs = require('fs')

const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Test} = require('../models/models')

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
            return next(ApiError.badRequest('backendErrors.incorrectEmailOrPassword'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('backendErrors.userWithEmailAlreayExists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, name})

        const token = generateJWT(user.id, user.email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('backendErrors.userWithEmailNotFound'))
        }
        let passwordCorrect = bcrypt.compareSync(password, user.password)
        if (!passwordCorrect) {
            return next(ApiError.internal('backendErrors.wrongPassword'))
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
        const user = await User.findOne({
            where: {id},
            include: [
                {model: Test, as: 'testsPassed'}
            ]
        })
        return res.json(user)
    }

    async uploadAvatar(req, res) {
        try {
            const file = req.files.file
            const user = await User.findOne({where: {id: req.user.id}})
            const avatarName = Uuid.v4() + '.jpg'            
            const oldName = user.avatarUrl

            if (!fs.existsSync(process.env.STATIC_PATH)){
                fs.mkdirSync(process.env.STATIC_PATH)
            }

            file.mv(process.env.STATIC_PATH + "/" + avatarName)
            user.avatarUrl = avatarName
            await user.save()

            if (oldName)
                fs.unlinkSync(process.env.STATIC_PATH + "/" + oldName)

            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'backendErrors.uploadAvatarError'})
        }
    }

    async deleteAvatar(req, res) {
        try {
            const user = await User.findOne({where: {id: req.user.id}})
            fs.unlinkSync(process.env.STATIC_PATH + "/" + user.avatarUrl)
            user.avatarUrl = null
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'backendErrors.deleteAvatarError'})
        }
    }

    async editProfile(req, res) {
        const {id, email, name, bio} = req.body
        const user = await User.findOne({where: {id}})
        await user.update({email, name, bio})
        return res.json(user)
    }
}

module.exports = new UserConstroller()
