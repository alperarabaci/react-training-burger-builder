import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Modal from '../../components/UI/Modal/Modal';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const INITIAL_PRICE = 4;

class BurgerBuilder extends Component {
  //constructor eski dedi, bunla devam ediyor:
  state = {
    ingredients: null,
    totalPrice: INITIAL_PRICE,
    purchasable: false,//ya bunun yerine neyse...
    purchasing: false,
    loading: false,
    error: false
  };

    //bunu düz fonksiyon yazdi???
    //cagiranlarin alayi arrow!
  updatePurshaseState = (ingredients) => {
      const newingredients = {
          ...ingredients
      };
      //bunu dolandirdi boyle daha basit:
      const sum = Object.keys(newingredients).reduce( (sum, el) => {
        console.log("SUM: " + el)        
        return sum + (newingredients[el] * INGREDIENT_PRICES[el]);
      }, INITIAL_PRICE);
      //ben hic girmem bu ise, karsilastiririm 4 ile gecerim...
      //Ayristirmak daha dogru gibi tabii
      this.setState({totalPrice: sum});
      this.setState({purchasable: sum>0});
  }

  componentDidMount() {
    axios.get('/ingredients.json')
         .then(response => {
            this.setState({ingredients: response.data});
            
            /**
             * data kadar addIgredientHandler 
             * cagiracaktim ama state isi bozdu.
             */            
            Object.keys(response.data).forEach( (key) => {
              for (let index = 0; index < response.data[key]; index++) {
                //this.addIgredientHandler(key);                
                console.log('KEY:' +key);
              }                              
            });
            this.updatePurshaseState(response.data);
            
         })
         .catch(error => {
            this.setState({error});
         });
  }
  


  addIgredientHandler = (type) => {
    console.log(' add:' + type);

    const newIngredients = {...this.state.ingredients};
    newIngredients[type] = newIngredients[type] + 1;

    this.setState({ingredients: newIngredients});

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({totalPrice: newPrice});
    console.log("Total Price" +newPrice);
    //burada senkronizasyon sorunu nasil olmuyor onu anlamadım?
    //state ile yollamadigi icin olmuyor.
    this.updatePurshaseState(newIngredients);

  }

  removeIngredientHandler = (type) => {
    console.log('remove:' + type);

    const newIngredients = {...this.state.ingredients};
    if(newIngredients[type] === 0){
      console.log('No no no!')
      return;
    }
    newIngredients[type] = newIngredients[type] - 1;

    this.setState({ingredients: newIngredients});

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.setState({totalPrice: newPrice});
    console.log("Total Price" +newPrice);
    
    //burada senkronizasyon sorunu nasil olmuyor onu anlamadım?
    this.updatePurshaseState(newIngredients);
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

    for (let index in this.state.ingredients) {
      queryParams.push(encodeURIComponent(index) + '=' + this.state.ingredients[index]);
      
    }
    
    const queryString = queryParams.join('&');
    
    this.props.history.push({
        pathname: '/checkout',
        search: '?' +queryString
    });
    /*
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Sabit',
        address: 'Sarıyer'
      },
      email: 'test@test.com',
      deliverymethod: 'rush'
    };

    axios.post('/orders.json', order)
         .then(response => {
           console.log(response)
           this.setState({loading: true, purchasing: false});
         })
         .catch(error => {
          console.log(error)
           this.setState({loading: true, purchasing: false});  
         });
         */
  }

  render() {

    let orderSummary = null; 
    let burger = this.state.error ? <p>'Error'</p> : <Spinner /> ;

    if(this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            add={this.addIgredientHandler}
            remove={this.removeIngredientHandler}
            purchasable={!this.state.purchasable}
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (<OrderSummary ingredients={this.state.ingredients}
        modalClosed={this.purchaseCancelHandler}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
