import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import ValidatedTextField from "../../components/ValidatedTextField";
import "./styles.css";
import logo from "../../images/boomtown-logo.svg";
import bottomLeft from "../../images/home-bl.svg";
import topRight from "../../images/home-tr.svg";

const Login = ({
  trylogin,
  handleEmail,
  handlePassword,
  emailInputValue,
  passwordInputValue,
  logicError
}) => (
  <div className="page login">
    <div className="logo">
      <img src={logo} alt="Boomtown Logo" />
    </div>
    <div className="topRight">
      <img src={topRight} alt="Sky" />
    </div>
    <div className="bottomLeft">
      <img src={bottomLeft} alt="City" />
    </div>
    <div className="cardContainer">
      <Paper zDepth={5}>
        <div className="formContainer">
          <form
            onSubmit={e => {
              e.preventDefault();
              trylogin();
            }}
            autoComplete="off"
          >
            <div>
              <ValidatedTextField
                handleChange={handleEmail}
                value={emailInputValue}
                label="Email"
              />
            </div>
            <div>
              <ValidatedTextField
                handleChange={handlePassword}
                value={passwordInputValue}
                label="Password"
              />
            </div>
            <RaisedButton
              className="enterButton"
              primary
              fullWidth
              type="submit"
              onClick={trylogin}
            >
              Enter
            </RaisedButton>
          </form>
        </div><p>{logicError.message}</p>
      </Paper>
    </div>
  </div>
);

export default Login;
