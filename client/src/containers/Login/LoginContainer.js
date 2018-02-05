import React, { Component } from "react";
import { firebaseAuth } from "../../config/firebaseConfig";
import {connect} from 'react-redux';
import Login from "./Login";

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
    this.setState({ emailInputValue: e.target.value });
  };
  handlePassword = e => {
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
}

export default connect(mapStateToProps)(LoginContainer);
