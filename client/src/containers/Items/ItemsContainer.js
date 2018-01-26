import React, { Component } from "react";
import Items from "./Items";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItemsAndUsers } from "../../redux/modules/items";

class ItemsContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchItemsAndUsers());
  }

  render() {
    // if this.props.isLoading) return <Loader/>
    // console.log(items);
    return <Items items={this.props.itemsFilter} />;
  }
}

ItemsContainer.propTypes = {
  items: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  items: state.items.items,
  error: state.items.error,
  itemsFilter: state.items.itemsFilter
});

export default connect(mapStateToProps)(ItemsContainer);
