import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';


export const PrivateRoute=({
    component:PrivateComponent,
    signedInRoute,
    ...routerProps
})=>{
    return (
        <Route {...routerProps} render={
            props=>(
                <PrivateComponent {...props}/>
            )
        }/>
    )
}