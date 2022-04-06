import React, {useContext} from "react"
import {Routes, Route} from 'react-router-dom'
import {authRoutes, publicRoutes, defaultRoute} from '../routes'
import {Context} from '../index'

function AppRouter() {
  const {user} = useContext(Context)

  return (
    <Routes>
        {user.isAuth && authRoutes.map(({path, component}) =>
            <Route key={path} path={path} element={component} />
        )}
        {publicRoutes.map(({path, component}) =>
            <Route key={path} path={path} element={component} />
        )}
        <Route key={defaultRoute.path} path={defaultRoute.path} element={defaultRoute.component} />
    </Routes>
  )
}

export default AppRouter
