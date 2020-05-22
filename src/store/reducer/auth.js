import * as actionTypes from '../action/actionTypes';
import {updateObject}from '../../shared/utility';

const initialState = {
    order: null,
    loading: false,
    error: false,
    token: null,
    userId: null
};


const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null
    }
}

/**
 * Bunları tek tek metodlara cekmis, onun yaptigi daha guzel
 * Ben de bundan sonra oyle yapayim.
 * @param {*} state 
 * @param {*} action 
 */
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error:null, loading:true});
        case actionTypes.AUTH_SUCCESS:    
            return {
                ...state,
                token: action.authData.idToken,
                userId: action.authData.localId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAILDED:
            return {
                ...state,                
                error: action.error.message,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            break;
    }
    return state;
}

export default authReducer;