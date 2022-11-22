require('dotenv').config()
const sequelize = require('./db')

const {User, Test, Question, AnswerOption, TestResult, AnswerOptionTestResult} = require('./models/models')

const createTest1 = async () => {
    const test = await Test.create({
        userId: 1,
        title: 'Whow well do you know Harry Potter universe',
        type: 'A'
    })
    const question1 = await test.createQuestion({body: 'Which faculty does not exist?', pictureUrl: 'faculty.jpg'})
    const question2 = await test.createQuestion({body: 'Whose patronus is ...?', pictureUrl: 'patronus.jpg'})
    const question3 = await test.createQuestion({body: 'What is a ...?', pictureUrl: 'patronus.jpg'})
    const question4 = await test.createQuestion({body: 'Where was ...?', pictureUrl: 'patronus.jpg'})

    const answer11 = await question1.createAnswerOption({body: 'Ravenclaw'})
    const answer12 = await question1.createAnswerOption({body: 'Lonunghoff', correct: true, score: 2})
    const answer13 = await question1.createAnswerOption({body: 'Hufflepuff'})

    const answer21 = await question2.createAnswerOption({body: 'Harry Potter'})
    const answer22 = await question2.createAnswerOption({body: 'Hermione'})
    const answer23 = await question2.createAnswerOption({body: 'Dumbledore', correct: true, score: 5})

    const answer31 = await question3.createAnswerOption({body: 'A spell'})
    const answer32 = await question3.createAnswerOption({body: 'An animal', correct: true, score: 7})

    const answer41 = await question4.createAnswerOption({body: 'In 1', correct: true, score: 4})
    const answer42 = await question4.createAnswerOption({body: 'In 2'})
    const answer43 = await question4.createAnswerOption({body: 'In 3'})
    const answer44 = await question4.createAnswerOption({body: 'In 4'})

    const result1 = await test.createTestResult({title: 'Bad', body: 'You are bad', pictureUrl: 'faculty.jpg', fromScore: 0, toScore: 30})
    const result2 = await test.createTestResult({title: 'Medium', body: 'You are mid', pictureUrl: 'faculty.jpg', fromScore: 31, toScore: 60})
    const result3 = await test.createTestResult({title: 'Good', body: 'You are good', pictureUrl: 'faculty.jpg', fromScore: 61, toScore: 100})
}

const createTest2 = async () => {
    const test = await Test.create({
        userId: 1,
        title: 'Which Harry Potter universe character are u?',
        frontPictureUrl: 'download.jpeg',
        type: 'B'
    })
    const question1 = await test.createQuestion({body: 'Which faculty you like more?', pictureUrl: 'faculty.jpg'})
    const question2 = await test.createQuestion({body: 'Which animal you like most?', pictureUrl: 'patronus.jpg'})
    const question3 = await test.createQuestion({body: 'Where would you choose to live?', pictureUrl: 'patronus.jpg'})

    const answer11 = await question1.createAnswerOption({body: 'Ravenclaw'})
    const answer12 = await question1.createAnswerOption({body: 'Slytherin'})
    const answer13 = await question1.createAnswerOption({body: 'Hufflepuff'})
    const answer14 = await question1.createAnswerOption({body: 'Grifindor'})

    const answer21 = await question2.createAnswerOption({body: 'Rabbit'})
    const answer22 = await question2.createAnswerOption({body: 'Wolf'})
    const answer23 = await question2.createAnswerOption({body: 'Unicorn'})

    const answer31 = await question3.createAnswerOption({body: 'In a house in deep forest'})
    const answer32 = await question3.createAnswerOption({body: 'In a tower'})
    const answer33 = await question3.createAnswerOption({body: 'In a regular flat'})

    const result1 = await test.createTestResult({title: 'Hagrid'})
    const result2 = await test.createTestResult({title: 'Polumna Lavgood'})
    const result3 = await test.createTestResult({title: 'Ron'})
    const result4 = await test.createTestResult({title: 'Hermione'})

    await result1.addAnswerOptions([answer22, answer31], { through: { score: 3 }} )
    await result2.addAnswerOptions([answer11, answer21, answer23], { through: { score: 5 }} )
    await result3.addAnswerOptions([answer14, answer21], { through: { score: 3 }} )
    await result4.addAnswerOptions([answer14, answer22, answer33], { through: { score: 2 }} )
}

const start = async () => {
    try {
        await sequelize.authenticate()
        /** write your code here **/

        //await createTest1()
        // await createTest2()

        console.log(await Test.findOne({order: [ [ 'id', 'DESC' ]]}))

        console.log('------------Done------------')
    } catch (e) {
        console.log(e)
    }
}

start()
