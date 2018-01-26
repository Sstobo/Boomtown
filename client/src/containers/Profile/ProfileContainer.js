import React, { Component } from "react";
import Profile from "./Profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItemsAndUsers } from "../../redux/modules/profile";

class ProfileContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchItemsAndUsers(this.props.match.params.userid));
  }
  render() {

    return <Profile items={this.props.items} />;
  }
}

ProfileContainer.propTypes = {
  items: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.profile.isLoading,
  items: state.profile.items,
  error: state.profile.error
});

export default connect(mapStateToProps)(ProfileContainer);
