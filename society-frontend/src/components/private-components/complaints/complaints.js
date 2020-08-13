import React, { useState, useEffect } from 'react'
import {useDispatch,useSelector } from 'react-redux'
import { getComplaints, MakeComplaint } from '../../../redux/actions/complaintActions';


function Complaints() {

    const memberLogin = useSelector(state => state.memberLogin)
    const{memberInfo}=memberLogin;
    const memberDetails=JSON.parse(memberInfo)
    const[complaint,setComplaint]=useState({
        title:"",
        description:""
    })

    const complaintList = useSelector(state => state.complaintList);
    const makeComplaint = useSelector(state => state.makeComplaint);
    const {addComplaintTo,addComplaintLoading,addComplaintError}=makeComplaint;
    const {complaints,loading,error}=complaintList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getComplaints(memberDetails.member.society._id));   
        // console.log(memberDetails.member.role);
        return () => {
             
        }
    }, [])



    const handleChange=(e)=>{
        const {name,value}=e.target;
        setComplaint(prev=>{
            return{...prev,[name]:value}
        })
    }



    // const[complaints,setComplaints]=useState([])

    const addComplaint=(e)=>{
        console.log(memberDetails.member.society._id);
        e.preventDefault();
        // memberDetails?.member?.society?._id
        dispatch(MakeComplaint(complaint.title,complaint.description,memberDetails?.member?.society?._id))
        setTimeout(()=>dispatch(getComplaints(memberDetails.member.society._id)),1000)
        setComplaint({
            title:"",
            description:""
        })
    }
    const EditComplaint=(e)=>{

        // setComplaint({title:e.title,description:e.description})
        console.log(e._id);
        const dataTo={
        method:"put",
        headers:{"content-type":"application/json","x-auth-token":memberDetails.token},
        body:JSON.stringify({status:"Solved",closedOn:Date.now})
        }   
        fetch(`/api/complaint/EditComplaint/${e._id}`,dataTo)
        .then(data=>console.log(data))
        .then(()=>dispatch(getComplaints(memberDetails.member.society._id)))
    }

    // console.log(complaints);

    return (
        <div className="page">
        <div className="container">
            <div className="box-heading">
                <h2>Complaint Box</h2>
            </div>
            <div className="complaints"> 
            {loading?<div className="loading-complaints"><h1>Loading...</h1></div>:
            error?<h1>{error}</h1>:
            complaints?.map((data,index)=>{
                return( complaints!=='undefined'?
                <div className="individual" key={index}>
                <div className="complaint-title">
                    <span className="title">{data.title}</span>
                    <span className="title">Status: {data.status}</span>                    {
            memberDetails.member.role==="Secratory" && data.status=="pending"&&
                    <div className="edit-btn">
                <button className="Edit-complaint" onClick={()=>EditComplaint(data)}>Solve Now</button>
                </div>}
                </div>
                <div className="complaint-description">
                    <span>
                        {data.description}
                    </span>
                </div>
                    <div className="complaint-of">
                         {memberDetails.member.role=="Secratory" && 
                         <span>Filed By: {data?.owner?.name}</span>} 
                         <span>Filed At: {data?.filedAt?.split("T")[0]}</span>
                         {data.status==="Solved"&&<span>Solved At:{data?.closedOn?.split("T")[0]}</span>}
                         </div>
             </div>:<h1>you have not filed any complaint yet.</h1>)
            })}
                        
            </div>
        </div>
        <div className="make-complaint">
            <div className="make-complaint-title">
                <h2>make a complaint</h2>
            </div>
            {addComplaintLoading?<div><h1>Loading...</h1></div>:
            addComplaintError?<div>{addComplaintError}</div>:
            <form className="form-complaint" onSubmit={addComplaint}>
                {/* {dispatch(getComplaints())} */}
                <label>title</label>
                <input name="title" value={complaint.title} onChange={handleChange} placeholder="leakage / carpenting / construction / about members" required/>
                <label>description</label>
                <textarea name="description" value={complaint.description} onChange={handleChange} placeholder="please descripbe your complaint clearly" required/>
                <button className="make-complaint-btn" type="submit">make a complaint</button>
            </form>
            }
        </div>
        </div>
    )
}
export default Complaints;