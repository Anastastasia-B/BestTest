import React, {useContext} from "react"
import { Context } from '../index'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import {useNavigate} from "react-router-dom"

import { REGISTRATION_ROUTE, TEST_ROUTE, LOGIN_ROUTE } from "../utils/consts"
import { observer } from "mobx-react-lite"

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const signOut = () => {
        localStorage.setItem('token', null)
        user.setUser({})
        user.setIsAuth(false)

        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href={TEST_ROUTE + '/:1'}>BestTest</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href={TEST_ROUTE + '/:1'}>Home</Nav.Link>
                </Nav>
                {user.isAuth ?
                    <Nav>
                        <Button onClick={signOut}>Sign Out</Button>
                    </Nav>
                    :
                    <Nav>
                        <Button href={LOGIN_ROUTE} className="mx-1">Sign In</Button>
                        <Button href={REGISTRATION_ROUTE}>Sign Up</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
})

export default NavBar
