import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { Col, Row, Button } from "react-bootstrap"
import {Formik, Field, Form as FormikForm} from 'formik'
import {useNavigate} from "react-router-dom"

import { getOneTest } from "../http/testAPI"
import { getOneQuestion } from "../http/questionAPI"
import PageContainer from '../components/PageContainer'
import {TEST_RESULT_ROUTE} from "../utils/consts"

function TestPassingPage() {
  const {t} = useTranslation()
  const navigate = useNavigate()

  const [test, setTest] = useState(null)
  const [question, setQuestion] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const {id} = useParams()

  useEffect(() => {
    getOneTest(id).then(data => {
        setTest(data)
    })
  }, [id])

  const getResult = useCallback((score) => (
    test.testResults.find(result => {
      return result.fromScore >= score && score <= result.toScore
    })
  ), [test])

  useEffect(() => {
    if (!test) return

    if (currentQuestionIndex < test.questions.length) {
      getOneQuestion(test.questions[currentQuestionIndex].id).then(data => setQuestion(data))
    } else {
      const result = getResult(totalScore)

      navigate(TEST_RESULT_ROUTE + '/' + result.id)
    }
  }, [test, currentQuestionIndex, totalScore, navigate, getResult])

  if (!test || !question) return null

  const isLastQuestion = currentQuestionIndex >= test.questions.length - 1

  const giveAnswer = (id) => {
    const answer = findAnswer(id)

    if (answer.correct) {
      setTotalScore(totalScore + answer.score)
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const findAnswer = (id) => (
    question.answerOptions.find(answer => {
      return answer.id == id
    })
  )

  return (
    <PageContainer>
      <Row>
        <Col>
          <h3>{question.body}</h3>
          {question.pictureUrl && (
            <img
                className="test_front_image"
                alt={test.title}
                src={process.env.REACT_APP_API_URL + question.pictureUrl}
            />
          )}
        </Col>
      </Row>
      <Formik
        initialValues={{}}
        onSubmit={(values) => giveAnswer(values.answer)}
      >
        <FormikForm>
            {question.answerOptions.map((answer) => (
                <div key={answer.id}>
                    <label>
                        <Field
                            name='answer'
                            type="radio"
                            value={`${answer.id}`}
                        />
                        {answer.body}
                    </label>
                </div>
            ))}
            <Button type="submit">
                {isLastQuestion ? t('test.getResult') : t('test.nextQuestion')}
            </Button>
        </FormikForm>
      </Formik>
    </PageContainer>
  )
}

export default TestPassingPage
