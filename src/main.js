    import React from 'react';
	import {AdventureAPI} from './AdventuresAPI';
	import {Link} from 'react-router';


	var StatsBar = React.createClass({
			 //TODO: Make a CSS file that turns the "statsbar" elements into an actual bar, 
		 //so they don't stick together like glue anymore
		render : function(){
		console.log(this.props.foo.strength);
		return(
		<div>
		 <td>
	
		   Strength: {this.props.foo.strength}
		  
		  </td>
		   <td>
		   Brains: {this.props.foo.brains}
		   </td>
		   <td>
		   Charm: {this.props.foo.charm}
		   </td>
		   </div>
		);		
		}
	});
	
	var WelcomeBar = React.createClass({
		render : function()
		{
		return(
		<h1>Welcome, n, to Paraquest!</h1>
		);	
		}
	});
	
	var MainBody = React.createClass({
		//this part needs to change constantly in response to clicks by the user. But it's going to have to load a substantial amount of text, new buttons, etc.
		//How do we do that? Perhaps we can have a Component called "Main Holder" that's just a shell for the functionality, then another  
		//that loads in specific chunks of pre-rendered html for each screen?
		
		//Maybe this calls another method called FunStuff (cause it's the fun part), and this function returns the actual html. Part of this
		//HTML will be buttons which, when clicked, will somehow change what's displayed by the page - cause the Main Holder area to be reloaded
		//with new text. TURNS OUT there is such a thing as an onClick method for React, so that might work.
		//Maybe I should have a Stub API that contains the various pages of the game
		//Models: 'Page' (for the pages of the website), Enemy(?), Timer(for Adventures, Actions, etc?)
		
		
		
		render : function()
		{
		return(
		<LinkToAdventures adventures={this.props.adventures}/>
		);	
		}
	});
	
	var LinkToAdventures = React.createClass({
	//next step is figuring out how to get button pushes to load up new content	
	render : function()
	{
		var listAdv = this.props.adventures.map(function(adventure) {
		if(adventure.id === 'start'){	
		return (
		<SingleAdventure advData={adventure} />
		);
		}
		//this successfully limits us to the first adventure for the time being. To remove, remove the if statement

	}.bind(this));
		
	return(
	<div>
	{listAdv}

	</div>
	);	
	}	
		
	});
	
	var SingleAdventure = React.createClass({
		render : function()
		{
		var nextAdventures = this.props.advData.next.map(function(next) {
		return (
		<Link to={next.id}>{next.btnTxt}</Link>
		);
		}.bind(this));
		
		return(
		<div>
		<p>{this.props.advData.text}</p>
		<p>{nextAdventures}</p>
		</div>
		);	
		}
		//Each page should have 
	});
	
	
	var ParaQuest = React.createClass({
        render : function(){
         var adventures = AdventureAPI.getAll();
	
            return (
			<div>
			<WelcomeBar />
           <table>
		 <tbody>
		  <tr>
		  <StatsBar foo={this.props.route.character}/>
		   </tr>
		   </tbody>
		   </table>
		   <MainBody adventures={adventures}/>
		   </div>
            );
        }
    });
	
	export default ParaQuest;