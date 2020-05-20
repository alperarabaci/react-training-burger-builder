import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/action";
import { Redirect } from "react-router-dom";

class Logout extends Component {

    componentWillMount(){
        this.props.onLogOut();
    }

    render() {
        return ( <Redirect to="/" /> );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
