import React, { useEffect, useState } from 'react'
import { GetAllMember } from '../../../redux/actions/memberActions'
import { useSelector, useDispatch } from 'react-redux';
import { json } from 'body-parser';

export default function ViewMembers() {
    const listMembers = useSelector(state => state.listMembers)
    const{loading,membersList,error}=listMembers
    // const data=JSON.parse(membersList)

    const[show,setShow]=useState(false);
    const[show_details,setShowDetails]=useState(false);

    const memberLogin = useSelector(state => state.memberLogin)
    const {memberInfo}=memberLogin;
    const societyDetails=JSON.parse(memberInfo);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetAllMember(societyDetails.member.society._id,societyDetails.token))
        return () => {
            // cleanup
        }
    }, [])
    return (
        <div>
            <div className="members-heading"><h1>members in {societyDetails.member.society.name}</h1></div>
            
            {loading && <div className="loader"/>}
            {membersList?.map(member=>{
                return <div className="members" key={member._id} onClick={()=>{setShow(true)}}>
                    <div>
                    <h1>{member.name}</h1>
                    </div>
                    {
                    <div className="details" >
                        <div >
                    <h2 className="roomNo">Room no:{member.room_no}</h2>
                    <h3>mail:{member.email}</h3>
                    </div>
                    <h1>{member.role}</h1>
                </div>}
                </div>
            })}
        </div>
    )
}
