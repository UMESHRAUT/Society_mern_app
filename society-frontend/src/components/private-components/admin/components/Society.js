import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSocietyDetails } from '../../../../redux/actions/societyActions'
import { RiDeleteBinLine } from 'react-icons/ri';


function Society(props) {
    const dispatch = useDispatch()
    const getSociety = useSelector(state => state.getSociety);
    const{loading,socities,error}=getSociety;


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


    useEffect(() => {
        dispatch(getSocietyDetails(props.match.params.id))
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
                <button className="deleteSociety"onClick={confirm_cancle}>Delete society <RiDeleteBinLine  className="deleteBtn"/></button>
            </div>

            <div className="All-members">
                {socities?.members?.map(member=>{
                    return <div className="members-list">
                        <h1>{member.name}</h1>
                <h2>Room No:{member.room_no}</h2>
                <h2>Role: {member.role}</h2>
                        </div>
                })}
            </div>

        </div>
    )
}

export default Society
