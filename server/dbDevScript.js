require('dotenv').config()
const sequelize = require('./db')

const {User, Test, Question, AnswerOption, TestResult, AnswerOptionTestResult} = require('./models/models')

const start = async () => {
    try {
        await sequelize.authenticate()
        /** write your code here **/

        console.log('------------Done------------')
    } catch (e) {
        console.log(e)
    }
}

start()
