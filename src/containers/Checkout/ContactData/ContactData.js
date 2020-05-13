import React, { Component } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        loading: false
    } 

    componentWillMount(){
        console.log('ContactData - componentWillMount',this.props.ingredients);
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log('ORDER CLICKED..', this.props.ingredients);        

        //price'ı da queryString ile gecti, ornek de olsa GECIRMEM!!!
        //o kadar da degil!! redux gelene kadar boyle yapmış. YAPTIRMAM!
        const sum = Object.keys( this.props.ingredients )
            .map( igKey => {
                return this.props.ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 4);

        console.log('SUM:' +sum);
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: sum,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
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

    render () {
        let form = (                
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <button btnType="Success" onClick={this.orderHandler}>ORDER</button>
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

export default ContactData;