import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerFailed = () =>{
    return {type: actionTypes.PURCHASE_BURGER_FAIL};
}

const purchaseBurgerSuccess = () =>{
    return {type: actionTypes.PURCHASE_BURGER_SUCCESS};
}

const purchaseStart = () => {
    return {type: 'LOADING'};
}

export const purchaseBurger = (order, token) =>{
    /**
     * basta loading'i nasil cikaracaz ya?
     */
    return (dispatch) => {
        dispatch(purchaseStart());
        axios.post( '/orders.json?auth='+ token, order )
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
        type: actionTypes.PURCHASE_INIT 
    }
}

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};


export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId+'"';

        axios.get( '/orders.json' + queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};