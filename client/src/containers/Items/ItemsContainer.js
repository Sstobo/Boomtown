import React, { Component } from "react";
import Items from "./Items";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class ItemsContainer extends Component {
  render() {
    const { loading, items } = this.props.data;
    console.log(items);
    return loading ? <p> Loading </p> : <Items items={items} />;
  }
}

const fetchItems = gql`
  query {
    items {
      id
      imageurl
      title
      created
      itemowner {
        id
        fullname
        email
      }
      itemurl
      description
      available
      tags {
        id
        title
      }
    }
  }
`;

export default graphql(fetchItems)(ItemsContainer);
// export default connect(mapStateToProps)(ItemsContainer);
