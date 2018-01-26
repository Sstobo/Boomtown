import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "material-ui/CircularProgress";
import ItemCardList from "../../components/ItemCardList";
import Gravatar from "react-gravatar";
import Paper from "material-ui/Paper";

const Profile = ({ items, isLoading }) => {
  return !isLoading ? (
    <div>
      <Paper
        className="paper"
        children={
          <div className="paper-wrap">
            <div className="paper-left">
              <h2>{items[0] && items[0].itemowner.fullname}</h2>
              <p>{items[0] && items[0].itemowner.bio}</p>
            </div>
            <div className="paper-right">
              <Gravatar
                size={180}
                className="gravatar"
                email={items[0] && items[0].itemowner.email}
              />
            </div>
          </div>
        }
      />
      <ItemCardList items={items} />
    </div>
  ) : (
    <div className="loading-wrapper">
      <CircularProgress color="white" />
    </div>
  );
};
Profile.propTypes = {
  items: PropTypes.array.isRequired
};
export default Profile;
