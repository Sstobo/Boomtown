import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Share from "./Share";

class ShareContainer extends Component {
  static propTypes = {};
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      imageurl: ""
    };
  }


  render() {
    return <Share />;
  }
}

const addAnItem = gql`
  mutation addNewItem(
    $title: String
    $description: String
    $imageurl: String
    $itemowner: ID
    $tags: [TagInput]
  ) {
    createNewItem(
      newItem: {
        title: $title
        description: $description
        imageurl: $imageurl
        itemowner: $itemowner
        tags: $tags
      }
    ) {
      title
    }
  }
`;

export default graphql(addAnItem)(ShareContainer);
