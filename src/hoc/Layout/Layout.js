import React, {Component} from 'react';
import Aux from '../Aux/Aux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawClosedHandler = () => {
        console.log('Close');
        this.setState({showSideDrawer: false});
    }
    
    menuToggleHandler = () => {
        console.log('Toggle');
        this.setState( (pervState) => {
            return {showSideDrawer: !pervState.showSideDrawer}
        });
    }

    render() {

        return(
            <Aux>
                <Toolbar clicked={this.menuToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
}

export default Layout;