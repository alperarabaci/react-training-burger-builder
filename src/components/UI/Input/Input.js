import React from 'react';

import classes from './Input.css';
const input = (props) => {

    let inputElement = null;
    const inputClasses =  [classes.InputElement];

    let invalidMessage = null;
    if(props.invalid){
        inputClasses.push(classes.Invalid);
        invalidMessage = <p className={classes.Invalid}>Please enter a valid 
                                    <span style={{textTransform:'capitalize'}}>{props.name}</span>
                        </p>
    }
    switch(props.elementType) {
        case('input'):
            inputElement = <input className={inputClasses.join(' ')}{...props.elementConfig} value={props.value} onChange={props.changed}/>
        break;
        case('textarea'):
            inputElement = <textarea className={classes.Textarea}{...props.elementConfig} value={props.value} onChange={props.changed}/>
        break;
        case('select'):
            inputElement = <select className={classes.InputElement}  value={props.value} onChange={props.changed}>
                                { props.elementConfig.options.map(myOption => (
                                    <option key={myOption.value} value={myOption.value}>{myOption.displayValue}</option>
                                ))}
                           </select>
        break;        
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;

    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {invalidMessage}
        </div>
    );
};

export default input;

