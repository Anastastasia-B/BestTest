import React from "react"
import {Routes, Route} from 'react-router-dom'
import {routes, defaultRoute} from '../routes'

function AppRouter() {
  return (
    <Routes>
        {routes.map(({path, component}) =>
            <Route key={path} path={path} element={component} />
        )}
        <Route key={defaultRoute.path} path={defaultRoute.path} element={defaultRoute.component} />
    </Routes>
  )
}

export default AppRouter
