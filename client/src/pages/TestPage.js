import React from "react"
import { useTranslation } from 'react-i18next'

import PageContainer from '../components/PageContainer'

function TestPage() {
  const {t} = useTranslation()

  return (
    <PageContainer children={(
      <h1>{t('shared.testPage')}</h1>
    )}/>
  )
}

export default TestPage
