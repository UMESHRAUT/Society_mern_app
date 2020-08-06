import { SOCIETY_CREATE_REQUEST, SOCIETY_CREATE_SUCESS, SOCIETY_CREATE_FAIL, SOCIETY_VIEW_REQUEST, SOCIETY_VIEW_SUCESS, SOCIETY_VIEW_FAIL, SOCIETY_DETAILS_REQUEST, SOCIETY_DETAILS_SUCESS, SOCIETY_DETAILS_FAIL } from "../constants/societyConstants";

function societyCreateReducer(state={},action){
    switch (action.type) {
        case SOCIETY_CREATE_REQUEST:
            return {loading:true}
        case SOCIETY_CREATE_SUCESS:
            return {loading:false,answer:action.payload};
        case SOCIETY_CREATE_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

function societyListReducer(state={},action){
    switch (action.type) {
        case SOCIETY_VIEW_REQUEST:
            return {loading:true}
        case SOCIETY_VIEW_SUCESS:
            return {loading:false,socities:action.payload};
        case SOCIETY_VIEW_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

function getSocietyReducer(state={},action){
    switch (action.type) {
        case SOCIETY_DETAILS_REQUEST:
            return {loading:true}
        case SOCIETY_DETAILS_SUCESS:
            console.log(action.payload);
            return {loading:false,socities:action.payload};
        case SOCIETY_DETAILS_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

export {
    societyCreateReducer,societyListReducer,getSocietyReducer
}