import { combineReducers } from 'redux'
import {complaintListReducer, makeComplaintReducer } from './complaintReducer';
import { memberLoginReducer,memberRegisterReducer, memberListReducer } from './memberReducer';
import { societyCreateReducer, societyListReducer, getSocietyReducer} from './societyReducers';
import { addNoticeReducer, getNoticeReducer } from './noticeReducers';
import { adminLoginReducer, adminRegisterReducer } from './adminReducers';

export default combineReducers({

    createSociety:societyCreateReducer,
    listSociety:societyListReducer,
    getSociety:getSocietyReducer,
    memberRegister:memberRegisterReducer,
    memberLogin:memberLoginReducer,
    complaintList:complaintListReducer,
    makeComplaint:makeComplaintReducer,
    listMembers:memberListReducer,
    addNewNotice:addNoticeReducer,
    getNewNotice:getNoticeReducer,
    adminLogin:adminLoginReducer,
    adminRegister:adminRegisterReducer
})