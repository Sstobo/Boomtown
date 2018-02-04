import React from "react";
import Masonry from "react-masonry-component";
import Styles from "./styles.js";
import ItemCard from "../ItemCard/ItemCard";

const ItemCardList = ({ items, owner }) => (
  <div className={"list-container"} style={Styles.ListContainer}>
    <Masonry>
    
      {items && items.map(item => (
        <div key={item.id} className={"single-item"} style={Styles.SingleItem}>
          <ItemCard           
            item={item}
            owner={item.itemowner.id}
            key={item.id}
          />
        </div>
      ))}
    </Masonry>
  </div>
);

export default ItemCardList;