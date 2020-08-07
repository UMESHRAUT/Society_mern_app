import { ADD_NOTICE_REQUEST, ADD_NOTICE_FAIL, ADD_NOTICE_SUCESS, GET_NOTICE_REQUEST, GET_NOTICE_FAIL, GET_NOTICE_SUCESS } from "../constants/noticeConstants"

export const addNotice=(subject,about,ofSociety,token)=>dispatch=>{
    dispatch({type:ADD_NOTICE_REQUEST})

    fetch("/api/notice",
    {method:"post",
    headers:{"content-type":"application/json","x-auth-token":token},
    body:JSON.stringify({subject,about,ofSociety})})
    .then(res=>res.json())
    .then(resp=>resp.error?dispatch({type:ADD_NOTICE_FAIL,payload:(resp.error)}):dispatch({type:ADD_NOTICE_SUCESS,payload:"Notice Added Sucessfully"}))
}

export const getNotice=(ofSociety,token)=>dispatch=>{
    dispatch({type:GET_NOTICE_REQUEST})
    fetch(`/api/notice/getNotice/${ofSociety}`,
    {method:"get",
    headers:{"content-type":"application/json","x-auth-token":token}})
    .then(res=>res.json())
    .then(resp=>resp.error?dispatch({type:GET_NOTICE_FAIL,payload:(resp.error)}):dispatch({type:GET_NOTICE_SUCESS,payload:resp}))
}