import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import AdminHomePage from './adminHomePage';

export default function AdminHome() {
    const adminLogin = useSelector(state => state.adminLogin)
    const memberLogin = useSelector(state => state.memberLogin)
    const {memberInfo}=memberLogin;

    return (
        <div>
           {memberInfo ?<AdminHomePage/>:
           <Redirect to="/AdminSignin"/>}
        </div>
    )
}
