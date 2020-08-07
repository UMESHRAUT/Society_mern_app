import React, { useState } from 'react'
import { MdDone } from 'react-icons/md';
import Cookies from 'js-cookie'
export default function Activate({match}) {

    const[loading,setLoading]=useState(false);
    const[err,setErr]=useState(false);
    const[sucess,setSucess]=useState(false);

    const activate=(e)=>{
        e.preventDefault();
        setLoading(true);
        Cookies.remove('message');
        console.log(match.params.token);
        const data={
            method:"post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({token:match.params.token})
        }
        console.log();
        fetch('/api/member/activateMember',data)
        .then(res=>res.json())
        .then(resp=>resp.error?setErr(resp.error):setSucess(resp.message)).then(()=>setLoading(false)).catch(err=>console.log(err))
    }
    return (
        <div className="activate">
            {loading?<div className="loader"></div>:
            err?<h1>{err} please sign in</h1>:
            sucess?<> <MdDone className="done"/><h1>{sucess} sign in now</h1></>:<>
            <h1>Click bellow button to activate your account</h1>
            <button className="btn primary" onClick={activate}>activate</button></>}
        </div>
    )
}
