import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import cookie from 'js-cookie'
import { json } from 'body-parser';

const message=cookie.getJSON("message") || null;
const memberInfo= localStorage.getItem("memberInfo") || null;
const initialState={memberRegister:{message},memberLogin:{memberInfo}} 
const middleware=[thunk];

const store=createStore(rootReducer,initialState,compose(
    applyMiddleware(...middleware),
    window.REDUX_DEVTOOLS_EXTENSION ? window.REDUX_DEVTOOLS_EXTENSION() : f => f
    )
);

export default store;