const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    bio: {type: DataTypes.STRING(2000)},
    avatarUrl: {type: DataTypes.STRING},
})

const Test = sequelize.define('test', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

module.exports = {
    User,
    Test
}
