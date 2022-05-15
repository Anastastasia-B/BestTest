import React, { useState, useEffect, useContext, Fragment } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { Button, Col, Row } from "react-bootstrap"

import {Context} from '../index'
import { getOneTest } from "../http/testAPI"
import PageContainer from '../components/PageContainer'
import ExpandableParagraph from '../components/ExpandableParagraph'
import {PROFILE_ROUTE, PASS_TEST_ROUTE, TEST_RESULT_ROUTE, LOGIN_ROUTE} from "../utils/consts"
import AverageRating from "../components/AverageRating"
import flash from "../utils/flash"

function TestPage() {
  const {t} = useTranslation()
  const [test, setTest] = useState(null)
  const {id} = useParams()
  const {user: currentUser, notification: notificationContext} = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
      getOneTest(id, currentUser?.user?.id).then(data => setTest(data))
  }, [id])

  if (!test) return null

  const questionsCount = test.questions.length
  const alreadyPassed = !!test.userResult

  const passTest = () => {
    if (!currentUser?.user?.id) {
      flash.notice(t('errors.needToSignIn'), notificationContext)
      navigate(LOGIN_ROUTE)
      return
    }

    navigate(PASS_TEST_ROUTE + `/${test.id}`)
  }

  const renderUserResultSection = () => {
    if (!alreadyPassed) return null

    const result = test.userResult

    const resultTitle = test.type === 'A'
      ? result.title + ` (${result.fromScore}-${result.toScore})`
      : result.title

    return (
      <Fragment>
        <div>
          <span className="result_text_sm">{t('test.result')}</span>
          <span className="result_heading_md">{resultTitle}</span>
        </div>
        <Button
          variant="outline-primary"
          size="md"
          className="result_text_md my-2"
          href={TEST_RESULT_ROUTE + '/' + result.id}
        >
          {t('test.viewResult')}
        </Button>
        <Button className="my-1" size="md" onClick={passTest}>{t('test.tryAgain')}</Button>
      </Fragment>
    )
  }

  return (
    <PageContainer>
      <Row>
        <Col>
          <h2>{test.title}</h2>
          <div className="test_author">
            <span>{t('test.writtenBy')}</span>
            <a href={PROFILE_ROUTE + `/${test?.user?.id}`}>{test?.user?.name}</a>
          </div>
          {test.frontPictureUrl &&
            <img className="test_front_image" alt={test.title} src={process.env.REACT_APP_API_URL + test.frontPictureUrl} />
          }
        </Col>
        <Col>
          <div className="test_summary_container">
            <div className="mb-3 mx-auto text-center">
              <h3 className="test_summary_title mb-0">{t('test.summary')}</h3>
              {alreadyPassed && <p className="result_text_xs mb-0">{t('test.alreadyPassed')}</p>}
            </div>
            <div className="test_summary my-auto">
              <p>{t('test.questionsCount') + questionsCount}</p>
              <AverageRating rating={test.averageRating} />
              <p>{t('test.usersPassedCount') + test.usersPassedCount}</p>
              {alreadyPassed
                ? renderUserResultSection()
                : <Button size="lg" className="my-3" onClick={passTest}>{t('test.start')}</Button>}
            </div>
          </div>
        </Col>
      </Row>
      {test.description && (
         <div className="test_description">
          <ExpandableParagraph text={test.description} maxLenght={500}></ExpandableParagraph>
        </div>
      )}
    </PageContainer>
  )
}

export default TestPage
