import React from 'react'
import Hero from './Home-sreen-public/hero'
import Services from './Home-sreen-public/services'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Home from '../private-components/home'

export default function Main() {

    const memberLogin = useSelector(state => state.memberLogin)
    const {memberInfo}=memberLogin
    return (
        memberInfo?<Home/>:
        <div className="main">
                <Hero />
                <Services />
        </div>
    )
}
