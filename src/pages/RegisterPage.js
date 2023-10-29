import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { CityContext } from '../context/CityContext'

const RegisterPage = () => {
    const [city, setRegisterCity] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { Username, setUsername } = useContext(UserContext);
    const { City, setCity } = useContext(CityContext)

    const register = async (e) => {
        e.preventDefault()


        if (name !== '' && password !== '' && repassword !== '' && city !== '') {
            if (password === repassword) {
                if (city === '000001') {
                    const response = await fetch('http://localhost:4000/users/register', {
                        method: 'POST',
                        body: JSON.stringify({ 'username': name, password, city: 'Shakopee' }),
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include'
                    })

                    if (response.ok) {
                        response.json().then(userInfo => {
                            setUsername(name)
                            window.sessionStorage.setItem('username', name)
                            if (city === '000001') {
                                setCity('Shakopee')
                                window.sessionStorage.setItem('city', 'Shakopee')
                            }
                            setRedirect(true)

                        })
                    } else {
                        alert('Registration failed. You may already have an account. Please try again. If isssue persists, contact support.')
                    }
                } else {
                    alert('You are not authorized to create an account')
                    setCity('')
                }
            } else {
                alert('Passwords must match')
                setRepassword('')
            }
        } else {
            alert('All fields are required.')
        }


    }

    if (redirect) {
        return (
            <Navigate to='/viewPosts' />
        )
    }
    return (
        <form onSubmit={(e) => register(e)}>
            <h1 className='white bold-font register'>Register</h1>

            <div className='register-form'>

                <div className='username username-register-text'>
                    <h3 className='white light-font small-size'>Enter your six digit city <span className='green'>code...</span></h3>
                </div>
                <div className='city city-register-text'>
                    <input className='city-box' value={city} onChange={(e) => setRegisterCity(e.target.value)}></input>
                </div>

                <div className='username username-register-text'>
                    <h3 className='white light-font small-size'>Enter your <span className='green'>username...</span></h3>
                </div>
                <div className='username'>
                    <input className='cred-box' value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>


                <div className='password password-register-text'>
                    <h3 className='white light-font small-size'>Enter your <span className='green'>password...</span></h3>
                </div>
                <div className='password'>
                    <input className='cred-box' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>

                <div className='password password-register-text'>
                    <h3 className='white light-font small-size'>Re-enter your <span className='green'>password...</span></h3>
                </div>
                <div className='password'>
                    <input className='cred-box' type='password' value={repassword} onChange={(e) => setRepassword(e.target.value)}></input>
                </div>

                <Link to='/login' className='login-link'>
                    <h3 className='white light-font small-size'>Already have an account? <span className='green'>Login here!</span></h3>
                </Link>

                <div>
                    <button className='btn bold-font' type='submit'>Go!</button>
                </div>
            </div>

        </form>
    )
}

export default RegisterPage