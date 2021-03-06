import React, { useState, useEffect, useCallback, useContext } from "react"
import {useNavigate} from "react-router-dom"

import TestPassingUI from './TestPassingUI'
import { Context } from '../index'
import { getOneQuestion } from "../http/questionAPI"
import { finishTest } from "../http/testAPI"
import {TEST_RESULT_ROUTE} from "../utils/consts"

function TestTypeBPassing({test}) {
  const {user: currentUser} = useContext(Context)
  const navigate = useNavigate()

  const [question, setQuestion] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const getResult = useCallback(() => (
    test.testResults.sort((result1, result2) => {
      if (result2.tempScore < result1.tempScore) return -1
      if (result2.tempScore > result1.tempScore) return 1

      return 0
    })[0]
  ), [test.testResults])

  useEffect(() => {
    if (currentQuestionIndex < test.questions.length) {
      getOneQuestion(test.questions[currentQuestionIndex].id).then(data => setQuestion(data))
    } else {
      const result = getResult()

      finishTest({testId: test.id, testResultId: result.id, userId: currentUser.user.id}).then((data) => {
        navigate(TEST_RESULT_ROUTE + '/' + data.testResultId)
      })
    }
  }, [currentQuestionIndex, navigate, getResult, test.questions])

  useEffect(() => {
    test.testResults.forEach(testResult => {
      testResult.tempScore = 0
    })
  }, [])

  if (!question) return null

  const giveAnswer = (id) => {
    const answer = findAnswer(id)

    answer.testResults.forEach(testResult => {
      const result = findTestResult(testResult.id)
      result.tempScore += testResult.answerOptionTestResult.score
    })

    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const findAnswer = (id) => (
    question.answerOptions.find(answer => {
      return answer.id == id
    })
  )

  const findTestResult = (id) => (
    test.testResults.find(result => {
      return result.id === id
    })
  )

  return (
    <TestPassingUI
      question={question}
      giveAnswer={giveAnswer}
      currentQuestionIndex={currentQuestionIndex}
      questionsCount={test.questions.length}
    />
  )
}

export default TestTypeBPassing
