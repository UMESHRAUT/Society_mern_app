import { ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCESS, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCESS, ADMIN_REGISTER_FAIL } from "../constants/adminConstants";
import Axios from "axios";
import Cookies from 'js-cookie'

export const AdminLogin=(email,password)=> async(dispatch)=>{
    dispatch({type:ADMIN_LOGIN_REQUEST});
    try {
        const {data}=await Axios.post("/api/member/login",{email,password})
        dispatch({type:ADMIN_LOGIN_SUCESS,payload:data})
            localStorage.setItem("memberInfo",JSON.stringify(data))
            console.log(data.message);

    } catch (error) {
        console.log(error);
    }
}

export const RegisterAdmin=(name,email,password,confirm_pass)=>(dispatch)=>{
    dispatch({type:ADMIN_REGISTER_REQUEST});
        const data={
            method:"post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({name,email,password,confirm_pass})
        }
        fetch("/api/admin/createAdmin",data)
        .then(res=>res.json())
        .then(resp=>resp.message?dispatch({type:ADMIN_REGISTER_SUCESS,payload:resp.message}):
        dispatch({type:ADMIN_REGISTER_FAIL,payload:resp.error})
        )
}