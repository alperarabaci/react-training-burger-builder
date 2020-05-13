import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        price:0        
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        /**BIR SAAT DEBUG YAPTIM BURAYA GELEN KOD STRING ONDAN BURGER YANLIS CALISIYORDU */
        /** + String INT Olsun diye */
        for(let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

     render() {
         console.log("CHECKOUT:", this.state.ingredients);         
         return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} 
                                 checkoutCancelled={this.checkoutCancelledHandler}
                                 checkoutContinued={this.checkoutContinuedHandler}
                                 />
                <Route path={this.props.match.path + '/contact-data'}                       
                       render={() => (<ContactData {...this.props} ingredients={this.state.ingredients}/>)}  />                
            </div>
         );
     }

}

export default Checkout;