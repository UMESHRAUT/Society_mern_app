import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'



export default function AdminSignin() {

    
    const [error,setError]=useState(false)
    const[loading,setLoading]=useState(false);   


    const [details,setDetails]=useState({
        email:"",
        password:"",
        role:"user"
    })

        
    
    function handleChange(event){
        const {name,value}=event.target;

        setDetails(prev=>{
            return {...prev,[name]:value}
        })
    }


    const authenticate=(event)=>{
        event.preventDefault();
        // dispatch(Login(details.email,details.password))
        setError(false)
        setLoading(true);
        fetch("/api/admin/adminLogin",
        {method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:details.email,password:details.password})})
        .then(res=>res.json())
        .then(msg=>msg.error?setError(msg.error):localStorage.setItem("memberInfo",JSON.stringify(msg)))
        .then(()=>setLoading(false)).then(()=>localStorage.getItem('memberInfo')&&(window.location="/AdminHome"))
        
        // .catch(err=>console.log(err))
    }

    return <div className="signin" >
        <form className="signin-form" onSubmit={authenticate}>
            <h2>Admin Sign-in</h2>
            {loading==true?<div className="top-msg loader"></div>:<></>}
            {error && <div className="show-err">{error}</div>}
            <label>Email</label>
            <input type="text" name="email" value={details.email} onChange={handleChange} required/> 
            <label>password</label>
            <input type="password" name="password" value={details.password} onChange={handleChange} required/> 
            <button className="btn primary" type="submit">Sign-in</button>
            <label>not registered?</label>
            <Link to="/AdminRegister">
            <button className="btn">Register</button></Link>
            
        </form>
        </div>
    
}

