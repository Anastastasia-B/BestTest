import React, {useState, useContext} from "react"
import {Container, Form, Button} from "react-bootstrap"
import { observer } from "mobx-react-lite"
import {useNavigate} from "react-router-dom"

import {Context} from '../index'
import { registration } from "../http/userAPI"
import { LOGIN_ROUTE, TEST_ROUTE } from "../utils/consts"

const Register = observer(() => {
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

        navigate(TEST_ROUTE + '/:1') // заменить на путь к главной странице после её создания
        alert('You registered. Congradulations!')
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
        <Form className="auth-form-container">
            <h3 className="text-center">Sign Up</h3>
            <div className="form-group">
                <label>Name</label>
                <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
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
            <Button onClick={signUp} className="btn btn-primary btn-block my-2">Sign Up</Button>
            <p className="auth-addintional-section text-end">
                Already registered <a href={LOGIN_ROUTE}>sign in?</a>
            </p>
        </Form>
    </Container>
  )
})

export default Register
