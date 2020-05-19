import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from '../../store/action';

class Checkout extends Component {
  
  componentDidMount() {
    this.props.onInitPurchase();
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    console.log("CHECKOUT:", this.props.ingredients);

    let summaryPage = <Redirect to="/" />;

    if (this.props.ingredients) {

      const purchasedRedirect = (this.props.purchased)?<Redirect to="/" />: null;

      summaryPage = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />

          {/**BU KODU render yerine component ile degisti, render ornegi olsun bende degismiyom,
                    ContactData'yi da ayrıca bagladi.
                 */}
          <Route
            path={this.props.match.path + "/contact-data"}
            render={() => (
              <ContactData
                {...this.props}
                ingredients={this.props.ingredients}
              />
            )}
          />
        </div>
      );
    }

    return <div>{summaryPage}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchased: state.order.purchased
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit())
  } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
