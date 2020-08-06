import { COMPLAINTS_LIST_SUCESS, COMPLAINTS_LIST_REQUEST, COMPLAINTS_LIST_FAIL, COMPLAINTS_ADD_REQUEST, COMPLAINTS_ADD_SUCESS, COMPLAINTS_ADD_FAIL } from "../constants/complaintConstants"

export function complaintListReducer(state={complaints:[]},action){
    switch (action.type) {
        case COMPLAINTS_LIST_REQUEST:
            return {loading:true}
        case COMPLAINTS_LIST_SUCESS:
            return{
                loading:false,
                complaints:action.payload
            };
        case COMPLAINTS_LIST_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export function makeComplaintReducer(state={complaints:[]},action){
    switch (action.type) {
        case COMPLAINTS_ADD_REQUEST:
            return {addComplaintLoading:true}
        case COMPLAINTS_ADD_SUCESS:
            console.log(action.payload);
            return{
                addComplaintLoading:false,
                addComplaintTo:action.payload
            };
        case COMPLAINTS_ADD_FAIL:
            return {
                addComplaintLoading:false,
                addComplaintError:action.payload
            }
        default:
            return state
    }
}