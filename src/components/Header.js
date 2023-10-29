import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '@heroicons/react/24/solid'
import { Divider } from '@mui/material'
import { UserContext } from '../context/UserContext'
import { CityContext } from '../context/CityContext'


const Header = (props) => {
    const { Username, setUsername } = useContext(UserContext);
    const { City, setCity } = useContext(CityContext)

    const logout = (e) => {
        e.preventDefault()
        setUsername('')
        setCity('')
        window.sessionStorage.setItem('username', '')
        window.sessionStorage.setItem('city', '')
    }


    return (
        <div>
            <header className='header'>
                <Link to='/' className='logo'>
                    <h2 className='light-font white'>report</h2>
                    <h1 className='bold-font green'>It!</h1>
                </Link>

                {props.page === 'Reporting' && (
                    <Link to='/login' className='login-navBar'>
                        <div className='login-button'>
                            <h2 className='light-font white'>city</h2>
                            <h1 className='regular-font green login-size'>Login</h1>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 profile-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </Link>
                )}

                {props.page === 'Viewing' && (
                    <div className='login-navBar'>
                        <button className='logout bold-font green login-size' onClick={(e) => logout(e)}>
                            <Link to='/'>
                                <p>logout</p>
                            </Link>
                        </button>
                        <button className='logout'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 profile-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                )}
            </header>

            <Divider className='divider' />
        </div>
    )
}

export default Header