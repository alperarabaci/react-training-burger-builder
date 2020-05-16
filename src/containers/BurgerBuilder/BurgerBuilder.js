import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Modal from '../../components/UI/Modal/Modal';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';


class BurgerBuilder extends Component {
  //constructor eski dedi, bunla devam ediyor:
  state = {    
    purchasing: false,
    loading: false,
    error: false
  };

  updatePurshaseState = (ingredients) => {

  }

  componentDidMount() {
    axios.get('/ingredients.json')
         .then(response => {                        
            this.props.getIngredients(response.data);            
         })
         .catch(error => {
            this.setState({error});
         });
  }

  addIgredientHandler = (type) => {
    console.log(' add:' + type);
    this.props.addIngredient(type);
  }

  removeIngredientHandler = (type) => {
    this.props.deleteIngredient(type);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    console.log(this.props);

    const queryParams =[];

    for (let index in this.props.ingredients) {
      queryParams.push(encodeURIComponent(index) + '=' + this.props.ingredients[index]);
      
    }
    
    const queryString = queryParams.join('&');
    
    this.props.history.push({
        pathname: '/checkout',
        search: '?' +queryString
    });

  }

  render() {
    let orderSummary = null; 
    let burger = this.state.error ? <p>'Error'</p> : <Spinner /> ;

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
    if(this.state.loading){
      orderSummary = <Spinner />
    }
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable  
  }
}

const mapDispatchToProps = dispatch => {
  return {
      deleteIngredient: (ingredientType) => dispatch({type: actions.REMOVE_INGREDIENTS, ingredientType: ingredientType}),
      addIngredient: (ingredientType) => dispatch({type: actions.ADD_INGREDIENTS, ingredientType:ingredientType}),
      getIngredients: (ingredients) => dispatch({type: actions.GET_INGREDIENTS, ingredients:ingredients})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
