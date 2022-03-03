import React, {useContext} from "react"
import { Context } from '../index'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import NavDropdown from "react-bootstrap/NavDropdown"
import Button from "react-bootstrap/Button"
import {useNavigate} from "react-router-dom"
import { observer } from "mobx-react-lite"

import {
    REGISTRATION_ROUTE,
    TEST_ROUTE, LOGIN_ROUTE,
    PROFILE_ROUTE,
    EDIT_PROFILE_ROUTE
} from "../utils/consts"

const NavBar = observer(() => {
    const {user: currentUser} = useContext(Context)
    const navigate = useNavigate()

    const signOut = () => {
        localStorage.setItem('token', null)
        currentUser.setUser({})
        currentUser.setIsAuth(false)

        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href={TEST_ROUTE + '/1'}>BestTest</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href={TEST_ROUTE + '/1'}>Home</Nav.Link>
                </Nav>
                {currentUser.isAuth ?
                    <Nav>
                        <NavDropdown className="nav-dropdown" title="My Profile" id="nav-dropdown">
                            <NavDropdown.Item href={PROFILE_ROUTE + `/${currentUser.user?.id}`}>View Profile</NavDropdown.Item>
                            <NavDropdown.Item href={EDIT_PROFILE_ROUTE}>Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/">Account Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
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
