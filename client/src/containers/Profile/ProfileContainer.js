import React, { Component } from "react";
import Profile from "./Profile";
import PropTypes from "prop-types";
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import { connect } from "react-redux";
// import { fetchItemsAndUsers } from "../../redux/modules/profile";

class ProfileContainer extends Component {
  // componentDidMount() {
  //   this.props.dispatch(fetchItemsAndUsers(this.props.match.params.userid));
  // }
  render() {
const {loading, user } = this.props.data;
console.log(user)
    return loading ?
    <p> Loading </p>
      :

    <Profile items={user.shareditems}  />;
    
  }
}
const fetchUser = gql`
    query fetchUser($id: ID) {
        user(id: $id) {
            id
            email
            fullname
            bio
            shareditems {
                id
                title
                itemowner {
                    id
                    email
                    fullname
                }
                borrower {
                    id
                    fullname
                }
                created
                imageurl
                description
                available
                tags {
                    id
                    title
                }
            }
           
        }
    }
 `;
ProfileContainer.propTypes = {
  items: PropTypes.array.isRequired
};




export default graphql(fetchUser, {
  options: ownProps => ({ 
    variables: {
      id: ownProps.match.params.userid
    }
  })
})
(ProfileContainer);

// const mapStateToProps = state => ({
//   isLoading: state.profile.isLoading,
//   items: state.profile.items,
//   error: state.profile.error

// });

// export default connect(mapStateToProps)(ProfileContainer);
