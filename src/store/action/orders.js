import * as actions from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerFailed = () =>{
    return {type: actions.PURCHASE_BURGER_FAIL};
}

const purchaseBurgerSuccess = () =>{
    return {type: actions.PURCHASE_BURGER_SUCCESS};
}

const purchaseStart = () => {
    return {type: 'LOADING'};
}

export const purchaseBurger = (order) =>{
    /**
     * basta loading'i nasil cikaracaz ya?
     */
    return (dispatch) => {
        dispatch(purchaseStart());
        axios.post( '/orders.json', order )
        .then( response => {
            return dispatch(purchaseBurgerSuccess());
        } )
        .catch( error => {
            console.log(error);
            return dispatch(purchaseBurgerFailed());
        } );    

    }
}


export const purchaseInit = () => {
    return {
        type: actions.PURCHASE_INIT 
    }
}