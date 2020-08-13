import Cookies from 'js-cookie'
import { MEMBER_LOGIN_REQUEST, MEMBER_LOGIN_SUCESS, MEMBER_LOGIN_FAIL, MEMBER_REGISTER_REQUEST, MEMBER_REGISTER_SUCESS, MEMBER_REGISTER_FAIL,MEMBER_LIST_REQUEST,MEMBER_LIST_SUCESS,MEMBER_LIST_FAIL } from '../constants/memberConstants';
import Axios from 'axios';

export const Login=(email,password)=> async(dispatch)=>{
    dispatch({type:MEMBER_LOGIN_REQUEST});
    try {
        const {data}=await Axios.post("/api/member/login",{email,password})
        dispatch({type:MEMBER_LOGIN_SUCESS,payload:data})
            localStorage.setItem("memberInfo",JSON.stringify(data))
            console.log(data.message);

    } catch (error) {
        console.log(error);
    }
}

export const RegisterMember=(name,society,role,room_no,email,password,confirm_pass)=>(dispatch)=>{
    dispatch({type:MEMBER_REGISTER_REQUEST});
    try {
        const data={
            method:"post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({name,society,role,room_no,email,password,confirm_pass})
        }
        fetch("/api/member/register",data)
        .then(res=>res.json())
        .then(resp=>resp.message?dispatch({type:MEMBER_REGISTER_SUCESS,payload:resp}):
        dispatch({type:MEMBER_REGISTER_FAIL,payload:resp.error})).catch(err=>console.log("logging error"+err))

    } catch (error) {
        console.log(error);
    }

}


export const GetAllMember=(id,token)=>(dispatch)=>{
    dispatch({type:MEMBER_LIST_REQUEST});
    try {
        const data={
            method:"post",
            headers:{"content-type":"application/json","x-auth-token":token},
            body:JSON.stringify({"society":id})
        }
        fetch("/api/member/members",data)
        .then(res=>res.json())
        .then(list=> dispatch({type:MEMBER_LIST_SUCESS,payload:list}))
        
    } catch (error) {
        dispatch({type:MEMBER_LIST_FAIL,payload:error});
    }
}