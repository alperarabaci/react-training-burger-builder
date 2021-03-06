import React, { Component } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

import { connect } from 'react-redux';
import * as actions from '../../../store/action';
import {checkValidity} from '../../../shared/utility';


class ContactData extends Component {
    state = {
        orderForm: {
            name: { 
                elementType: 'input', 
                elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name',                        
                    },
                    value: 'Alper',
                    validation: {
                        required: true,
                        valid: true
                    },
                    touched: true
            },
            street: { 
                elementType: 'input', 
                elementConfig: {
                        type: 'text',
                        placeholder: 'Street',                        
                    },
                    value: '',
                    validation: {
                        required: true,
                        valid: false
                    },
                    touched: false
            },
            zipCode: { 
                elementType: 'input', 
                elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP CODE',                        
                    },
                    value: '',
                    validation: {
                        required: true,
                        valid: false,
                        minLength:5,
                        maxLength:5,
                        isNumeric: true
                    },
                    touched: false
            },
            country: { 
                elementType: 'input', 
                elementConfig: {
                        type: 'text',
                        placeholder: 'Country',                        
                    },
                    value: 'Turkey',
                    validation: {
                        required: true,
                        valid: true
                    },
                    touched: true
            },
            email: { 
                elementType: 'input', 
                elementConfig: {
                        type: 'text',
                        placeholder: 'Email',                        
                    },
                    value: 'a@b.com',
                    validation: {
                        required: true,
                        isEmail: true,
                        valid: true
                    },
                    touched: true
            },
            deliveryMethod: { 
                elementType: 'select', 
                elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fatestest'},
                            { value: 'cheapest', displayValue: 'Cheapest'}
                        ]                       
                    },
                    value: 'cheapest',
                    validation: {
                        required: true,
                        valid: true
                    },
                    touched: true 
            }
        },
        formIsValid: false
    } 

    componentDidMount(){
        console.log('ContactData - componentWillMount',this.props.ingredients);

    }

    checkFormValidity(){
        //require alani ekledik, required olanlar bakalim dolu mu??
        for(let key in this.state.orderForm){
            const element = this.state.orderForm[key];
            if(!element.validation.valid){
                return false;
            }           
        }
        return true;  
    }
 

    orderHandler = (event) => {
        event.preventDefault();
        console.log('ORDER CLICKED..', this.props.ingredients);        
     
        //state icerisindeki value'lari toplama:
        //bu sefer de for olsun:
        const formData = {};
        for(let key in this.state.orderForm){
            const element = this.state.orderForm[key];
            formData[key] = element.value;
        }

        console.log('form data', formData);

        //price'ı da queryString ile gecti, ornek de olsa GECIRMEM!!!
        //o kadar da degil!! redux gelene kadar boyle yapmış. YAPTIRMAM!        
        //redux geldi tekrar hesaplamistim burada gerek kalmadi.
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            order: formData,
            userId: this.props.userId
        }
        //bunu alttakinin icinde yapmayi beceremedim?
        //birden fazla dispatch diyebiliyormuşuz
        //this.props.onLoadingStart();
        this.props.onOrderPurchased(order, this.props.token);
    }

    

    inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = event.target.value;
        updatedFormElement.validation.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log('updatedFormElement', updatedFormElement);

        const formIsValid = this.checkFormValidity();
        console.log('formIsValid:', formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid:formIsValid});
    }

    render () {
        console.log('Contact data, elemenst:');
        let elements = Object.keys(this.state.orderForm).map(elementTitle => {
            console.log(elementTitle);
            const element = this.state.orderForm[elementTitle];
            return  <Input key = {elementTitle} name = {elementTitle} 
                                  elementType = {element.elementType} 
                                  elementConfig ={element.elementConfig} 
                                  value={element.value}
                                  changed= {(event) => this.inputChangeHandler(event, elementTitle )}
                                  // ELEMAN touch bilgisini de gecti icerde kontrol etti, dogrusu o herkes kendi isini yapsin:   
                                  invalid = {!element.validation.valid && element.touched}

                                  />;
        })

        let form = (                
                <form onSubmit={this.orderHandler} autoComplete="off">
                    {elements}
                    <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
                </form>                
        );
        if(this.props.loading){
            form = <Spinner />
          }

        return (
            <div className={classes.ContactData}>                
                <h4>Enter your Contact data</h4>
                {form}                
            </div>
        )
    }
}

/**
 * Buna redux baglamadim props uzserinden geciyorum...
 * Hangisi daha dogru? Bu sekilde digerine bagimli halde,
 * Belki bagimliligi kaldirmak icin eklenmeli!
 * 307: Baglamak farz oldu. :)
 */

const mapStateToProps = state => {
    return {
      loading: state.order.loading,      
      token: state.auth.token,
      userId: state.auth.userId
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onOrderPurchased: (order, token) => dispatch(actions.purchaseBurger(order, token))        
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ContactData);