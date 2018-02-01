import React from "react";
import PropTypes from "prop-types";
import FooterBar from "../FooterBar/FooterBar";
import HeaderBar from "../HeaderBar/HeaderBar";
import {connect } from 'react-redux';


// const Layout = ({ children, loading, authenticated })
const Layout = ({ children, userLoading, authenticated }) => (
  
  userLoading ? "Loading..." :
  <div className="appContentWrapper">
  

    <div className="appHeader">

{ authenticated && <HeaderBar /> }
     
    </div>
    <div className="appContent">{children}</div>
{ authenticated && <FooterBar /> } 
  </div>
);

Layout.defaultProps = {
  children: null
};

Layout.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = (state) => {
  return {
    userLoading: state.auth.userLoading,
    authenticated: state.auth.authenticated
  }
}
export default connect(mapStateToProps)(Layout);