import React, { useState, useEffect } from 'react'
import { IoMdPersonAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { addSociety } from '../../../../redux/actions/societyActions'
export default function SocietyRegister(props) {

    const [details,setDetails]=useState({
        name:"",
        address:"",
        registration_no:""
    })
    const dispatch = useDispatch(props)
    function handleChange(event){
        const {name,value}=event.target;

        setDetails(prev=>{
            return {...prev,[name]:value}
        })
    }

    const[add,setAdd]=useState(false);

    const createSociety = useSelector(state => state.createSociety)
    const {answer,loading,error}=createSociety;

    useEffect(() => { 
        if(answer){
            window.location="/"
        }
        return () => {
            // cleanup
        }
    }, [answer])

    function submit(e){
        e.preventDefault();
        dispatch(addSociety(details.name,details.address,details.registration_no))

        // const sendData={
        //     method:"post",
        //     headers:{"content-type":"application/json"},
        //     body:JSON.stringify(details)
        // }
        // fetch('/api/society/createSociety',sendData)
        // .then(recive=>recive.json())
        // .then(data=>window.location="/")
        // .catch(err=>console.log(err))
    }

    return (<>
            <button className={!add?"addSociety":"display_none"} onClick={()=>setAdd(true)}>Add Society</button>
        <form className={!add?"add-society": "add-society show-creation" } onSubmit={submit}>
            <div>
        <h1><IoMdPersonAdd/> Register new Society</h1>
            </div>
        {loading && <div>Loading...</div>}
            {error && <div className="show-err">{error}</div>}
            <div className="getDetails">
                <div>
                <label>Society Name</label>
                <input type="text" name="name" value={details.name} onChange={handleChange}/> 
                </div>
                <div>
                <label>full address</label>
                <textarea type="text" name="address" value={details.address} onChange={handleChange}/>  
                </div>
                <div>  
                <label>Registration no</label>
                <input type="text" name="registration_no" value={details.registration_no} onChange={handleChange}/>  
                </div>
            </div>
            <div>
            <button className="btn primary" type="submit">Register</button>
            <button className="btn" type="button" onClick={()=>{setAdd(false)}} >Cancel</button>
            </div>
        </form>
        </>
    )
}
