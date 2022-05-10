import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { Button } from "react-bootstrap"

import { getOneTestResult } from "../http/testResultAPI"
import PageContainer from '../components/PageContainer'
import ExpandableParagraph from '../components/ExpandableParagraph'
import {PASS_TEST_ROUTE, TEST_ROUTE, MAIN_PAGE_ROUTE} from "../utils/consts"

function TestPage() {
  const navigate = useNavigate()
  const {t} = useTranslation()
  const [result, setResult] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    try {
      getOneTestResult(id).then(data => setResult(data))
    } catch (e) {
      console.log(e)

      navigate(MAIN_PAGE_ROUTE)
    }
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
      <div className="my-3 d-flex align-items-end">
        <Button size="lg" href={PASS_TEST_ROUTE + `/${result.test.id}`}>{t('test.tryAgain')}</Button>
        <a className="mx-4 mb-1 h5" href={`${TEST_ROUTE}/${result.test.id}`}>{t('test.goToTest')}</a>
      </div>
    </PageContainer>
  )
}

export default TestPage
