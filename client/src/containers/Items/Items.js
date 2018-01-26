import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "material-ui/CircularProgress";
import ItemCardList from "../../components/ItemCardList";

const Items = ({ items, isLoading }) => {
  return !isLoading ? (
    <ItemCardList items={items} />
  ) : (
    <div className="loading-wrapper">
      <CircularProgress color="white" />
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.array.isRequired
};
export default Items;
