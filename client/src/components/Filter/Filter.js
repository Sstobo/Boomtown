import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Filters } from "../../redux/modules/filter";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class FilterMenu extends Component {
	state = {
		values: []
	};

	handleChange = (event, index, values) => {
		this.setState({ values });
		this.props.dispatch(Filters(values)); 
	};

	menuItems(values) {
		return this.props.tags.map(tag => (
			<MenuItem
				key={tag}
				insetChildren={true}
				checked={values && values.indexOf(tag) > -1}
				value={tag}
				primaryText={tag}
			/>
		));
	}
	render() {
		const { values } = this.state;
		return (
			<SelectField
				multiple={true}
				className="navbar-filter"
				hintText="Filter by Tag"
				value={values} 
				onChange={this.handleChange}
			>
				{this.menuItems(values)}
			</SelectField>
		);
	} 
}
const mapStateToProps = state => ({
	tags: state.items.tags
});
export default connect(mapStateToProps)(FilterMenu);