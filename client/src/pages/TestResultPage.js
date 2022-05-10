import React, { useState, useEffect, useContext, Fragment } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { Button } from "react-bootstrap"

import {Context} from '../index'
import { getOneTestResult } from "../http/testResultAPI"
import { setRate } from "../http/rateAPI"
import PageContainer from '../components/PageContainer'
import ExpandableParagraph from '../components/ExpandableParagraph'
import {PASS_TEST_ROUTE, TEST_ROUTE, MAIN_PAGE_ROUTE} from "../utils/consts"

function TestPage() {
  const navigate = useNavigate()
  const {t} = useTranslation()
  const [result, setResult] = useState(null)
  const {id} = useParams()
  const [testRate, setTestRate] = useState(null)
  const {user: currentUser} = useContext(Context)

  useEffect(() => {
    try {
      getOneTestResult(id).then(data => {
        setTestRate(data?.test?.rate)
        setResult(data)
      })
    } catch (e) {
      console.log(e)

      navigate(MAIN_PAGE_ROUTE)
    }
  }, [id])

  if (!result) return null

  const rateTest = (rate) => {
    setRate(result.test.id, rate).then(data => setTestRate(data))
  }

  const title = result.test.type === 'A'
    ? result.title + ` (${result.fromScore}-${result.toScore})`
    : result.title

  const renderRatingSection = () => {
    if (currentUser?.user?.id === result.test.userId)
      return null

    return (
      <div className="d-flex flex-column align-items-center justify-content-center me-5">
        {testRate
          ? <p className="rate_test_text">{t('test.wantToChangeRate')}</p>
          : (
            <Fragment>
              <p className="rate_test_text">{t('test.enjoyedTest')}</p>
              <p className="rate_test_text">{t('test.rateIt')}</p>
            </Fragment>
          )
        }
        <fieldset>
          <div className="rating_group">
            {[1, 2, 3, 4, 5].map((value) => (
              <input
                key={value}
                onClick={() => rateTest(value)}
                className="rating_star"
                type="radio"
                name="rating"
                value={`${value}`}
                defaultChecked={value == testRate}
              />
            ))}
          </div>
        </fieldset>
      </div>
    )
  }

  return (
    <PageContainer>
      <div className="d-flex flex-row justify-content-between">
        <div>
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
        </div>
        {renderRatingSection()}
      </div>
    </PageContainer>
  )
}

export default TestPage
