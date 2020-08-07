import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
    const memberLogin = useSelector(state => state.memberLogin)
    const {loading,error,memberInfo}=memberLogin;
    const memberDetails=JSON.parse(memberInfo);
    return (
        <div className="profile-container">
        <div className="main-container">
            <div className="role">
            <h1>{memberDetails.member.role}</h1>
            </div>
            <div className="member">
                <div ><img className="profile" src="https://avixa.azureedge.net/portal/images/default-source/icons/just-for-you-icon.png?sfvrsn=3c0f0e5b_2" alt="member"/></div>
                <div className="personal">
                    <h1>{memberDetails.member.name}</h1>
                    <h2>Society: {memberDetails.member.society.name}</h2>
                    <h3>Room No.: {memberDetails.member.room_no}</h3>
                </div>
            </div>
            </div>
        </div>
    )
}
