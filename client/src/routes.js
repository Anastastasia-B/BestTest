import React from "react"
import TestPage from "./pages/TestPage"
import {TEST_ROUTE} from './utils/consts'

export const routes = [
    {
        path: TEST_ROUTE,
        component: <TestPage />,
    }
]

export const defaultRoute = {
    path: TEST_ROUTE,
    component: <TestPage />,
}
