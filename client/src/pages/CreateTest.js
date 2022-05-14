import React, { useState, useContext, Fragment } from "react"
import {Button, Row, Col, Form} from "react-bootstrap"
import {Formik, Field, Form as FormikForm, ErrorMessage} from 'formik'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { nanoid } from 'nanoid'
import {useNavigate} from "react-router-dom"

import { createTest as createTestRequest } from "../http/testAPI"
import {Context} from '../index'
import PageContainer from '../components/PageContainer'
import accessibleOnClickProps from "../utils/accessibleOnClickProps"
import flash from "../utils/flash"
import { TEST_ROUTE } from "../utils/consts"

function CreateTest() {
    const {t} = useTranslation()
    const {notification: notificationContext} = useContext(Context)
    const navigate = useNavigate()

    const defaultAnswers = Array.from(Array(3))

    const [frontImageUrl, setFrontImageUrl] = useState(null)
    const [frontImage, setFrontImage] = useState(null)

    const [questionImageUrl, setQuestionImageUrl] = useState(null)
    const [questions, setQuestions] = useState([])
    const [editedQuestion, setEditedQuestion] = useState(null)

    const [answers, setAnswers] = useState(defaultAnswers)

    const [resultImageUrl, setResultImageUrl] = useState(null)
    const [results, setResults] = useState([])
    const [editedResult, setEditedResult] = useState(null)

    const createTest = async (values) => {
        const testData = values
        testData.questions = excludeTempId(questions)
        testData.results = excludeTempId(results)

        const formData = new FormData()
        formData.append('test', JSON.stringify(testData))
        formData.append('frontPicture', frontImage)

        testData.questions.forEach((q, i) => {
            if (q.image)
                formData.append(`questionImage${i}`, q.image)
        })

        testData.results.forEach((r, i) => {
            if (r.image)
                formData.append(`resultImage${i}`, r.image)
        })

        try {
            const test = await createTestRequest(formData)

            if (test.id)
                flash.notice(t('test.testCreated'), notificationContext)

            navigate(TEST_ROUTE + '/' + test.id)
        } catch (e) {
          if (e.response && e.response.data) {    
            flash.danger(t(e.response.data.message), notificationContext)
          }
          else {
            console.log(e)
          }
        }
    }

    const excludeTempId = (collection) => {
        return collection.map((obj) => (
            Object.keys(obj).reduce((acc, key) => {
                if (key !== 'tempId') {
                    acc[key] = obj[key]
                }
                return acc
            }, {})
        ))
    }

    const frontImageChangeHandler = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setFrontImage(e.target.files[0])

            const reader = new FileReader()
            reader.onload = function (e) {
                setFrontImageUrl(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const questionImageChangeHandler = async (e) => {
        if (e.target.files && e.target.files[0]) {
            editedQuestion.image = e.target.files[0]

            const reader = new FileReader()
            reader.onload = function (e) {
                setQuestionImageUrl(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
            e.target.value = ''
        }
    }

    const resultImageChangeHandler = async (e) => {
        if (e.target.files && e.target.files[0]) {
            editedResult.image = e.target.files[0]

            const reader = new FileReader()
            reader.onload = function (e) {
                setResultImageUrl(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
            e.target.value = ''
        }
    }

    const renderSectionTitle = (title) => (
        <div className="mb-3">
            <p className="section_title">{title}</p>
            <hr className="mt-0"/>
        </div>
    )

    const renderTestForm = ({isSubmitting}) => (
        <FormikForm className="my-4">
            {renderSectionTitle(t('test.generalInfo'))}
            <Row className="mb-3">
                {frontImageUrl && (
                    <Col>
                        <img className="test_front_image" src={frontImageUrl} />
                    </Col>
                )}
                <Col>
                    <Form.Label className="h5">{t('test.uploadFrontPicture')}</Form.Label>
                    <label className="d-block">
                        <div className="btn btn-primary">
                            <div className="choose_file_text">
                                <input
                                    className="hidden-input-file"
                                    type="file"
                                    accept="image"
                                    onChange={frontImageChangeHandler}
                                    autoComplete="off"
                                />
                                {t('profile.chooseFile')}
                            </div>
                        </div>
                    </label>
                </Col>
            </Row>
            <Form.Group className="profile-form-group">
                <Form.Label className="edit-profile-field-label">{t('test.title')}</Form.Label>
                <Field className="form-control" name="title" placeholder={t('test.enterTitle')} />
                <ErrorMessage className="field-error" name="title" component="div" />
            </Form.Group>
            <Form.Group className="profile-form-group">
                <Form.Label className="edit-profile-field-label">{t('test.description')}</Form.Label>
                <Field
                    className="form-control" 
                    name="description"
                    placeholder={t('test.enterDescription')}
                    as="textarea"
                    rows="5"
                    maxLength ="5000"
                />
            </Form.Group>
            <div className="my-3">
                {renderSectionTitle(t('test.questions'))}
                {renderQuestions()}
                {questions.length > 0 && <p>{t('test.editQuestionTip')}</p>}
                <Field type="hidden" name="questions" />
                <ErrorMessage className="field-error" name="questions" component="div" />
                <Button
                    className="mt-2"
                    disabled={isSubmitting}
                    variant="primary"
                    onClick={() => setEditedQuestion({})}
                >
                    {t('test.newQuestion')}
                </Button>
            </div>
            <div className="my-4">
                {renderSectionTitle(t('test.results'))}
                {renderResults()}
                <Field type="hidden" name="results" />
                <ErrorMessage className="field-error" name="results" component="div" />
                <Button
                    className="mt-2"
                    disabled={isSubmitting}
                    variant="primary"
                    onClick={() => setEditedResult({})}
                >
                    {t('test.newResult')}
                </Button>
            </div>
            <hr className="mb-0"/>
            <div>
                <Button
                    disabled={isSubmitting}
                    className="btn-lg mt-2"
                    variant="primary"
                    type="submit"
                >
                    {t('test.createButton')}
                </Button>
            </div>
        </FormikForm>
    )

    const renderResults = () => {
        if (results.length < 1)
            return <p>{t('test.noResults')}</p>

        return (
            <ul className="no_list_style px-2">
                {results.map(result => (
                    <div key={result.tempId} className="result_card d-flex flex-row">
                        <li className="me-2">
                            <span>{result.title}</span>
                            <span className="mx-2">{`(${result.fromScore} - ${result.toScore})`}</span>
                        </li>
                        <Button {...accessibleOnClickProps(() => setEditedResult(result))}>{t('shared.edit')}</Button>
                    </div>
                ))}
            </ul>
        )
    }

    const renderResultEditor = () => {
        const newResult = !editedResult.title

        if (editedResult.image) {
            const reader = new FileReader()
            reader.onload = function (e) {
                setResultImageUrl(e.target.result)
            }
            reader.readAsDataURL(editedResult.image)
        }

        return (
            <Formik
                onSubmit={newResult ? addResult : updateResult}
                initialValues={{
                    title: editedResult.title || '',
                    body: editedResult.body || '',
                    fromScore: editedResult.fromScore,
                    toScore: editedResult.toScore,
                }}
                validate={(values) => {
                    const errors = {}

                    if (!values.title)
                        errors.title = t('errors.fieldRequired')
                    
                    if (!values.fromScore)
                        errors.fromScore = t('errors.fieldRequired')
                    
                    if (!values.toScore)
                        errors.toScore = t('errors.fieldRequired')
                    else if (values.toScore <= values.fromScore)
                     errors.toScore = t('errors.toScoreLessThanFromScore')            

                    return errors
                }}
            >
                {renderResultForm()}
            </Formik>
        )
    }

    const closeResultEditor = () => {
        setResultImageUrl(null)
        setEditedResult(null)
    }

    const updateResult = (values) => {
        const updatedResults = results.map((result) => {
            if (result.tempId === editedResult.tempId)
                return {...values, tempId: result.tempId, image: editedResult.image}
            else
                return result
        })

        setResults(updatedResults)
        closeResultEditor()
    }

    const addResult = (values) => {
        setResults([...results, {...values, tempId: nanoid(), image: editedResult.image}])
        closeResultEditor()
    }

    const renderResultForm = () => (
        <Fragment>
            <div className="editor_background" />
            <FormikForm className="my-2 question_editor">
                <button onClick={closeResultEditor} className="closeBotton">{'✕'}</button>
                {editedResult.title
                    ? renderSectionTitle(t('test.editResult'))
                    : renderSectionTitle(t('test.newResult'))
                }
                <Row className="mb-3 mt-2">
                    {editedResult.image && (
                        <Col>
                            <img className="test_front_image" src={resultImageUrl} />
                        </Col>
                    )}
                    <Col>
                        <Form.Label className="h5">{t('result.uploadPicture')}</Form.Label>
                        <label className="d-block">
                            <div className="btn btn-primary">
                                <div className="choose_file_text">
                                    <input
                                        className="hidden-input-file"
                                        type="file"
                                        accept="image"
                                        onChange={resultImageChangeHandler}
                                        autoComplete="off"
                                    />
                                    {t('profile.chooseFile')}
                                </div>
                            </div>
                        </label>
                    </Col>
                </Row>
                <Form.Group className="profile-form-group">
                    <Form.Label className="edit-profile-field-label">{t('result.title')}</Form.Label>
                    <Field className="form-control" name={`title`} placeholder={t('result.enterTitle')} />
                    <ErrorMessage className="field-error" name={`title`} component="div" />
                </Form.Group>
                <Form.Group className="profile-form-group">
                    <Form.Label className="edit-profile-field-label">{t('result.body')}</Form.Label>
                    <Field className="form-control" name={`body`} placeholder={t('result.enterBody')} />
                    <ErrorMessage className="field-error" name={`body`} component="div" />
                </Form.Group>
                <Form.Group className="profile-form-group">
                    <Form.Label className="edit-profile-field-label">{t('result.fromScore')}</Form.Label>
                    <Field type="number" className="form-control" name={`fromScore`} placeholder={t('result.enterFromScore')} />
                    <ErrorMessage className="field-error" name={`fromScore`} component="div" />
                </Form.Group>
                <Form.Group className="profile-form-group">
                    <Form.Label className="edit-profile-field-label">{t('result.toScore')}</Form.Label>
                    <Field type="number" className="form-control" name={`toScore`} placeholder={t('result.enterToScore')} />
                    <ErrorMessage className="field-error" name={`toScore`} component="div" />
                </Form.Group>
                <Button
                    className="px-3"
                    variant="primary"
                    type="submit"
                >
                    {t('shared.save')}
                </Button>
            </FormikForm>
        </Fragment>
    )

    const handleOnDragEnd = (result) => {
        if (!result.destination) return

        const items = Array.from(questions)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setQuestions(items)
    }

    const maxTestScore = () => {
        var sum = 0
        questions.forEach((question) => {
            sum += question.score
        })

        return sum
    }

    const renderQuestions = () => (
        <div className="d-flex flex-row">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="questions">
                    {(provided) => (
                        <ul className="questions_area no_list_style" {...provided.droppableProps} ref={provided.innerRef}>
                            {questions.map((question, index) => {
                                return (
                                    <Draggable key={question.tempId} draggableId={question.tempId} index={index}>
                                        {(provided) => (
                                            <li
                                                className="question_card"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                {...accessibleOnClickProps(() => setEditedQuestion(question))}
                                            >
                                                {question.body}
                                            </li>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="p-4 text-center">
                <span>{t('test.maxPossibleScore')}</span>
                <span>{maxTestScore()}</span>
            </div>
        </div>
    )

    const closeQuestionEditor = () => {
        setAnswers(defaultAnswers)
        setQuestionImageUrl(null)
        setEditedQuestion(null)
    }

    const addQuestion = (values) => {
        setQuestions([...questions, {...values, tempId: nanoid(), image: editedQuestion.image}])
        closeQuestionEditor()
    }

    const updateQuestion = (values) => {
        const updatedQuestions = questions.map((question) => {
            if (question.tempId === editedQuestion.tempId)
                return {...values, tempId: question.tempId, image: editedQuestion.image}
            else
                return question
        })

        setQuestions(updatedQuestions)
        closeQuestionEditor()
    }

    const renderQuestionEditor = () => {
        const newQuestion = !editedQuestion.body

        if (editedQuestion.image) {
            const reader = new FileReader()
            reader.onload = function (e) {
                setQuestionImageUrl(e.target.result)
            }
            reader.readAsDataURL(editedQuestion.image)
        }

       /* if (editedQuestion?.answers?.length > 0)
            setAnswers(editedQuestion.answers)*/

        return (
            <Formik
                onSubmit={newQuestion ? addQuestion : updateQuestion}
                initialValues={{
                    body: editedQuestion.body || '',
                    answers: editedQuestion.answers || answers,
                    score: editedQuestion.score
                }}
                validate={(values) => {
                    const errors = {}

                    if (!values.body)
                        errors.body = t('errors.fieldRequired')

                    if (!values.score)
                        errors.score = t('errors.fieldRequired')

                    return errors
                }}
            >
                {renderQuestionForm()}
            </Formik>
        )
    }

    const removeAnswer = (index) => {
        const items = Array.from(answers)
        items.splice(index, 1)
        setAnswers(items)
    }

    const addAnswer = () => {
        setAnswers([...answers, {}])
    }

    const renderQuestionForm = () => (
        <Fragment>
            <div className="editor_background" />
            <FormikForm className="my-2 question_editor">
                <button onClick={closeQuestionEditor} className="closeBotton">{'✕'}</button>
                {editedQuestion.body
                    ? renderSectionTitle(t('test.editQuestion'))
                    : renderSectionTitle(t('test.newQuestion'))
                }
                <Row className="mb-3 mt-2">
                    {editedQuestion.image && (
                        <Col>
                            <img className="test_front_image" src={questionImageUrl} />
                        </Col>
                    )}
                    <Col>
                        <Form.Label className="h5">{t('question.uploadPicture')}</Form.Label>
                        <label className="d-block">
                            <div className="btn btn-primary">
                                <div className="choose_file_text">
                                    <input
                                        className="hidden-input-file"
                                        type="file"
                                        accept="image"
                                        onChange={questionImageChangeHandler}
                                        autoComplete="off"
                                    />
                                    {t('profile.chooseFile')}
                                </div>
                            </div>
                        </label>
                    </Col>
                </Row>
                <Form.Group className="profile-form-group">
                    <Form.Label className="edit-profile-field-label">{t('question.body')}</Form.Label>
                    <Field className="form-control" name={`body`} placeholder={t('question.enterBody')} />
                    <ErrorMessage className="field-error" name={`body`} component="div" />
                </Form.Group>
                <Form.Group className="profile-form-group">
                    <Form.Label className="edit-profile-field-label">{t('question.score')}</Form.Label>
                    <Field type="number" className="form-control" name={`score`} placeholder={t('question.enterScore')} />
                    <ErrorMessage className="field-error" name={`score`} component="div" />
                </Form.Group>
                <Form.Group className="profile-form-group">
                    <Form.Label className="edit-profile-field-label">{t('question.answers')}</Form.Label>
                    {answers.map((answer, i) => (
                        <div key={i} className="d-flex flex-row align-items-center">
                            <Field className="me-1" type="checkbox" name={`answers[${i}].correct`} />
                            <Field className="form-control my-1 me-1" name={`answers[${i}].body`} placeholder={t('question.answer')} />
                            <Button className="w-2" onClick={() => removeAnswer(i)}>{'-'}</Button>
                        </div>
                    ))}
                    <p>{t('question.answersTip')}</p>
                    <Button
                        className="px-3 mt-1"
                        variant="primary"
                        onClick={addAnswer}
                    >
                        {t('question.addAnswer')}
                    </Button>
                </Form.Group>
                <Button
                    className="px-3"
                    variant="primary"
                    type="submit"
                >
                    {t('shared.save')}
                </Button>
            </FormikForm>
        </Fragment>
    )

    const validteResultsScoreRange = () => {
        var sum = 0
        results.forEach((result) => {
            sum += result.toScore - result.fromScore
        })

        return sum >= maxTestScore()
    }

    return (
        <PageContainer>
            <h2>{t('test.create')}</h2>
            <Formik
                onSubmit={createTest}
                initialValues={{title: '', description: '', questions: '', results: ''}}
                validate={(values) => {
                    const errors = {}

                    if (!values.title)
                        errors.title = t('errors.fieldRequired')

                    if (questions.length < 1)
                        errors.questions = t('errors.questionsRequired')

                    if (results.length < 1)
                        errors.results = t('errors.resultsRequired')
                    else if(!validteResultsScoreRange())
                        errors.results = t('errors.invalidScoreRange')

                    return errors
                }}
            >
                {renderTestForm}
            </Formik>
            {editedQuestion && renderQuestionEditor(editedQuestion)}
            {editedResult && renderResultEditor(editedResult)}
        </PageContainer>
    )
}

export default CreateTest
