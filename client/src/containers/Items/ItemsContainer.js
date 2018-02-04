import React, { Component } from "react";
import Items from "./Items";
import PropTypes from "prop-types";
import { fetchItemsAndUsers } from "../../redux/modules/items";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
class ItemsContainer extends Component {


  render() {
    const { loading, items } = this.props.data;
    console.log("items to be passed to itemcards: " , items);

    let filtered = [];

    if (items) {
      filtered = items.filter(item => {
        return item.tags.some(tag => {
          return this.props.selectedTags.includes(tag.title);
        });
      });
    }
  
    return loading ? <p> Loading </p> : <Items list={this.props.selectedTags.length === 0 ? items : filtered} />;
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