import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { Button } from "react-bootstrap"

import { getOneTestResult } from "../http/testResultAPI"
import PageContainer from '../components/PageContainer'
import ExpandableParagraph from '../components/ExpandableParagraph'
import {PASS_TEST_ROUTE} from "../utils/consts"

function TestPage() {
  const {t} = useTranslation()
  const [result, setResult] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    getOneTestResult(id).then(data => setResult(data))
  }, [id])

  if (!result) return null

  const title = result.test.type === 'A'
    ? result.title + ` (${result.fromScore}-${result.toScore})`
    : result.title

  return (
    <PageContainer>
      <span className="result_heading_sm">{t('test.yourResult')}</span>
      <h2>{title}</h2>
      {result.pictureUrl && (
        <img className="test_front_image" alt={result.title} src={process.env.REACT_APP_API_URL + result.pictureUrl} />
      )}
      {result.body && (
        <div className="test_description">
          <ExpandableParagraph text={result.body} maxLenght={500}></ExpandableParagraph>
        </div>
      )}
      <Button size="lg" className="my-3" href={PASS_TEST_ROUTE + `/${result.test.id}`}>{t('test.tryAgain')}</Button>
    </PageContainer>
  )
}

export default TestPage
