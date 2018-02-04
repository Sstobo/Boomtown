import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FontIcon from "material-ui/FontIcon";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import { firebaseAuth } from "../../config/firebaseConfig";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "material-ui/Toolbar";
import { filterItems } from "../../redux/modules/items";

import firebase from "firebase";



export class HeaderBar extends React.Component {
  logOut = e => {
		e.preventDefault();
		firebase.auth().signOut();
	};
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, index, values) => {
    console.log("change")
   
    this.props.dispatch(filterItems(values, this.props.items));
      console.log("Values in headerbar: " , values)
        console.log("this.props in headerbar: ", this.props.items)
    this.setState({ values });
        console.log("{value} in headerbar ",{values})
  };  

  render() {
    const userProfile = firebaseAuth.currentUser.uid;
    const { values } = this.state;
    console.log("rendered state:", this.state)
    return (
      <Toolbar
        style={{
          backgroundColor: "white",
          paddingRight: "24px",
          height: "70px"
        }}
        className={"header-bar"}
      >
        <ToolbarGroup firstChild={true}>
          <Link to="/">
            <img
              alt="logo"
              src={require("../../images/boomtown-logo.svg")}
              className="logo-image"
            />
          </Link>

          <SelectField
            multiple={true}
            className="select-field"
            floatingLabelText="Select your tab"
            value={this.props.tags}
            onChange={this.handleChange}
          >
            <MenuItem
              insetChildren
              checked={values && values.indexOf("Household Items") > -1}
              value={"Household Items"}
              primaryText={"Household Items"}
            />
            <MenuItem
              insetChildren
              checked={values && values.indexOf("Recreational Equipment") > -1}
              value={"Recreational Equipment"}
              primaryText={"Recreational Equipment"}
            />
            <MenuItem
              insetChildren
              checked={values && values.indexOf("Musical Instruments") > -1}
              value={"Musical Instruments"}
              primaryText={"Musical Instruments"}
            />
            <MenuItem
              insetChildren
              checked={values && values.indexOf("Tools") > -1}
              value={"Tools"}
              primaryText={"Tools"}
            />
            <MenuItem
              insetChildren
              checked={values && values.indexOf("Physical Media") > -1}
              value={"Physical Media"}
              primaryText={"Physical Media"}
            />
            <MenuItem
              insetChildren
              checked={values && values.indexOf("Electronics") > -1}
              value={"Electronics"}
              primaryText={"Electronics"}
            />
          </SelectField>
        </ToolbarGroup>

        <ToolbarGroup>
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
        
          <Link to={`/profile/${userProfile}`}>
          	<RaisedButton label="My Profile" primary />  
          </Link>
          
          <RaisedButton
							className="navbar-logout-button"
							label="Logout"
							backgroundColor="#263238"
							labelColor="#fff"
							onClick={this.logOut}
						/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  items: state.items.items,
  tags: state.items.tags,
  itemsFilter: state.items.itemFilter,
  error: state.items.error
});
export default connect(mapStateToProps)(HeaderBar);
