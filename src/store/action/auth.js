import * as actions from './actionTypes';
import axios from 'axios';
import {API_KEY} from '../../firebase-api';

export const authStart = (loginData) => {

    return {
            type: actions.AUTH_START,
            loginInfo: loginData
    };
}

export const authSuccess = (authData) => {

    return {
            type: actions.AUTH_SUCCESS,
            authData: authData
    };
}

export const authFailed = (error) => {

    return {
            type: actions.AUTH_FAILDED,
            error: error
    };
}

export const logout = () => {
    return {
        type: actions.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}


/**
 * both signin - singup
 */
export const login = (loginData) => {
   
    return (dispatch) => {
        dispatch(authStart());

        const authData = {email:loginData.email, password: loginData.password, returnSecureToken: true};
        /**
         * Get your own api key using firebase console
         * settings => Web API Key
         */
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +API_KEY;
        if(!loginData.isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+API_KEY;
        }

        axios.post(url, authData)
        .then(response => {
            console.log("response", response);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn))            
        })
        .catch(error => {
            //ne hata oldu gecmedik??
            console.log("error",error);
            dispatch(authFailed(error.response.data.error));
        });
    }
}