import React from 'react';
import services_provided from '../../data/services';

export default function services() {
    return (
        <div className="service_container">
            <h1 className="title">services</h1>
            <div className="service_provider">
                {services_provided.map((x,index)=>{
                    return (<div key={index}>
                        <span>{x.service_logo}</span>
                    <h6>{x.service_name}</h6>
                    <p>{x.service_details}</p>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
