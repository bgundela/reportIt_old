import React, { useContext, useState, useEffect } from 'react'
import Post from '../components/Post'
import { Divider } from '@mui/material'
import { UserContext } from '../context/UserContext'
import { CityContext } from '../context/CityContext'
import { Navigate } from 'react-router-dom'

const ViewPostsPage = () => {
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])
    const [searchPosts, setSearchPosts] = useState([])
    const { Username, setUsername } = useContext(UserContext)
    const { City, setCity } = useContext(CityContext)
    const [loading, setLoading] = useState(true)

    const getReports = async () => {
        const response = await fetch('http://localhost:4000/reports/reports', {
            method: 'POST',
            body: JSON.stringify({ 'city': City }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if (response.ok) {
            response.json().then(loadedPosts => {
                setPosts([...loadedPosts])
                setSearchPosts([...loadedPosts])
                if (posts !== '') {
                    setLoading(false)
                }
            })
        } else {
            alert('Something went wrong. Please try again later. If issue persists, contact support.')
        }
    }

    useEffect(() => {
        getReports()
    }, [loading])

    useEffect(() => {
        setPosts(posts.filter(post => (post.toLowerCase().title.includes(search.toLowerCase()))))
        if (search === '') {
            getReports()
        }
    }, [search])

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>
        )
    }

    if (Username === '' || City === '') {
        return <Navigate to='/login' />
    }

    return (
        <div>
            <div className='search-bar'>
                <input className='search-box' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 search-icon search-box">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>


            <div className='posts'>
                {(posts.length > 0) && posts.map(post =>
                    <div>
                        <Post {...post} key={post._id} />
                        <Divider className='divider-post' />
                    </div>
                )}

                {(posts.length === 0) && (
                    <h2>No Posts Found..</h2>
                )}
            </div>
        </div>
    )
}

export default ViewPostsPage