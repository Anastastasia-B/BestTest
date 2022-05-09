import React, { useState, useEffect, useCallback } from "react"
import {useNavigate} from "react-router-dom"

import TestPassingUI from './TestPassingUI'
import { getOneQuestion } from "../http/questionAPI"
import {TEST_RESULT_ROUTE} from "../utils/consts"

function TestTypeAPassing({test}) {
  const navigate = useNavigate()

  const [question, setQuestion] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  const getResult = useCallback((score) => (
    test.testResults.find(result => {
      return result.fromScore >= score && score <= result.toScore
    })
  ), [])

  useEffect(() => {
    if (currentQuestionIndex < test.questions.length) {
      getOneQuestion(test.questions[currentQuestionIndex].id).then(data => setQuestion(data))
    } else {
      const result = getResult(totalScore)

      navigate(TEST_RESULT_ROUTE + '/' + result.id)
    }
  }, [currentQuestionIndex, totalScore, navigate, getResult])

  if (!question) return null

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
    <TestPassingUI
      question={question}
      giveAnswer={giveAnswer}
      currentQuestionIndex={currentQuestionIndex}
      questionsCount={test.questions.length}
    />
  )
}

export default TestTypeAPassing
