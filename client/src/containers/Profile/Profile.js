import React from "react";
import PropTypes from "prop-types";
import ItemCard from "../../components/ItemCard";
import Gravatar from "react-gravatar";
import Paper from "material-ui/Paper";
import Masonry from "react-masonry-component";

const Profile = ({ list, user }) => {
  return (
    <div>
      <Paper
        className="paper"
        children={
          <div className="paper-wrap">
            <div className="paper-left">
            <h1>{user.fullname}</h1>
							<p>{user.bio}</p>
            </div>
            <div className="paper-right">

							<div>
								<p>{list.length}</p>
								<p>Items shared</p>
								<p>{user.shareditems.length}</p>
								<p>Items borrowed</p>{" "}
							</div>
              
            </div>
            <Gravatar
                size={180}
                className="gravatar"
                email={list[0] && list[0].itemowner.email}
              />
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

