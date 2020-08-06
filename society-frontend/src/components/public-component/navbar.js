import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Component } from 'react'
import {FaAlignRight, FaBuilding} from 'react-icons/fa'
import { useSelector } from 'react-redux'


export default function NavBar(){
    
    const [isOpen,setIsOpen]=useState(false)


    const memberLogin = useSelector(state => state.memberLogin)
    const {memberInfo}=memberLogin
    const userDetails=JSON.parse(memberInfo)
    useEffect(() => {

        return () => {
            // cleanup
        }
    }, [])
    const handleToggle=()=>{
        setIsOpen(!isOpen);
    }

    return memberInfo?<nav className="navbar">
                <div className="nav-bar">
                <div className="nav-header">
            <Link to="/home"> <h1 className="brandName"> <FaBuilding/> SOCIETY</h1><h5>.Network</h5></Link>
            <button type="button" className="nav-btn" onClick={handleToggle}>
                <FaAlignRight className="nav-icon" /> 
            </button>
            </div>
            {userDetails.member.role==='Admin'?
            <ul className={isOpen?"nav-links show-nav":"nav-links"}>       
            <li>
                <Link to="/signin" onClick={()=>{localStorage.removeItem("memberInfo");window.location.href="/"}}>logout</Link>
            </li>
            </ul>
            :
            <ul className={isOpen?"nav-links show-nav":"nav-links"}>
            <li>
            <Link to="/home" onClick={()=>setIsOpen(false)}>Home</Link>
            </li>    
            <li>
            <Link to="/members" onClick={()=>setIsOpen(false)}>members</Link>
            </li>    
            <li>
            <Link to="/complaints" onClick={()=>setIsOpen(false)} >complaints</Link>
            </li>    
            <li>
                <Link to="/rules" onClick={()=>setIsOpen(false)}>Rules</Link>
            </li>       
            <li>
                <Link to="/signin" onClick={()=>{localStorage.removeItem("memberInfo");window.location.href="/"}}>logout</Link>
            </li>
            </ul>}
            </div>
        </nav>
    :(
        <nav className="navbar">
        <div className="nav-bar2">
            <div className="nav-header">
            <Link to="/" onClick={()=>setIsOpen(false)}> <h1 className="brandName"> <FaBuilding/> SOCIETY</h1><h5>.Network</h5></Link>
            </div>
            <ul className="nav-links2">
            <li>
            <Link to="/signin" >Signin</Link>
            </li>
            <li><div className="getStart">
            <Link to="/register">Get Started</Link></div>
            </li>
            <li>
            <Link to="/AdminHome"> Admin</Link>
            </li>
            </ul>
        </div>
        </nav>
    )
}

