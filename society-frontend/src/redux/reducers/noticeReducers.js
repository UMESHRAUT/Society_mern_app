const { ADD_NOTICE_SUCESS, ADD_NOTICE_REQUEST, ADD_NOTICE_FAIL, GET_NOTICE_REQUEST, GET_NOTICE_SUCESS, GET_NOTICE_FAIL } = require("../constants/noticeConstants");

function addNoticeReducer(state={},action){
    switch (action.type) {
        case ADD_NOTICE_REQUEST:
            return {loading:true}
        case ADD_NOTICE_SUCESS:
            return {loading:false,message:action.payload};
        case ADD_NOTICE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}


function getNoticeReducer(state={},action){
    switch (action.type) {
        case GET_NOTICE_REQUEST:
            return {loading:true}
        case GET_NOTICE_SUCESS:
            return {loading:false,NewNotice:action.payload};
        case GET_NOTICE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}

// function EditNoticeReducer(state={},action){
//     switch (action.type) {
//         case EDIT_NOTICE_REQUEST:
//             return {loading:true}
//         case EDIT_NOTICE_SUCESS:
//             return {loading:false,message:action.payload};
//         case EDIT_NOTICE_FAIL:
//             return {loading:false,error:action.payload}
//         default:
//             return state;
//     }
// }

export{
    addNoticeReducer,getNoticeReducer
}