import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import { IoMdPersonAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { RegisterAdmin } from '../../../redux/actions/adminActions';
export default function AdminRegister() {
    Cookies.remove('message');
    const [details,setDetails]=useState({
        name:"",
        email:"",
        password:""
    })
    const [err,setErr]=useState(false);
    const adminRegister = useSelector(state => state.adminRegister)
    const{message,loading,error}=adminRegister;
    
    const[listSociety,setList]=useState([])

    const dispatch = useDispatch();


    
    function handleChange(event){
        const {name,value}=event.target;

        setDetails(prev=>{
            return {...prev,[name]:value}
        })
    }
    

    function submit(e){
        e.preventDefault();
        if(details.name!=""&& details.email!="" && details.password!=""){
        dispatch(RegisterAdmin(details.name,details.email,details.password))
        }else{
            setErr(true);
        }
    }

    return (
        <div className="signin">
        <form className="signin-form" onSubmit={submit}>
        <h1><IoMdPersonAdd/> Register Member</h1>
        
            {loading && <h2>loading...</h2>}
            {error && <h2>{error}</h2>}
            
            {err && <h2 className="show-err">All fields are compulsary</h2>}
            {message && <h3 className="top-msg">{message.message || message.error}</h3>}
            <label>Name</label>
            <input type="text" name="name" value={details.name} onChange={handleChange}/>
            <label>Email</label>
            <input type="text" name="email" value={details.email} onChange={handleChange}/>       
            <label>password</label>
            <input type="password" name="password" value={details.password} onChange={handleChange}/>    
             <Link to="/" >
            <button className="btn primary" onClick={submit} value="submit">Register</button></Link>
            <label>Alredy have an account?  <Link to="/AdminSignin" >Log in </Link></label>
        </form>
        </div>
    )
}
