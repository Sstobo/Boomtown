import React from "react";
import moment from "moment";
import Gravatar from "react-gravatar";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

const ItemCard = ({ item }) => (
  <div>
    
    <Card>
      {item.borrower ? (
        <CardMedia
          overlay={
            <CardTitle title={`Borrowed by ${item.borrower.fullname}`} />
          }
        >
          <img src={item.imageurl} alt="item for borrowing" />
        </CardMedia>
      ) : (
        <CardMedia>
          <img src={item.imageurl} alt="item for borrowing" />
        </CardMedia>
      )}
      <Link to={"/profile/" + item.itemowner.id}>
        <CardHeader
          title={item.itemowner.fullname}
          subtitle={moment(item.created).fromNow()}
          avatar={<Gravatar email={item.itemowner.email} />}
        />
      </Link>

      <CardTitle
        title={item.title}
        subtitle={item.tags.map(tag => tag.title).join(", ")}
      />
      <CardText>{item.description}</CardText>
      <CardActions>
        <RaisedButton
          label="Borrow"
          backgroundColor="#263238"
          labelColor="#fff"
          primary={false}
          style={{ marginLeft: "0" }}
        />
        
      </CardActions>
    </Card>
  </div>
);
export default ItemCard;
