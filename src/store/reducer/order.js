import * as actionTypes from '../action/actionTypes';
import {updateObject}from '../utility';

const initialState = {
    order: null,
    loading: false,
    error: false,
    purchased: false  
};


const orderReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            updateObject(state, {purchased:false});
            /**
             * state, geri kalanlar seklinde
             * eski hali
            return {
                ...state,
                purchased: false
            };
             */
        case 'LOADING':
            return{
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS: 
            return{
                ...state,
                loading: false,
                error: false,
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL: 
            return{
                ...state,
                loading: false,
                error: true
            }
        default:
            return state;
    }

}

export default orderReducer;