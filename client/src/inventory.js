import React from 'react';
import {Router} from 'react-router';
import {AdventureAPI} from './AdventuresAPI';
import {browserHistory} from 'react-router';
import * as api from './api';
//it's not API either

var Inventory = React.createClass({

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
	var previous = this.props.params.advID;
//maybe we can put the api.getAllItems() method in here?	
	var myInv = this.state.items;
	console.log("Inventory Items: " + myInv);
	var items = myInv.map(function(item, index)
	{
	return(
	<p><a href={"inventory/" + item.id}>{item.name}</a></p>
	)	
	}
	);

	return(
	<div>
	{items}
	<a href={"../" + previous}>Return to Adventure</a>
	</div>
	);
	
	return(null)
	
	}
	
	});

export default Inventory;