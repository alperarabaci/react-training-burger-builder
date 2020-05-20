import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    let auth = props.isAuthenticated ?  <NavigationItem link="/logout">Logut</NavigationItem>  : 
                                        <NavigationItem link="/auth">Login</NavigationItem>;

    return (<ul className={classes.NavigationItems}>
       <NavigationItem link="/" active>Burger Builder</NavigationItem>
       <NavigationItem link="/checkout">Checkout</NavigationItem>
       <NavigationItem link="/orders">Orders</NavigationItem>
       {auth}
    </ul>)
}

export default navigationItems;