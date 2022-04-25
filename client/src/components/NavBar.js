import React, {useContext} from "react"
import { Context } from '../index'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import NavDropdown from "react-bootstrap/NavDropdown"
import Button from "react-bootstrap/Button"
import {useNavigate} from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useTranslation } from 'react-i18next'

import {
    REGISTRATION_ROUTE,
    TEST_ROUTE, LOGIN_ROUTE,
    PROFILE_ROUTE,
    EDIT_PROFILE_ROUTE
} from "../utils/consts"

const NavBar = observer(() => {
    const {user: currentUser} = useContext(Context)
    const navigate = useNavigate()
    const {t} = useTranslation()

    const signOut = () => {
        localStorage.setItem('token', null)
        currentUser.setUser({})
        currentUser.setIsAuth(false)

        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container className="content-width">
                <Navbar.Brand href={TEST_ROUTE + '/1'}>{'BestTest'}</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href={TEST_ROUTE + '/1'}>{t('nav.home')}</Nav.Link>
                </Nav>
                {currentUser.isAuth ?
                    <Nav>
                        <NavDropdown className="nav-dropdown" title="My Profile" id="nav-dropdown">
                            <NavDropdown.Item href={PROFILE_ROUTE + `/${currentUser.user?.id}`}>{t('shared.viewProfile')}</NavDropdown.Item>
                            <NavDropdown.Item href={EDIT_PROFILE_ROUTE}>{t('shared.editProfile')}</NavDropdown.Item>
                            <NavDropdown.Item href="/">{t('nav.accountSettings')}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={signOut}>{t('nav.signOut')}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    :
                    <Nav>
                        <Button href={LOGIN_ROUTE} className="mx-1">{t('auth.signIn')}</Button>
                        <Button href={REGISTRATION_ROUTE}>{t('auth.signUp')}</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
})

export default NavBar
