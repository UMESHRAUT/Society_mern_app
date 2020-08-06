import { SOCIETY_DETAILS } from "../constants/societyConstants"

export const Society=(society)=>{
    return {
        type:SOCIETY_DETAILS,
        payload:society
    }
}