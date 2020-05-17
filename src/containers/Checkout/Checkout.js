import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    componentWillMount() {

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

     render() {
         console.log("CHECKOUT:", this.props.ingredients);         
         return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}
                                 checkoutCancelled={this.checkoutCancelledHandler}
                                 checkoutContinued={this.checkoutContinuedHandler}
                                 />

                {/**BU KODU render yerine component ile degisti, render ornegi olsun bende degismiyom,
                    ContactData'yi da ayrıca bagladi.
                 */}                 
                <Route path={this.props.match.path + '/contact-data'}                       
                       render={() => (<ContactData {...this.props} ingredients={this.props.ingredients}/>)}  />                
            </div>
         );
     }

}


const mapStateToProps = state => {
    return {
      ingredients: state.ingredients,
      totalPrice: state.totalPrice,
    }
}
  
export default connect(mapStateToProps)(Checkout);