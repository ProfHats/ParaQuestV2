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
	//Diarmuid suggested that the new version could not be transpiled, which might explain why
	//it was sticking with the old version. I'm in the process of commenting out code bit by bit,
	//until we finally get the thing to transpile properly
	//getInitialState and componentDidMount turned out not to change anything, so that's not the
	//part to blame
	
	render: function(){
/*	var previous = this.props.params.advID;
//maybe we can put the api.getAllItems() method in here?	
	var myInv = this.state.items;
	Console.log("Inventory Items: " + myInv);
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
	*/
	}
	
	});

export default Inventory;