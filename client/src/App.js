import { observer } from "mobx-react-lite"
import React, {Suspense, useContext, useEffect, useState} from "react"
import {BrowserRouter} from 'react-router-dom'

import { Context } from "./index"
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"
import Preload from "./components/Preload"
import FlashNotification from "./components/FlashNotification"
import { check } from "./http/userAPI"

const App = observer(() => {
  const {user, notification} = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    check().then((data) => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setIsLoading(false))
  }, [])

  const flashNotification = notification.notification

  if (isLoading) {
    return <Preload />
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Preload />}>
        {flashNotification && <FlashNotification notification={flashNotification} />}
        <NavBar/>
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  )
})

export default App
