import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "material-ui/CircularProgress";
import ItemCardList from "../../components/ItemCardList";
import ItemCard from "../../components/ItemCard";
import Gravatar from "react-gravatar";
import Paper from "material-ui/Paper";
import Masonry from "react-masonry-component";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

const Profile = ({ list, user }) => {
  return (
    <div>
      <Paper
        className="paper"
        children={
          <div className="paper-wrap">
            <div className="paper-left">
              <h1> {list[0] && list[0].itemowner.fullname}</h1>
              <p> {list[0] && list[0].itemowner.bio}</p>
            </div>
            <div className="paper-right">
              <Gravatar
                size={180}
                className="gravatar"
                email={list[0] && list[0].itemowner.email}
              />
            </div>
          </div>
        }
      />
    
      <div className={"list-container"}>
        <Masonry>
          {list.map(item => (
            <div key={item.id} className={"single-item"}>
              <ItemCard item={item} key={item.id} />
            </div>
          ))}
        </Masonry>
        </div>
    </div>
  ) 
  
};
Profile.propTypes = {
  items: PropTypes.array.isRequired
};
export default Profile;



// import ItemsContainer from './Items';

