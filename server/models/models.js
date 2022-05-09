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
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING(2000)},
    frontPictureUrl: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING, defaultValue: 'A'},
})

const Question = sequelize.define('question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    body: {type: DataTypes.STRING},
    pictureUrl: {type: DataTypes.STRING},
})

const AnswerOption = sequelize.define('answerOption', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    body: {type: DataTypes.STRING},
    correct: {type: DataTypes.BOOLEAN, defaultValue: false}, // type A field
    score: {type: DataTypes.INTEGER, defaultValue: 0}, // type A field
})

const TestResult = sequelize.define('testResult', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    body: {type: DataTypes.STRING},
    pictureUrl: {type: DataTypes.STRING},
    fromScore: {type: DataTypes.INTEGER, defaultValue: 0}, // type A field
    toScore: {type: DataTypes.INTEGER, defaultValue: 0}, // type A field
})

/** type B only **/
const AnswerOptionTestResult = sequelize.define('answerOptionTestResult', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    score: {type: DataTypes.INTEGER, defaultValue: 0},
})

const UserTestResult = sequelize.define('userTestResult', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    testResultId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TestResult,
            key: 'id'
        }
    }
})

module.exports = {
    User,
    Test,
    Question,
    AnswerOption,
    TestResult,
    AnswerOptionTestResult,
    UserTestResult
}

User.hasMany(Test, {onDelete: 'CASCADE'})
Test.belongsTo(User)

Test.hasMany(Question, {onDelete: 'CASCADE'})
Question.belongsTo(Test)

Question.hasMany(AnswerOption, {onDelete: 'CASCADE'})
AnswerOption.belongsTo(Question)

Test.hasMany(TestResult, {onDelete: 'CASCADE'})
TestResult.belongsTo(Test)

/** type B only **/
AnswerOption.belongsToMany(TestResult, { through: AnswerOptionTestResult })
TestResult.belongsToMany(AnswerOption, { through: AnswerOptionTestResult })

User.belongsToMany(Test, { through: UserTestResult, as: "testsPassed" })
Test.belongsToMany(User, { through: UserTestResult, as: "usersPassed" })
TestResult.hasMany(UserTestResult)
UserTestResult.belongsTo(TestResult, {foreignKey: "testResultId"})
