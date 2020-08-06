import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNotice, getNotice } from '../../../redux/actions/noticeActions';
import NoticeReply from './chat/noticeReply';

export default function AddNotice() {
    
    const memberLogin = useSelector(state => state.memberLogin)
    const{memberInfo}=memberLogin
    const userDetails=JSON.parse(memberInfo);

    const addNewNotice = useSelector(state => state.addNewNotice)
    const{loading,message,error}=addNewNotice;

    const[newNotice,setNewNotice]=useState(false);

    const getNewNotice = useSelector(state => state.getNewNotice)
    const {error:err,NewNotice}=getNewNotice
    const noticeLoading=getNewNotice.loading

    
    const[notice,setNotice]=useState({
        subject:"",
        about:""
    });
    
    const[quote,setQuote]=useState("");
    const[edit,setEdit]=useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {
    fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log();
            setQuote(data[Math.round(Math.random()*10)].text);
        });
        dispatch(getNotice(userDetails.member.member_of._id,userDetails.token));
        return () => {
            // cleanup
        }
    }, [AddNotice])


    const DeleteNotice=(e)=>{
        e.preventDefault();
        fetch(`/api/notice/${NewNotice._id}`,{method:'delete'}).then(()=>{
             dispatch(getNotice(userDetails.member.member_of._id,userDetails.token));

        })
    }

    const Addnew=()=>{
        setEdit(true);
        setNotice({subject:"",about:""})
        setNewNotice(true)
    }
    
    const submit=async (e)=>{
        e.preventDefault()

        await dispatch(addNotice(notice.subject,notice.about,userDetails.member.member_of._id,userDetails.token))

        await dispatch(getNotice(userDetails.member.member_of._id,userDetails.token));
        setEdit(false);
        setNotice(false);
        console.log("logging");
        setEdit(false);
        await dispatch(getNotice(userDetails.member.member_of._id,userDetails.token));
        
    }
    
    const editNotice=async(e)=>{
        e.preventDefault()
        console.log(userDetails.member.member_of);
        await fetch(`/api/notice/${NewNotice._id}`,
        {method:"put",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({subject:notice.subject,about:notice.about})}
        )
        await dispatch(getNotice(userDetails.member.member_of._id,userDetails.token));
        setEdit(false);

    }

    const handleChange=(e)=>{
        const{name,value}=e.target
        setNotice(prev=>{
            return{...prev,[name]:value}
        })
    }


    return(
        <div className="updates">
        <h1 className="quote">Thought of the    Day: "{quote}"</h1>

        <div className="notice-container">
        <h1 className="noticeBoard">* Notice Board *</h1>
    {error&&<h1 className="show-err">{error}</h1>}
    {/* {message&&<h1 className="show-err">{message}</h1>} */}
        <div className="notice">
            {NewNotice&&<h1 className="date"><span>Posted At : </span>{NewNotice?.createdAt.split("T")[0]}</h1>}
            {noticeLoading?<div className="loader"/>: edit?
            <>
            <div className="content">
            <h2 className="default">subject: </h2>
            <input placeholder={notice.subject} name="subject" value={notice.subject} onChange={handleChange}></input>
            </div>
            <div className="content">
                <h2 className="default">Description: </h2>
                <textarea placeholder={notice.about} name="about" value={notice.about} onChange={handleChange}></textarea>
            </div>
            <div className="button">
                <button className="addNotice" type="submit" onClick={newNotice?submit:editNotice}>Done</button>
            </div>
            </>
            :
            err?
            <div>
            <h1>No Notice for day</h1>
            {userDetails.member.role==="Secratory"&&
            <div className="button">
            <button className="addNotice" type="submit" onClick={Addnew}>Add Notice</button>
            </div>}
            </div>:
            <>
                <div className="content">
                    <h2 className="default">subject: </h2>
                    <h1><p>{NewNotice?.subject}</p></h1>    
                </div>
                
                <div className="content">
                    <h2 className="default">Description: </h2>
                    <h1><p>{NewNotice?.about}</p></h1>
                </div>
                {userDetails.member.role==="Secratory"?
                <div className="button">
                <button className="addNotice" type="submit" onClick={()=>{setNotice({subject:NewNotice.subject,about:NewNotice.about});setEdit(true);setNewNotice(false)}}>Edit</button>
                <button className="addNotice" type="submit" onClick={Addnew}>Add New</button>
                <button className="addNotice" type="submit" onClick={DeleteNotice}>Delete</button>

                </div>:<></>}
            </>}
        </div>
    </div>
    <NoticeReply/>
    </div>
    )
}