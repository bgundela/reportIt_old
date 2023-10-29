import React from 'react'
import { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { CityContext } from '../context/CityContext'

const LoginPage = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { Username, setUsername } = useContext(UserContext);
    const { City, setCity } = useContext(CityContext)

    const login = async (e) => {
        e.preventDefault()

        if (name !== '' || password !== '') {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                body: JSON.stringify({ 'username': name, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            if (response.ok) {
                response.json().then(userInfo => {
                    setUsername(name)
                    window.sessionStorage.setItem('username', name)
                    findCity(name)
                    setRedirect(true)
                })
            } else {
                alert('Login failed. Please try again. If isssue persists, contact support.')
            }

        } else {
            alert('All fields are required.')
        }
    }

    const findCity = async (username) => {
        const response = await fetch('http://localhost:4000/users/city', {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if (response.ok) {
            response.json().then(city => {
                setCity(city)
                window.sessionStorage.setItem('city', city)
            })
        } else {
            alert('Login failed. Please try again. If isssue persists, contact support.')
        }
    }

    if (redirect || Username !== '' && City !== '') {
        return (
            <Navigate to='/viewPosts' />
        )
    }

    return (
        <form onSubmit={(e) => login(e)}>
            <h1 className='white bold-font login'>Login</h1>

            <div className='login-form'>
                <div className='username username-text'>
                    <h3 className='white light-font small-size'>Enter your <span className='green'>username...</span></h3>
                </div>
                <div className='username'>
                    <input className='cred-box' value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>


                <div className='password password-text'>
                    <h3 className='white light-font small-size'>Enter your <span className='green'>password...</span></h3>
                </div>
                <div className='password'>
                    <input className='cred-box' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>

                <Link to='/register' className='register-link'>
                    <h3 className='white light-font small-size'>Don't have an account? <span className='green'>Register here!</span></h3>
                </Link>

                <div id='btn-padding'>
                    <button className='btn bold-font' type='submit'>Go!</button>
                </div>
            </div>

        </form>
    )
}

export default LoginPage