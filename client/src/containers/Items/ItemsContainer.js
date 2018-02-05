
import React, { Component } from "react";
import Items from "./Items";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ItemsContainer extends Component {
  propTypes = {
    loading: PropTypes.bool,
    items: PropTypes.array
  };
  render() {
    const { loading, items, error } = this.props.data;
    let filtered = [];
    if (loading)
      return (
       <p> Loading </p>
      );
    else if (error) {
      console.log(error);
      return <p>error</p>;
    } else if (items)
      filtered = items.filter(item => {
        return item.tags.some(tag => {
          return this.props.selectedFilters.includes(tag.title);
        });
      });

    return (
      <Items
        items={this.props.selectedFilters.length === 0 ? items : filtered}
      />
    );
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
      borrower {
        id
        fullname
      }
      tags {
        id
        title
      }
    }
  }
`;



const mapStateToProps = state => {
  return {
    filters: state.filter.filters,
    selectedFilters: state.filter.selectedFilters,
    user: state.auth.authId
  };
};

export default compose(graphql(fetchItems), connect(mapStateToProps))(
  ItemsContainer
);

