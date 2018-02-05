import React, { Component } from "react";
import Profile from "./Profile";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const fetchUsers = gql`
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

class ProfileContainer extends Component {
  render() {
    const { loading, user } = this.props.data;
    return loading ? (
      <h2> Loading</h2>
    ) : (
      <Profile list={user.shareditems} user={user} />
    );
  }
}
export default graphql(fetchUsers, {
  options: ownProps => ({
    variables: {
      id: ownProps.match.params.id
    }
  })
})(ProfileContainer);
