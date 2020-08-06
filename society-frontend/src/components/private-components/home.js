import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { json } from 'body-parser';
import HomePage from './homePage/homePage';
import AdminHome from './admin/components/AdminHome';

export default function Home() {
    const memberLogin = useSelector(state => state.memberLogin)
    const {memberInfo}=memberLogin;
    const memberDetails=JSON.parse(memberInfo)
    return (
        
           memberDetails?.member?.role==="Admin" ? <AdminHome />:memberDetails? <HomePage />:
           <Redirect to="/signin"/>
    )
}
