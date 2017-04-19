  import React from 'react';
    import ReactDOM from 'react-dom';
    import ParaQuest from './main';
    import '../node_modules/bootstrap/dist/css/bootstrap.css';
	//import Adventures from './Adventures';
	import { Router, Route, IndexRoute, browserHistory } from 'react-router';
	import AdventureView from './adventurePage';
	import Inventory from './inventory';
	import Item from './item';
	
		    var App = React.createClass({
				
					changeStats : function (type, amount){
					switch(type){
					case 'strength':
					stats.strength += amount;
					break;	
					case 'brains':
					stats.brains += amount;
					break;
					case 'charm':
					stats.charm += amount;
					}	
					},

				
      render : function() {
        return (
            <div className="container">
               <div className="row">
                  <div className="col-md-6 col-md-offset-3">
                     <div className="page-header">
                           {this.props.children}
							
                     </div>
                   </div>
                </div>
              </div>
        )
      }
    });
			var STR = 'Strength: ';		
	
	var invData = [
	{
	id: 'ironSword',	
	name: 'Iron Sword',
	text: 'A simple, iron sword'
	},
	{
	id: 'woodShield',
	name: 'Wooden Shield',
	text: 'A simple wooden shield'
	},
	{
	id: 'healPotion',
	name: 'Healing Potion',
    text: 'Heals you right up'	
	},
	{
	id: 'invisPotion',
	name: 'Potion of Invisibility',
    text: 'Makes you invisible for a few minutes'	
	},
	{
	id: 'cheese',
	name: 'Hunk of dry cheese',
	text: 'A piece of old, stale cheese. At least there is no mould on it'
	}
	
	];
	
	var stats = 
	{
	strength : 5,
    brains: 5,
    charm: 5,
	injuries: 0,
	stress: 0,
	scandal: 0
	};//these are the beginning stats
	//we need these to be updated whenever a relevant update check passes in adventurePage.
	
/*	   ReactDOM.render(
      <ParaQuest character={stats} adventures={Adventures}/>,
      document.getElementById('root')
    ); */
	
	  ReactDOM.render(
     (
      <Router history={browserHistory} >
	  <Route path="/" component={App}>
           <IndexRoute component={ParaQuest} character={stats}/>
           <Route path="/:advID" component={AdventureView} character={stats}/>
		   <Route path="/:advID/inventory" component={Inventory} inv={invData}/>
		   <Route path="/:advID/inventory/:itemName" component={Item} inv={invData}/>
		   //a route for each item? It'd be a cheap way to get another route.
		   </Route>
      </Router>
    ),
      document.getElementById('root')
  );