import React, { Component } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

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
        formIsValid: false,
        loading: false
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
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.ingredients,
            order: formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false} );
                console.log('ORDER SEND...');
                this.props.history.push('/');
            } )
            .catch( error => {
                console.log(error);
                this.setState( { loading: false } );
            } );           
    }

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid &= value.trim() !==  '';
        }

        if(rules.minLength) {
            isValid &= value.length >= rules.minLength;
        }

        if(rules.maxLength) {
            isValid &= value.length <= rules.maxLength;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = event.target.value;
        updatedFormElement.validation.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
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
        if(this.state.loading){
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
 */
export default ContactData;