import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebaseAuth } from "../../config/firebaseConfig";
import {connect} from 'react-redux';
import Login from "./Login";
import { userLoading } from "../../redux/modules/auth";

class LoginContainer extends Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      emailInputValue: "",
      passwordInputValue: "",
      logicError: {message: ""}
    };
  }
  handleEmail = e => {
    console.log(e.target.value);
    this.setState({ emailInputValue: e.target.value });
  };
  handlePassword = e => {
    console.log(e.target.value);
    this.setState({ passwordInputValue: e.target.value });
  };

  trylogin = () => {
    if (this.state.emailInputValue && this.state.passwordInputValue) {
      firebaseAuth.signInWithEmailAndPassword(
          this.state.emailInputValue,
          this.state.passwordInputValue
        )

        .then(args => {
          this.props.history.push('/');
          
        })
        .catch(error => {
          this.setState({logicError: error})
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }
  };

  render() {
    return (
      <Login
        trylogin={this.trylogin}
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        emailInputValue={this.state.emailInputValue}
        passwordInputValue={this.state.passwordInputValue}
        logicError={this.state.logicError}
      />
    );
  }
}
const mapStateToProps = state => {
  authenticated: state.auth.authenticated;
  userLoading: state.auth.userLoading;
}

export default connect(mapStateToProps)(LoginContainer);
