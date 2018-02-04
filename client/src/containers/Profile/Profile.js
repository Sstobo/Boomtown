import React from "react";
import ItemCard from "../../components/ItemCard";
import PropTypes from "prop-types";
import Masonry from "react-masonry-component";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Gravatar from "react-gravatar";
// import ItemsContainer from './Items';

const Profile = ({ list, user }) => {
  return (
    <div className={"user-profile"}>
      <div className={"user-card-container"}>
        <Card className={"user-card"}>
          <div className={"container"}>
            <div className={"flex-container"}>
              <h1 className={"user-name"}>
                {" "}
                {list[0] && list[0].itemowner.fullname}
              </h1>
              <p> {list[0] && list[0].itemowner.bio}</p>
            </div>

            <div className={"share"}>
              <p> {list.length} items shared</p>
              {/* <p> {borrowed.length} items borrowed</p> */}
            </div>
          </div>

          <Gravatar
            size={200}
            className={"grav"}
            email={list[0] && list[0].itemowner.email}
          />
        </Card>
      </div>

      <div className={"list-container"}>
        <Masonry>
          {list.map(item => (
            <li key={item.id} className={"single-item"}>
              <ItemCard item={item} key={item.id} />
            </li>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

Profile.propTypes = {
  list: PropTypes.array.isRequired
  // borrowed: PropTypes.array.isRequired
};

export default Profile;