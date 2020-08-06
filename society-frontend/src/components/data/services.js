import React from 'react';

import { FaCommentDots} from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import {IoMdClipboard } from "react-icons/io";
import {FiUserCheck } from "react-icons/fi";




const services_provided=[
        {
            service_logo:<FaCommentDots className="service_logo" />,
            service_name:"know Each Others",
            service_details:"now a days there is a huge communication gap between peopes arround the sciety, SOCIETY is helping to know people leaving around you."
        },
        {
            service_logo:<IoMdClipboard className="service_logo"/>,
            service_name:"Notice Board",
            service_details:"notice board is very important aspects of society i a daily routine no one has time to give paper notice to every member of society."
        },
        {
            service_logo:<GrCompliance className="service_logo"/>,
            service_name:"file a Complaint",
            service_details:"in societies some members are so shy that they dont express there anger against some one and they have to deal with it so we are aming to unidentifies and indentified complaints."
        },
        {
            service_logo:<FiUserCheck className="service_logo"/>,
            service_name:"Essential services",
            service_details:"in every home there will be need of essential service like electrician,loandry etc and getting service within tome is very important."
        },
    ]
    export default services_provided