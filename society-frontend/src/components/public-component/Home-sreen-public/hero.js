import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <div className="hero">
        <div className="banner">
                <h3>Build your Society community</h3>
                <div/>
                <div>
                    <button><Link to="/register">Register</Link></button>
                    <button><Link to="/howTO">Learn more</Link></button>
            </div>
        </div>
    </div>
    )
}
