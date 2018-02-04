import React, { Component } from "react";
import Items from "./Items";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
class ItemsContainer extends Component {
  render() {
    const { loading, items } = this.props.data;
    console.log("items to be passed to itemcards: " , items);
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
      
      description
      available
      tags {
        id
        title
      }
    }
  }
`;
const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  items: state.items.items,
  tags: state.items.tags,
  itemsFilter: state.items.itemFilter,
  error: state.items.error
});

export default compose(graphql(fetchItems), connect(mapStateToProps))(
  ItemsContainer
);