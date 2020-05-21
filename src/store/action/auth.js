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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');    
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

            const expireDateInMilisecond = new Date().getTime() + (response.data.expiresIn * 1000);
            const expirationDate = new Date(expireDateInMilisecond);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);

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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout());               
            }else {

                const userId = localStorage.getItem('userId');
                dispatch(authSuccess( {userId: userId, token: token, expirationDate: expirationDate} ));

                const time = (expirationDate.getTime() - new Date().getTime)/1000;
                dispatch(checkAuthTimeout(time));
            }
        }
    }
}