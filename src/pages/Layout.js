import React from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation()

    if (location.pathname === '/') {
        return (
            <main>
                <Header page={'Reporting'} />
                <Outlet />
            </main>
        )
    } else if (location.pathname === '/viewPosts') {
        return (
            <main>
                <Header page={'Viewing'} />
                <Outlet />
            </main>
        )
    } else {
        return (
            <main>
                <Header page={''} />
                <Outlet />
            </main>
        )
    }


}

export default Layout