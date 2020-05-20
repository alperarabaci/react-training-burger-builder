import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Modal from '../../components/UI/Modal/Modal';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/action/';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {
  //constructor eski dedi, bunla devam ediyor:
  state = {    
    purchasing: false,
  };

  updatePurshaseState = (ingredients) => {

  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  addIgredientHandler = (type) => {
    console.log(' add:' + type);
    this.props.onIngredientAdded(type);
  }

  removeIngredientHandler = (type) => {
    this.props.onIngredientRemoved(type);
  }

  purchaseHandler = () => {
    /**
     * Login olmadan checkout olmayacak,
     * Basit bir sekilde buton checkout butonu
     * ile bu isi halletti. 
     */
    if(this.props.isAuthenticated){

      this.setState({purchasing: true});
    }else {
      /**
       * Gitsin login olsun adami hasta etmesin. :)
       */
      this.props.history.push({pathname: '/auth'});
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();    
    this.props.history.push({pathname: '/checkout'});
  }

  render() {
    let orderSummary = null; 
    let burger = this.props.error ? <p>'Error'</p> : <Spinner /> ;

    if(this.props.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            add={this.addIgredientHandler}
            remove={this.removeIngredientHandler}
            purchasable={!this.props.purchasable}
            ingredients={this.props.ingredients}
            totalPrice={this.props.totalPrice}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (<OrderSummary ingredients={this.props.ingredients}
        modalClosed={this.purchaseCancelHandler}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.props.totalPrice}
        />);
    }
    //bunu niye attik?
    /*
    if(this.state.loading){
      orderSummary = <Spinner />
    }*/
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchasable: state.burger.purchasable,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onIngredientRemoved: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
      onIngredientAdded: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
      onInitIngredients: () => dispatch(actions.initIngerdients()),
      onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));