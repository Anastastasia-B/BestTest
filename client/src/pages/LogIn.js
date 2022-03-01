import React, {useState, useContext} from "react"
import {Container, Form, Button} from "react-bootstrap"
import { observer } from "mobx-react-lite"
import {useNavigate} from "react-router-dom"

import {Context} from '../index'
import { login } from "../http/userAPI"
import { REGISTRATION_ROUTE, TEST_ROUTE } from "../utils/consts"

const LogIn = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    try {
      const data = await login(email, password)
      user.setUser(data)
      user.setIsAuth(true)

      navigate(TEST_ROUTE + '/:1') // заменить на путь к главной странице после её создания
    } catch (e) {
      if (e.response && e.response.data) {    
        alert(e.response.data.message)
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
        <h3 className="text-center"> Sign In</h3>
        <div className="form-group">
            <label>Email address</label>
            <Form.Control
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Password</label>
            <Form.Control
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
        </div>
        <Button onClick={signIn} className="btn btn-primary btn-block my-2">Sign In</Button>
        <p className="auth-addintional-section text-end">
            Not registered <a href={REGISTRATION_ROUTE}>sign up?</a>
        </p>
      </Form>
    </Container>
  )
})

export default LogIn
