import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SelectField from "material-ui/SelectField";
import { setFilterValue } from "../../redux/modules/filter";
import FontIcon from "material-ui/FontIcon";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import logo from "../../images/boomtown-logo.svg";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "material-ui/Toolbar";
import Paper from "material-ui/Paper";
import { firebaseAuth } from "../../config/firebaseConfig";

import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";


const style = {
  marginRight: 20
};
class ToolbarExamplesSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }
  handleChange = (event, index, selected) => {
    this.props.dispatch(setFilterValue(selected));
  };
  handleSignOut() {
    if (firebaseAuth.currentUser) {
      firebaseAuth.signOut();
      return true;
    }
  }
  render() {
    console.log(firebaseAuth.currentUser.uid)
    return (
      <Paper zDepth={3}>
        <Toolbar className="header-bar" style={{ backgroundColor: "#fff" }}>
          <ToolbarGroup firstChild={true}>
            <ToolbarSeparator />
            <a href="/">
              <img alt="HeaderLogo" className="logo-image" src={logo} />
            </a>  
            <SelectField
              className="SelectField"
              multiple
              autoWidth={true}
              floatingLabelText="Filter by Tag"
              onChange={this.handleChange}
              value={this.props.selectedFilters}
            >
              {this.props.filters.map(tag => (
                <MenuItem
                  key={tag.title}
                  checked={
                    this.props.selectedFilters.find(f => f === tag.title)
                      ? true
                      : false
                  }
                  value={tag.title}
                  primaryText={tag.title}
                />
              ))}
            </SelectField>
          </ToolbarGroup>
          <ToolbarGroup className="buttonbox">
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            <Link to={`/profile/${firebaseAuth.currentUser.uid}`}>
              <RaisedButton label="My Profile" primary={true} />
            </Link>
            <ToolbarSeparator />
            <Link to="/login">
              <RaisedButton
                label="Logout"
                secondary={true}
                onClick={this.handleSignOut}
              />
            </Link>
          </ToolbarGroup>
        </Toolbar>
        <Link to="/share">
          <FloatingActionButton
            secondary={true}
            className="share-button"
            style={style}
          >
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </Paper>
    );
  }
}
const mapStateToProps = state => {
  return {
    filters: state.filter.filters,
    selectedFilters: state.filter.selectedFilters,
    user: state.auth.authId
  };
};

export default connect(mapStateToProps)(ToolbarExamplesSimple);