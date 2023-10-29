import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'



const ReportingPage = () => {
    const [city, setCity] = useState('Shakopee')
    const [title, setTitle] = useState('')
    const [explanation, setExplanation] = useState('')
    const [email, setEmail] = useState('')
    const [picture, setPicture] = useState('')

    const submitReport = async (e) => {
        e.preventDefault();
        if (city !== '' && title !== '' && explanation !== '' && email !== '') {
            console.log(picture)
            if (picture !== null) {
                const base64Picture = await convertToBase64(picture)
                console.log(base64Picture)
                const response = await fetch('http://localhost:4000/reports/create', {
                    method: 'POST',
                    body: JSON.stringify({ city, title, explanation, email, 'picture': base64Picture }),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                })

                setCity('Shakopee')
                setTitle('')
                setExplanation('')
                setEmail('')
                setPicture(null)
            } else {
                const response = await fetch('http://localhost:4000/reports/create', {
                    method: 'POST',
                    body: JSON.stringify({ city, title, explanation, email }),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                })

                setCity('Shakopee')
                setTitle('')
                setExplanation('')
                setEmail('')
                setPicture('')
            }

        } else {
            alert('All fields except picture are required.')
        }

    }


    return (
        <form className='reporting-page' onSubmit={(e) => submitReport(e)}>
            <h2 className='white semibold-font reporting-header'>Report an Issue:</h2>

            <div className='select-city'>
                <h3 className='dropdown-text white light-font small-size'>What city are <span className='green'>you in?*</span></h3>
            </div>

            <select className='dropdown bold-font' value={city} onChange={(e) => setCity(e.target.value)}>
                <option value='Shakopee'>Shakopee</option>
            </select>

            <div className='problem-title '>
                <h3 className='title white light-font small-size'>What problem have you <span className='green'>found?*</span></h3>
            </div>

            <input className='text-box' value={title} onChange={(e) => setTitle(e.target.value)}></input>

            <div className='problem-explanation'>
                <h3 className='white light-font small-size'>Tell us a little <span className='green'>more...*</span></h3>
            </div>

            <textarea className='text-area' value={explanation} onChange={(e) => setExplanation(e.target.value)}></textarea>

            <div className='report-email'>
                <h3 className='white light-font small-size'>Tell us your <span className='green space'>email...*</span></h3>
            </div>

            <input className='text-box' value={email} onChange={(e) => setEmail(e.target.value)}></input>

            <div className='picture'>
                <h3 className='picture white light-font small-size'>Show us a <span className='green space'>picture...</span></h3>
            </div>

            <input className='picture-select reporting-line' type='file' onChange={(e) => setPicture(e.target.files[0])}></input>

            <div id='btn-padding'>
                <button className='btn bold-font' type='submit'>Submit</button>
            </div>
        </form>
    )
}


export default ReportingPage

const convertToBase64 = (file) => {
    if (!file) {
        return
    }
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (err) => {
            reject(err)
        }
    })
}
