import React, {Fragment} from "react"
import { useTranslation } from 'react-i18next'
import { Col, Row, Button } from "react-bootstrap"
import {Formik, Field, Form as FormikForm} from 'formik'
import ReactMarkdown from 'react-markdown'

function TestPassingUI({
    question,
    giveAnswer,
    currentQuestionIndex,
    questionsCount
}) {
  const {t} = useTranslation()
  const isLastQuestion = currentQuestionIndex >= questionsCount - 1

  return (
    <Fragment>
      <Row>
        <Col>
          <div className="mb-2">
            <h3 className="mb-0">{question.body}</h3>
            <ReactMarkdown className="px-1 current_question">
              {t('test.currentQuestion') + `${currentQuestionIndex} / ${questionsCount}`}
            </ReactMarkdown>
          </div>
          {question.pictureUrl && (
            <img
                className="test_front_image mb-2"
                alt={t('test.question')}
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
                <div key={answer.id} className="answer_field">
                    <label className=" d-flex flex-row align-items-center">
                        <Field
                            className="mx-2"
                            name='answer'
                            type="radio"
                            value={`${answer.id}`}
                        />
                        <ReactMarkdown>{answer.body}</ReactMarkdown>
                    </label>
                </div>
            ))}
            <Button type="submit" className="mt-2">
                {isLastQuestion ? t('test.getResult') : t('test.nextQuestion')}
            </Button>
        </FormikForm>
      </Formik>
    </Fragment>
  )
}

export default TestPassingUI
