import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { Button, Col, Row } from "react-bootstrap"

import { getOneTest } from "../http/testAPI"
import PageContainer from '../components/PageContainer'
import ExpandableParagraph from '../components/ExpandableParagraph'
import testDefaultImg from '../assets/testDefaultImg.png'
import {PROFILE_ROUTE, PASS_TEST_ROUTE} from "../utils/consts"

function TestPage() {
  const {t} = useTranslation()
  const [test, setTest] = useState(null)
  const {id} = useParams()

  useEffect(() => {
      getOneTest(id).then(data => setTest(data))
  }, [id])

  if (!test) return null

  const avatarUrl = test.frontPictureUrl
    ? process.env.REACT_APP_API_URL + test.frontPictureUrl
    : testDefaultImg

  const questionsCount = test.questions.length

  return (
    <PageContainer>
      <Row>
        <Col>
          <h2>{test.title}</h2>
          <div className="test_author">
            <span>{t('test.writtenBy')}</span>
            <a href={PROFILE_ROUTE + `/${test?.user?.id}`}>{test?.user?.name}</a>
          </div>
          <img className="test_front_image" alt={test.title} src={avatarUrl} />
        </Col>
        <Col>
          <div className="test_summary_container">
            <h3 className="test_summary_title mx-auto">{t('test.summary')}</h3>
            <div className="test_summary my-auto">
              <p>{t('test.questionsCount') + questionsCount}</p>
              <p>{t('test.rate') + 0}</p>
              <p>{t('test.usersPassedCount') + 0}</p>
              <Button size="lg" className="my-3" href={PASS_TEST_ROUTE + `/${test.id}`}>{t('test.start')}</Button>
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
