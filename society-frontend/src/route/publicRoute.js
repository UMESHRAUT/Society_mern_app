import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

export const PublicRoute=({
    component:PublicComponent,
    ...routerProps
})=>{
    const memberLogin = useSelector(state => state.memberLogin);
    const {memberInfo}=memberLogin
    const memberDetails=JSON.parse(memberInfo);
    return(
        memberDetails?<Redirect to="/home"/>:
    <Route {...routerProps} render={
        props=>(
        <PublicComponent {...props}/>
        )
    }/>
    )
}

