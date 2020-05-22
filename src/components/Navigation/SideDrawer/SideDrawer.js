import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    // ...
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={[classes.SideDrawer,(props.open? classes.Open: classes.Close) ].join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuthenticated} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;