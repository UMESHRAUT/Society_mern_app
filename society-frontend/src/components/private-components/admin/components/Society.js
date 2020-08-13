import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSocietyDetails } from '../../../../redux/actions/societyActions'
import { RiDeleteBinLine,RiUserSettingsLine } from 'react-icons/ri';
import { GetAllMember } from '../../../../redux/actions/memberActions';


function Society(props) {
    const dispatch = useDispatch()
    const getSociety = useSelector(state => state.getSociety);
    const{loading,socities,error}=getSociety;
    const listMembers = useSelector(state => state.listMembers)
    const {loading:memberLoading,membersList,error:memberError}=listMembers;

    const memberLogin = useSelector(state => state.memberLogin)
    const{memberInfo}=memberLogin
    const userDetails=JSON.parse(memberInfo);

    const deleteSociety=()=>{
        console.log(props.match.params.id);
        fetch(`/api/admin/DeleteSociety/${props.match.params.id}`,{method:"delete"}).then(rep=>rep.json()).then(msg=>alert(msg.msg))
        .then(()=>window.location='/');
    }

    const confirm_cancle=()=>{
        var press=window.confirm("Are you sure you want to delete?");
        if(press==true){
            deleteSociety();
        }
    }

    const confirm_cancle_role=(member)=>{
        var press=window.confirm("Are you sure you want to chnage role of member?");
        if(press==true){
            changeRole(member);
        }
    }

    const changeRole=async(member)=>{

        await fetch(`/api/member/changeRole/${member._id}`,
        {method:'put',
        headers:{"content-type":"application/json"},
        body:JSON.stringify({role:member.role=="Secratory"?"Member":"Secratory"})})
        await dispatch(GetAllMember(props.match.params.id,userDetails.token))

    }

    useEffect(() => {
        // console.log(props.match.params.id);
        dispatch(getSocietyDetails(props.match.params.id))
        dispatch(GetAllMember(props.match.params.id,userDetails.token))
        return () => {
            // cleanup
        }
    }, [])
    return (
        loading?<div className="load-center"><div className="loader"/></div>:
        error?<div className="show-err">{error}</div>:
        <div className="society-details">
            <div className="box-heading">
                <h1>{socities?.name}</h1>
                <h2>{socities?.address}</h2>
                <h2>Registration No: {socities?.reg_no}</h2>
                <div className="deleteSociety"><RiDeleteBinLine  className="deleteBtn"/></div>
            </div>

            <div className="All-members">
    {memberLoading&&<div className="loader"/>}
    {memberError&&<div className="show-err"/>}
                {membersList?.map(member=>{
                    return <div className="members-list" key={member._id}>
                        <h1>{member.name}</h1>
                <h2>Room No:{member.room_no}</h2>
                <h2>Role: {member.role}</h2>
                <button className="roleChanger" onClick={()=>confirm_cancle_role(member)}><RiUserSettingsLine/> Change Role</button>
                        </div>
                })}
            </div>

        </div>
    )
}

export default Society
