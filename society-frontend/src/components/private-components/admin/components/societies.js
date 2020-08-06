import React, { useEffect } from 'react'
import { viewSocieties } from '../../../../redux/actions/societyActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import SocietyRegister from './createSociety';

function Societies() {

    const listSociety = useSelector(state => state.listSociety);
    const{loading,socities,error}=listSociety;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(viewSocieties());
        return () => {
            // cleanup
        }
    }, [])



    return (
        <div className="socitiesContainer">
            <SocietyRegister/>
            <div className="society-container">
        {loading&&<div className="loader"></div>}
        {socities?.map(society=>{
        return<Link to={{pathname:`/society/${society._id}`}} key={society._id} className="link"> <div key={society._id} className="society-list">
          <h1>{society.name}</h1>
            <h3>{society.address}</h3>
            <h3>Registration No.:{society.reg_no}</h3>
        </div>
        
        </Link>
        })}
        </div>
        </div>
    )
}

export default Societies
