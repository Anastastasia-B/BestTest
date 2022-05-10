import React, {useState, useContext} from "react"
import {Container, Form, Button} from "react-bootstrap"
import { observer } from "mobx-react-lite"
import {useNavigate} from "react-router-dom"
import { useTranslation } from 'react-i18next'

import {Context} from '../index'
import { registration } from "../http/userAPI"
import { LOGIN_ROUTE, MAIN_PAGE_ROUTE } from "../utils/consts"

const Register = observer(() => {
  const {t} = useTranslation()
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    try {
      const data = await registration(email, password, name)
      user.setUser(data)
      user.setIsAuth(true)

      navigate(MAIN_PAGE_ROUTE)
      alert(t('auth.youRegistered'))
    } catch (e) {
      if (e.response && e.response.data) {    
        alert(t(e.response.data.message))
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
        <Form className="auth-form-container">
          <h3 className="text-center">{t('auth.signUp')}</h3>
          <div className="form-group">
              <label>{t('shared.name')}</label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder={t('shared.enterName')}
                value={name}
                onChange={e => setName(e.target.value)}
              />
          </div>
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
          <Button onClick={signUp} className="btn btn-primary btn-block my-2">{t('auth.signUp')}</Button>
          <p className="auth-addintional-section text-end">
            {t('auth.alreadyRegistered')}<a className="mx-1" href={LOGIN_ROUTE}>{t('auth.signIn?')}</a>
          </p>
        </Form>
    </Container>
  )
})

export default Register
