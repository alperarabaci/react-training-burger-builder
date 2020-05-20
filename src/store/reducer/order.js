import * as actionTypes from '../action/actionTypes';
import {updateObject}from '../utility';

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false,    
};


const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};



const orderReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased:false});
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
            };
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
                

        default:
            return state;
    }

}

export default orderReducer;