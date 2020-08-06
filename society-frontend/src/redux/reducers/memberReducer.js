const { MEMBER_LOGIN_REQUEST, MEMBER_LOGIN_SUCESS, MEMBER_LOGIN_FAIL, MEMBER_REGISTER_REQUEST, MEMBER_REGISTER_SUCESS, MEMBER_REGISTER_FAIL, MEMBER_LIST_REQUEST, MEMBER_LIST_SUCESS, MEMBER_LIST_FAIL } = require("../constants/memberConstants");

function memberRegisterReducer(state={},action){
    switch (action.type) {
        case MEMBER_REGISTER_REQUEST:
            return {loading:true}
        case MEMBER_REGISTER_SUCESS:
            console.log(action.payload)
            return {loading:false,message:action.payload};
        case MEMBER_REGISTER_FAIL:
            console.log(action.payload);
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

function memberLoginReducer(state={},action){
    switch (action.type) {
        case MEMBER_LOGIN_REQUEST:
            return {loading:true}
        case MEMBER_LOGIN_SUCESS:
            return {loading:false,memberInfo:action.payload};
        case MEMBER_LOGIN_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

function memberListReducer(state={},action){
    switch (action.type) {
        case MEMBER_LIST_REQUEST:
            return {loading:true}
        case MEMBER_LIST_SUCESS:
            return {loading:false,membersList:action.payload};
        case MEMBER_LIST_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

export {
    memberLoginReducer,memberRegisterReducer,memberListReducer
}