import { SOCIETY_CREATE_REQUEST, SOCIETY_CREATE_SUCESS, SOCIETY_CREATE_FAIL, SOCIETY_VIEW_REQUEST, SOCIETY_VIEW_FAIL, SOCIETY_VIEW_SUCESS, SOCIETY_DETAILS_REQUEST, SOCIETY_DETAILS_FAIL, SOCIETY_DETAILS_SUCESS } from '../constants/societyConstants';

export const addSociety=(name,address,reg_no)=>(dispatch)=>{
    dispatch({type:SOCIETY_CREATE_REQUEST,payload:{name,address,reg_no}});
        const SocietyData={
            method:"post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({name:name,address:address,reg_no:reg_no})
        }
        fetch("/api/admin/registerSociety",SocietyData)
            .then(res=>res.json())
            .then(resp=>resp.error?
                dispatch({type:SOCIETY_CREATE_FAIL,payload:resp.error})
                :
                dispatch({type:SOCIETY_CREATE_SUCESS,payload:resp.msg}))
        
    }


export const viewSocieties=()=>(dispatch)=>{
    dispatch({type:SOCIETY_VIEW_REQUEST});
        const SocietyData={
            method:"post",
            headers:{"content-type":"application/json"}
        }
        fetch("/api/admin/getAllSociety",SocietyData)
            .then(res=>res.json())
            .then(resp=>resp.error?
                dispatch({type:SOCIETY_VIEW_FAIL,payload:resp.error})
                :
                dispatch({type:SOCIETY_VIEW_SUCESS,payload:resp}))
        
    }

export const getSocietyDetails=(id)=>(dispatch)=>{
    dispatch({type:SOCIETY_DETAILS_REQUEST});
        const SocietyData={
            method:"post",
            headers:{"content-type":"application/json"},
        }
        fetch(`/api/admin/SocietyDetails/${id}`,SocietyData)
            .then(res=>res.json())
            .then(resp=>resp.error?
                dispatch({type:SOCIETY_DETAILS_FAIL,payload:resp.error})
                :
                dispatch({type:SOCIETY_DETAILS_SUCESS,payload:resp}))
        
    }
