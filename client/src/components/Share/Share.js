import React, { Component } from "react";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import VerticalStepper from "./Step";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

const Share = () => {
  return (
    <div className={"share-container"}>
      <Card className={"share-card"}>
        {/* <CardHeader /> */}

        <CardMedia>
          <img src={require("../../images/item-placeholder.jpg")} />
        </CardMedia>
        <CardTitle
          title={"Amazing Item Title"}
          subtitle={"Profound Item Desription"}
        />
        <CardText />
        <CardActions />
      </Card>
      <VerticalStepper className={"stepper"} />
    </div>
  );
};

export default Share;