import React from "react"
import LogIn from "./pages/LogIn"
import TestPage from "./pages/TestPage"
import Register from "./pages/Register"
import {TEST_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from './utils/consts'

export const publicRoutes = [
    {
        path: TEST_ROUTE + '/:id',
        component: <TestPage />,
    },
    {
        path: LOGIN_ROUTE,
        component: <LogIn />,
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Register />,
    }
]

export const authRoutes = []

export const defaultRoute = {
    path: TEST_ROUTE + '/:id',
    component: <TestPage />,
}
