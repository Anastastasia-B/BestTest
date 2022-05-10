import React from "react"
import LogIn from "./pages/LogIn"
import TestPage from "./pages/TestPage"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import TestPassingPage from "./pages/TestPassingPage"
import TestResultPage from "./pages/TestResultPage"
import MainPage from "./pages/MainPage"
import {
    TEST_ROUTE,
    PASS_TEST_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    PROFILE_ROUTE,
    EDIT_PROFILE_ROUTE,
    TEST_RESULT_ROUTE,
    MAIN_PAGE_ROUTE
} from './utils/consts'

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
    },
    {
        path: MAIN_PAGE_ROUTE,
        component: <MainPage />,
    }
]

export const authRoutes = [
    {
        path: PROFILE_ROUTE + '/:id',
        component: <Profile />,
    },
    {
        path: EDIT_PROFILE_ROUTE,
        component: <EditProfile />,
    },
    {
        path: PASS_TEST_ROUTE + '/:id',
        component: <TestPassingPage />,
    },
    {
        path: TEST_RESULT_ROUTE + '/:id',
        component: <TestResultPage />,
    }
]

export const defaultRoute = {
    path: MAIN_PAGE_ROUTE,
    component: <MainPage />,
}
