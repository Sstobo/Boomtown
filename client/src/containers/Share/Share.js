import React from "react";
import Placeholder from "../../images/item-placeholder.jpg";
import Gravatar from "react-gravatar";
import firebase from "firebase";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {
	Card,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from "material-ui/Card";
import { firebaseAuth } from "../../config/firebaseConfig";
import TextField from "material-ui/TextField";

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

const getUsers = gql`
  query fetchUser($id: ID) {
    user(id: $id) {
      id
      fullname
      email
    }
  }
`;


class Share extends React.Component {
	state = {
		finished: false,
		stepIndex: 0,
		newtitle: "Placeholder Text",
		newDescription: "Placeholder description",
		newImage: "",
		newTags: []
		
	};
	handleUpdateTitle = e => {
		this.setState({
			title: e.target.value
		});
	};

	handleUpdateDescription = e => {
		this.setState({
		  description: e.target.value
		});
	  };
	
	
	handleNext = () => {
		const { stepIndex } = this.state;
		this.setState({
			stepIndex: stepIndex + 1,
			finished: stepIndex >= 2
		});
	};
	handlePrev = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1 });
		}
	};
	renderStepActions(step) {
		const { stepIndex } = this.state;
		return (
			<div style={{ margin: "12px 0" }}>
				<RaisedButton
					label={stepIndex === 3 ? "Confirm" : "Next"}
					disableTouchRipple={true}
					disableFocusRipple={true}
					primary={true}
					onClick={this.handleNext}
					style={{ marginRight: 12 }}
				/>
				{step > 0 && (
					<FlatButton
						label="Back"
						disabled={stepIndex === 0}
						disableTouchRipple={true}
						disableFocusRipple={true}
						onClick={this.handlePrev}
					/>
				)}
			</div>
		);
	}

	// Handlers for custom functionality
	// https://time2hack.com/2017/10/upload-files-to-firebase-storage-with-javascript/

	handleSelectClick = () => document.getElementById("imageInput").click();

	handleImageUpload = input => {
	   const ref = firebase.storage().ref();
		const file = input.target.files[0];
		const name = +new Date() + "-" + file.name;
		const metadata = {
			contentType: file.type
		};
		const task = ref.child(name).put(file, metadata);
		task
			.then(snapshot => {
				const url = snapshot.downloadURL;
				this.setState( {newImage: url})
				document.querySelector("#someImageTagID").src = url;
			})
			.catch(error => {
				console.error(error);
			});
	};

	render() {
		const {
		  finished,
		  stepIndex,
		  title,
		  description,
		  newImage,
		  selectedTags
		} = this.state;
		const { user } = this.props.data;
	

		return (
			<div className="share-wrapper">
				<div className="left-card">
					<Card className="share-card">
					
						<CardMedia className="card-media">
							<img src={newImage ? newImage : Placeholder}
							 alt="placeholder for upload" />
						</CardMedia>

						<CardHeader
							title="Generic User"
							subtitle="Moment(item.created).fromNow()"
							avatar={
								<Gravatar className="photo" email="item.itemowner.email" />
							}
						/>

						<CardTitle title="Item Title" />

						<CardText>Item Description</CardText>
					</Card>
				</div>

				<div style={{ maxWidth: 380, maxHeight: 400, margin: "auto" }}>
					<Stepper activeStep={stepIndex} orientation="vertical">
						<Step>
							<StepLabel>Add an Image</StepLabel>
							<StepContent>
								<p>
									Image Upload
								</p>
								<RaisedButton
									label="Select an Image"
									onClick={this.handleSelectClick}
								>
									<input
										type="file"
										accept="image/*"
										onChange={this.handleImageUpload}
										hidden
										id="imageInput"
									/>	
								</RaisedButton>
								{this.renderStepActions(0)}
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Add a Title & Description</StepLabel>
							<StepContent>
								<p>
									Folks need to know what you're sharing. Give them a clue by
									adding a title & description.
								</p>
								<TextField
								onChange={this.handleUpdateTitle}
								hintText="Title"
								floatingLabelText="Title"
							  />
							  <TextField
								onChange={this.handleUpdateDescription}
								hintText="Description"
								floatingLabelText="Description"
							  />
								{this.renderStepActions(1)}
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Categorize Your Item</StepLabel>
							<StepContent>
								<p>
									To share an item, you'll add it to our list of categories. You
									can select multiple categories.
								</p>
							
								{this.renderStepActions(2)}
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Confirm Things!</StepLabel>
							<StepContent>
								<p>
									Great! If you're happy with everything, tap the Confirm
									button.
								</p>
								{this.renderStepActions(2)}
							</StepContent>
						</Step>
					</Stepper>
				</div>
			</div>
		);
	}
}

export default graphql(getUsers, {
	options: ownProps => ({
	  variables: {
		id: firebaseAuth.currentUser.uid 
	  }
	})
  })(Share);
