import React from 'react'
import Profile from './profile'
import AddNotice from './addNotice'

export default function HomePage() {
    return (
        <div className="home-page">
            <Profile/>
            <AddNotice/>
        </div>
    )
}
