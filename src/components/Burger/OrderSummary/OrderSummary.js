import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    componentWillUpdate() {
        console.log(['[OrderSummary] willupdate']);
    }

    render(){
        
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(iKeys => {
            return <li key={iKeys}>
                        <span style={{textTransform: 'capitalize'}}>{iKeys}</span>:{this.props.ingredients[iKeys]}
                    </li>
        });

        return( 
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the followin ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout</p>
                <p><strong>Total Price:</strong>{this.props.totalPrice.toFixed(2)}</p>
                <Button onClick={this.props.purchaseCanceled} btnType='Danger'>CANCEL</Button>
                <Button onClick={this.props.purchaseContinued} btnType='Success'>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;