import React from 'react';
import {Router} from 'react-router';
import {AdventureAPI} from './AdventuresAPI';
import {browserHistory} from 'react-router';

var Inventory = React.createClass({
	render: function(){
	var previous = this.props.params.advID;	
	var myInv = this.props.route.inv;	
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