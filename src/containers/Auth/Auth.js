import React, {Component} from 'react';

import  Input from '../../components/UI/Input/Input';
import  Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';

import { connect } from 'react-redux';
import * as actions from '../../store/action';

import { Redirect } from "react-router-dom";

import {checkValidity} from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: { 
                elementType: 'input', 
                elementConfig: {
                        type: 'email',
                        placeholder: 'E-Mail Address',                        
                    },
                    value: '',
                    validation: {
                        required: true,
                        valid: false,
                        isEmail: true
                    },
                    touched: false
            },
            password: { 
                elementType: 'input', 
                elementConfig: {
                        type: 'password',
                        placeholder: 'Password',                        
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6,
                        valid: false,
                    },
                    touched: false
            },
        }
        ,formIsValid: false,
        isSignUp: false
    }

    inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = {...this.state.controls};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = event.target.value;
        updatedFormElement.validation.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log('updatedFormElement', updatedFormElement);

        const formIsValid = this.checkFormValidity();
        console.log('formIsValid:', formIsValid);
        this.setState({controls: updatedOrderForm, formIsValid:formIsValid});
    }

    checkFormValidity(){
        //require alani ekledik, required olanlar bakalim dolu mu??
        for(let key in this.state.controls){
            const element = this.state.controls[key];
            if(!element.validation.valid){
                return false;
            }           
        }
        return true;  
    }    

    orderHandler = (event) =>{
        event.preventDefault();
        const loginData = {
                        email:this.state.controls.email.value,
                        password: this.state.controls.password.value,
                        isSignUp: this.state.isSignUp
                      };
        this.props.onLogin(loginData);
    } 

    switchSignHandler = () => {
        this.setState( prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    }

    render(){
        let authorized = (this.props.token) ?  <Redirect to="/" />: null;
        let elements = Object.keys(this.state.controls).map(elementTitle => {
            console.log(elementTitle);
            const element = this.state.controls[elementTitle];
            return  <Input key = {elementTitle} name = {elementTitle} 
                                  elementType = {element.elementType} 
                                  elementConfig ={element.elementConfig} 
                                  value={element.value}
                                  changed= {(event) => this.inputChangeHandler(event, elementTitle )}
                                  // ELEMAN touch bilgisini de gecti icerde kontrol etti, dogrusu o herkes kendi isini yapsin:   
                                  invalid = {!element.validation.valid && element.touched}

                                  />;
        })
        console.log("error", this.props.error);
        let errorInfo = (this.props.error)?<span className={classes.InputElement} style={{color:'red'}}>{this.props.error}</span>:null;

        let form = (                
            <div>
                <h4>Enter Your Login Info</h4>
                <form onSubmit={this.orderHandler} autoComplete="off">
                    {errorInfo}
                    {elements}
                    <Button btnType="Success" disabled={!this.state.formIsValid} > {this.state.isSignUp?'Sign Up': 'Login'}</Button>
                </form>
                <Button btnType="Danger" onClick={this.switchSignHandler}>Switch to {this.state.isSignUp?'SignIn': 'SignUp'}</Button>                
            </div> 
        );
        if(this.props.loading){
            form = <Spinner />
          }
  
        return (
            <div className={classes.Auth}> 
                {/**Yetki varsa burger hazirlamaya... */}
                {authorized}                               
                {form}                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (loginData) => dispatch(actions.login(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
