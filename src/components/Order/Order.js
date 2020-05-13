import React from 'react';
import classes from './Order.css';


const order = (props) => {
    /*
    Benim yaptigim: :((
    console.log('Order:', props);
    let data = null;
    if(props.order.ingredients){
        data = Object.keys(props.order.ingredients).map(key =>{
            return key + '('+props.order.ingredients[key]+'), ';
        }).reduce( ( text, el ) => {
            return text + el;
        }, '');
        data = data.slice(0,data.length-2);
        console.log(data);
    }
    Elaman cok guzel yapti yine:
    */
   let ingredients = [];
   for(let ingredientName in props.order.ingredients){
        ingredients.push(
            {
                name: ingredientName,
                amount: props.order.ingredients[ingredientName]
            }
        )
   }

   const ingOutput = ingredients.map(ig => {
        return <span style = {{
                            textTransform: 'capitalize',
                            paddingLeft: '10px',
                            margin: '0 8px',
                            border: '1px solid #ccc',
                            padding: '5px'
                            }} key={ig.name}>{ig.name} ({ig.amount})</span>
   });
    
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingOutput}</p>
            <p>Price <strong>{(+props.order.price).toFixed(2)}</strong></p>
        </div>
    );

}

export default order;