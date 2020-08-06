import { ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCESS, ADMIN_LOGIN_FAIL, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCESS, ADMIN_REGISTER_FAIL } from "../constants/adminConstants";


function adminRegisterReducer(state={},action){
    switch (action.type) {
        case ADMIN_REGISTER_REQUEST:
            return {loading:true}
        case ADMIN_REGISTER_SUCESS:
            console.log(action.payload)
            return {loading:false,message:action.payload};
        case ADMIN_REGISTER_FAIL:
            console.log(action.payload);
            return {loading:false,Aerror:action.payload};
        default:
            return state;
    }
}

function adminLoginReducer(state={},action){
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
            return {loading:true}
        case ADMIN_LOGIN_SUCESS:
            return {loading:false,memberInfo:action.payload};
        case ADMIN_LOGIN_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

export{
    adminRegisterReducer,adminLoginReducer
}