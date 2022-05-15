import React, {useState, useContext} from "react"
import {Container, Form, Button} from "react-bootstrap"
import { observer } from "mobx-react-lite"
import {useNavigate} from "react-router-dom"
import { useTranslation } from 'react-i18next'

import {Context} from '../index'
import { login } from "../http/userAPI"
import { REGISTRATION_ROUTE, MAIN_PAGE_ROUTE } from "../utils/consts"
import flash from "../utils/flash"

const LogIn = observer(() => {
  const {t} = useTranslation()
  const {user, notification: notificationContext} = useContext(Context)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    try {
      const data = await login(email, password)
      user.setUser(data)
      user.setIsAuth(true)

      navigate(MAIN_PAGE_ROUTE)
    } catch (e) {
      if (e.response && e.response.data) {    
        flash.danger(t(e.response.data.message), notificationContext)
      }
      else {
        console.log(e)
      }
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Form className="auth-form-container login-container">
        <h3 className="text-center">{t('auth.signIn')}</h3>
        <div className="form-group">
            <label>{t('auth.email')}</label>
            <Form.Control
              type="email"
              className="form-control"
              placeholder={t('auth.enterEmail')}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>{t('auth.password')}</label>
            <Form.Control
              type="password"
              className="form-control"
              placeholder={t('auth.enterPassword')}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
        </div>
        <Button onClick={signIn} className="btn btn-primary btn-block my-2">{t('auth.signIn')}</Button>
        <p className="auth-addintional-section text-end">
          {t('auth.notRegistered')}<a className="mx-1" href={REGISTRATION_ROUTE}>{t('auth.signUp?')}</a>
        </p>
      </Form>
    </Container>
  )
})

export default LogIn
