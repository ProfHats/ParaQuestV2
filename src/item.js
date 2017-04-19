import React from 'react';
import {Router} from 'react-router';
import {AdventureAPI} from './AdventuresAPI';
import {browserHistory} from 'react-router';

var Item = React.createClass({
	render: function(){
	var inventory = this.props.route.inv;
	var thisItemName = this.props.params.itemName;
	var descriptions = inventory.map(function(item, index)
	{
	if(item.id === thisItemName){	
	return(
	<p>{item.text}</p>
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