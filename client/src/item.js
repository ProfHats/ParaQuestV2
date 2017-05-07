import React from 'react';
import {Router} from 'react-router';
import {AdventureAPI} from './AdventuresAPI';
import {browserHistory} from 'react-router';
import * as api from './api';

var Item = React.createClass({
	
		getInitialState:function(){
	return{items: ["bar"]};	
	},

	componentDidMount:function(){
		
	api.getAllItems().then(resp => {
	this.setState({
	items: resp,
	});
	}).catch(e => {
	console.log(e);
	})
	},
	
	render: function(){
	var inventory = this.state.items;
	console.log("This many items are present: " + inventory.length);
	var thisItemName = this.props.params.itemName;
	var descriptions = inventory.map(function(item, index)
	{
	if(item.id === thisItemName){	
	return(
	<div>
	<p>{item.text}</p>
	<p>{"It is good for " + item.charges + " more uses."}</p>
	</div>
	)
	}
	}
	);
	return (
	<div>
	{descriptions}
	</div>
	);
	}
	});
	
	export default Item;