import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import { connect } from 'react-redux';


import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import * as actions from '../../store/action/';


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
                <Toolbar isAuthenticated = {this.props.isAuthenticated}
                         clicked={this.menuToggleHandler}/>
                <SideDrawer isAuthenticated = {this.props.isAuthenticated}
                            open={this.state.showSideDrawer} 
                            closed={this.sideDrawClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,      
    }
  }
  
  
export default connect(mapStateToProps, null)(Layout);