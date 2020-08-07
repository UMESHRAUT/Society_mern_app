import React, { useState, useEffect } from 'react'
import { IoIosSend } from 'react-icons/io';
import { useSelector } from 'react-redux';


function NoticeReply() {

    const[msg,setMsg]=useState("");
    const getNewNotice = useSelector(state => state.getNewNotice)
    const memberLogin = useSelector(state => state.memberLogin)
    const [messages,setMessages]=useState([{msg:"default msg"}]);
    const[msgLoad,setMsgLoad]=useState(false);
    const {memberInfo}=memberLogin;
    const memberDetails=JSON.parse(memberInfo);
    const {loading,error,NewNotice}=getNewNotice;

    const send=(e)=>{
        console.log(NewNotice._id);
        if(msg!="" && NewNotice!="undefined"){
            setMsgLoad(true);
        e.preventDefault()
        fetch("/api/notice/message",
        {method:"post",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({belongTo:NewNotice._id,owner:memberDetails.member.name,msg:msg})
        }).then(data=>data.json()).then(log=>{console.log(log);getreplyes()})
        setMsg("");
        setMsgLoad(false);
    }

    }
    useEffect(() => {
        getreplyes();
        return () => {
            // 
        }
    }, [NewNotice])

    const getreplyes=()=>{
        if(NewNotice?._id!=undefined){
            fetch(`/api/notice/messagesOfNotice/${NewNotice?._id}`,{method:"post",headers:{"content-type":"application/json"}})
            .then(data=>data.json())
            .then(messag=>{setMessages(messag)})
            .catch(()=>setMessages({msg:"default"}))
                
        }
    }


    const handleChange=(e)=>{
        setMsg(e.target.value)
    }
    return (
        <div className="reply">
            {loading&&<div className="loader"/>}
            {msgLoad&&<div className="load-center"  />}
            {messages?.map((message,indx)=>{
                return <div className="message" key={indx}>
                    <span className={memberDetails.member.name==message?.owner?"mine":"others"}>
                        <h4 className="name">{message.owner}</h4>
                        <h2 className="mineMessage">
                    {message.msg}
                    </h2>
                    </span>
                    </div>
            })}
            <form onSubmit={send}>
           <div className="send"> <input className="msg" placeholder="Say something..." onChange={handleChange} value={msg} /><button type="submit" onClick={send}><IoIosSend className="send-icon"/></button></div>
           </form>
        </div>
    )
}

export default NoticeReply
