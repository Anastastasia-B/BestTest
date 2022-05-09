import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { getOneTest } from "../http/testAPI"
import PageContainer from '../components/PageContainer'
import TestTypeAPassing from '../components/TestTypeAPassing'
import TestTypeBPassing from '../components/TestTypeBPassing'

function TestPassingPage() {
  const [test, setTest] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    getOneTest(id).then(data => {
        setTest(data)
    })
  }, [id])

  if (!test) return null

  return (
    <PageContainer>
      {test.type === 'B' ? <TestTypeBPassing test={test} /> : <TestTypeAPassing test={test} />}
    </PageContainer>
  )
}

export default TestPassingPage
