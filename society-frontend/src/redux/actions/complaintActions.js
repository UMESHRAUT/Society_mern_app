import { COMPLAINTS_LIST_SUCESS, COMPLAINTS_LIST_REQUEST, COMPLAINTS_LIST_FAIL, COMPLAINTS_ADD_REQUEST, COMPLAINTS_ADD_SUCESS, COMPLAINTS_ADD_FAIL } from "../constants/complaintConstants"
import Axios from "axios";

export const getComplaints=()=> async (dispatch)=>{

    try {
        dispatch({type:COMPLAINTS_LIST_REQUEST});
        const getComplaint={
            method:"get",
            headers:{"content-type":"application/json","x-auth-token":JSON.parse(localStorage.getItem("memberInfo")).token},
        }
        fetch('/api/complaint/seeComplaint',getComplaint)
            .then(res=>res.json())
            .then(complaintData=>dispatch({type:COMPLAINTS_LIST_SUCESS,payload:complaintData}));

    } catch (error) {
        dispatch({type:COMPLAINTS_LIST_FAIL,payload:error.message});
    }
}


export const MakeComplaint=(title,description)=> (dispatch)=>{
    try {
        dispatch({type:COMPLAINTS_ADD_REQUEST})
    const complaintRequest={
        method:"post",
        headers:{"content-type":"application/json","x-auth-token":JSON.parse(localStorage.getItem("memberInfo")).token},
        body:JSON.stringify({title,description})
    }
    fetch('/api/complaint/makeComplaint',complaintRequest)
    .then(data=>data.json())
    .then(res=>console.log(res))
    .then(addComplaint=>dispatch({
        type:COMPLAINTS_ADD_SUCESS,
        payload:addComplaint
    }))
    } catch (error) {
        dispatch({type:COMPLAINTS_ADD_FAIL,payload:error.message});
    }
}

