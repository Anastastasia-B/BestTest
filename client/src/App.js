import { observer } from "mobx-react-lite"
import React, {useContext, useEffect, useState} from "react"
import {BrowserRouter} from 'react-router-dom'
import {Spinner} from "react-bootstrap"

import { Context } from "./index"
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"
import { check } from "./http/userAPI"

const App = observer(() => {
  const {user} = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    check().then((data) => {
      console.log('authenticated')
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="mt-2 mx-auto d-flex justify-content-center">
        <Spinner animation="border" variant="primary" size="lg"/>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
