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
    type: {type: DataTypes.STRING},
})

const Question = sequelize.define('question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    body: {type: DataTypes.STRING},
    pictureUrl: {type: DataTypes.STRING},
})

const AnswerOption = sequelize.define('answer_option', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    body: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING},
    correct: {type: DataTypes.BOOLEAN, defaultValue: false}, // type A field
    score: {type: DataTypes.INTEGER, defaultValue: 0}, // type A field
})

const TestResult = sequelize.define('test_result', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    body: {type: DataTypes.STRING},
    pictureUrl: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING},
    fromScore: {type: DataTypes.INTEGER, defaultValue: 0}, // type A field
    toScore: {type: DataTypes.INTEGER, defaultValue: 0}, // type A field
})

/** type B only (shows how many points would add an answer option to which test result) **/
const AnswerOptionTestResult = sequelize.define('answer_option_test_result', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    score: {type: DataTypes.INTEGER, defaultValue: 0},
})

module.exports = {
    User,
    Test,
    Question,
    AnswerOption,
    TestResult,
    AnswerOptionTestResult
}

User.hasMany(Test)
Test.belongsTo(User)

Test.hasMany(Question)
Question.belongsTo(Test)

Question.hasMany(AnswerOption)
AnswerOption.belongsTo(Question)

Test.hasMany(TestResult)
TestResult.belongsTo(Test)

/** type B only **/
AnswerOption.hasMany(AnswerOptionTestResult)
AnswerOptionTestResult.belongsTo(AnswerOption)
TestResult.hasMany(AnswerOptionTestResult)
AnswerOptionTestResult.belongsTo(TestResult)

User.belongsToMany(TestResult, {
  through: "user_test_result",
  as: "testResults",
  foreignKey: "user_id",
})
TestResult.belongsToMany(User, {
  through: "user_test_result",
  as: "users",
  foreignKey: "test_result_id",
})
