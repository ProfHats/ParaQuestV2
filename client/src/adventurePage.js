import React from 'react';
import {Router} from 'react-router';
import {AdventureAPI} from './AdventuresAPI';
//need to get rid of this, replace it with the Mongo API
import * as api from './api';
import {browserHistory} from 'react-router';
import axios from 'axios';

    var Form = React.createClass({
       getInitialState: function() {
           return { enter: ''};
        },
		handleChange: function(event){
		this.setState({});	
		},
		
        render : function() {
           return (
             <form style={{marginTop: '30px'}}>
                <div className="form-group">
                  <input type="text"
                    className="form-control" placeholder="Title"
                    value={this.state.enter} ></input>
                </div>
    
                <button type="submit" className="btn btn-primary" onClick={this.handleCheck}>Speak</button>
              </form>
            );
          }
       });

	var StatsBar = React.createClass({
			 //TODO: Make a CSS file that turns the "statsbar" elements into an actual bar, 
		 //so they don't stick together like glue anymore
		render : function(){
		  var statStyle = {
		
		   textAlign: 'left',
		   borderStyle: 'solid',
		   borderWidth: 2,
		   	position: 'absolute',
			left: 1,
		   float: 'left'
		   };	
			
		console.log(this.props.foo.strength);
		return(
		<div style={statStyle}>
		  <tr>
		   <td><b>Your Stats</b></td>
		   </tr>
		<tr>
		 <td>
	
		   Strength: {this.props.foo.strength + " "}
		  
		  </td>
		  </tr>
		  <tr>
		   <td>
		   Brains: {this.props.foo.brains}
		   </td>
		   </tr>
		   <tr>
		   <td>
		   Charm: {this.props.foo.charm}
		   </td>
		   </tr>
		 
		 
		   </div>
		   
		
		);		
		
		
		}
	});
	
	var DamagesBar = React.createClass({
	render:function(){
	var dmgStyle = {
	borderStyle: 'solid',
	borderWidth: 2,
	position: 'absolute',
	top: 117,
	left: 1,
	
	};
	return(
	<div style={dmgStyle}>
	<tr>
	<td>
	<b>Menaces</b>
	</td>
	</tr>
	<tr>
	<td>
	Injuries: {this.props.dmgs.injuries}
	</td>
	</tr>
	<tr>
	<td>
	Stress: {this.props.dmgs.stress}
	</td>
	</tr>
	<tr>
	<td>
	Scandal: {this.props.dmgs.scandal}
	</td>
	</tr>
	</div>
	);
		
	}	
	});

var Adventure = React.createClass({
	render : function(){
		
	return(
	<a href={this.props.adventure.id}>{this.props.adventure.btnTxt}</a>
	
	);
	}
	//should set up links where the text is of the form "Open the left door" and the 
	//effect is to take you to "localhost:3000/area1left"
});

var NextAdventures = React.createClass({

render : function(){
	var dataForButtons;
	if(typeof (this.props.nextOnes) != 'undefined'){
		
	 dataForButtons = this.props.nextOnes.map(function(nextAdv,index) {
		return (
		<p><Adventure adventure={nextAdv} /></p>
		
	)}.bind(this) )
	}
	return(
	<div>
	{dataForButtons}
		
	
	</div>
	);
}
	
});

var BackArea = React.createClass({
render : function(){
if(this.props.previous != null){
return (
<a href={this.props.previous}>Go Back</a>	
);
}
else{return null}	//this worked! Sweet victory!
}	
});

var AdventureView = React.createClass({
getInitialState:function(){
	return{adventures: ["foo"], items: ["bar"], character: ["far"]};	
	},
	
goToInventory : function(advID){
	browserHistory.push(advID + "/inventory");
},

	componentDidMount:function(){
	var self = this;
	setTimeout(() => {
	self.setState({loading: false}); }, 500);	
	
	api.getAllAdventures().then(resp => {
	this.setState({
	adventures: resp,
	items: "roobar"
	});

	}).catch(e => {
		console.log(e);
		
	});

	api.getAllItems().then(resp => {
	this.setState({
	items: resp
	});
	}).catch(e => {
	console.log(e);
	});
	
	api.getCharacter().then(resp => {
	this.setState({
	character: resp	
	});
	}).catch(e => {
	console.log(e);	
	});	
	}
	,

formTest : function(guess, answer, success, failure){
var passed;
passed = AdventureAPI.formTest(guess, answer);	
if(passed){
browserHistory.push(success);	
}
else{
browserHistory.push(failure);	
}
},	

performTest : function(tName, tThresh, tStat, success, fail){
var passed;
console.log("Also upon Click: Required Stat is " + tStat);
if(tStat === 'strength'){	
passed = AdventureAPI.statTest(this.props.route.character.strength, tThresh);	
}
else if(tStat === 'brains'){
passed = AdventureAPI.statTest(this.props.route.character.brains, tThresh);	
}
else if(tStat === 'charm'){
passed = AdventureAPI.statTest(this.props.route.character.charm, tThresh);	
}
else{
var items = this.state.items;
var itemInQuestion="";
for(var x=0; x<items.length; x++){
if(items[x].id == tStat){
itemInQuestion = items[x];	//the idea is that this kind of test works only if the user has the kind of item in question
}	
}
console.log("Charges before: " + itemInQuestion.charges);
var newCharges = itemInQuestion.charges -1;
console.log("Charges afterward: " + newCharges);
var mongoID = itemInQuestion._id;
var newItem = {
   "id": itemInQuestion.id,
    "name": itemInQuestion.name,
    "text": itemInQuestion.text,
    "charges": newCharges
}
console.log("the New Item is: " + newItem.id);
console.log("It has " + newItem.charges + " uses"); 
console.log("mongo ID is " + mongoID);
api.updateItem(mongoID, newItem);
/*.then(resp => {
var newItems = this.state.items;
for (var i=0; i<this.state.items.length; i++)
{
if(this.state.items[i].id == resp.id)
{
this.state.items[i] == resp.data;//not sure if .data is needed	
}
this.setState({
items: newItems	
});	
}
}
).catch(e => {
	console.log(e);
	})
*/	
}

//does this need a .then? Maybe we're changing the database, but not calling up the data from it...maybe we need to re-change the data in the app's State?
passed = AdventureAPI.statTest(5, tThresh);//the basic Item Test should uses a stat of 5 arbitrarily because they're all usually easy, and they're luck based anyhow	


if(passed){

browserHistory.push(success);
}
else{
browserHistory.push(fail);	
}	
},

/*findAdv : function(array, id) {
var adv;
adv = array.map(function(adventure, id){
if(adventure.id == id){
return adventure;	
}
}
return adv;	
},
*/
render: function(){
	if(this.state.adventures)//this line is here to ensure that the whole thing doesn't load until the Promises return...in theory, at least
	{
	
	var self = this;
	
		/*axios.all([
		axios.get('/api/adventures'),
		]).then(function(data){
		self.setState({
		adventures : data
		});
		}.bind(this));
	*/
	//You probably shouldn't need to invoke axios directly in this file. That was the point of having the api. Invoke that instead.
		 var adventures = self.state.adventures;
		 var items = self.state.items;
		 var thisID = this.props.params.advID;
		 var thisAdventure = "";
		 console.log("thisID:" + thisID);
		 console.log("AdventureView contains this many adventures: " + adventures.length);
		 console.log("AdventureView contains this many items: " + items.length);
		 
		 for(var i = 0; i<adventures.length; i++){
		 if(adventures[i].id === thisID){
		 console.log("Testing: Before - adventure is " + adventures[i].id);	 
		 thisAdventure = adventures[i]; 
		 }	 
		 }
		 
		 /*adventures.map(function(nextAdv){
		 console.log("The current Adventure is " + nextAdv.id);	 
		 if(nextAdv.id === thisID){
		 return thisAdventure;
		 }
		 
		 //currently this is setting thisAdventure, THEN also returning it that might cause problems
		 }.bind(this)
		 );
		 */
		 console.log("Final Test: " + thisAdventure.id);
		 
	
var mainStyle = {
	position: 'absolute',
	left: 100,

};	
var statBarStyle = {
	borderStyle: 'solid black',
	borderWidth: 2
};

var successOrFail;
var responses = [];
var buttons = [];
buttons.push(<button onClick={()=> this.goToInventory(this.props.params.advID)}>Inventory</button>)
var advId = this.props.params.advID;
console.log("This ID is " + advId);
var adventure = AdventureAPI.getAdventure(advId);
console.log("This Adventure is " + thisAdventure.id);
console.log("The last Adventure was " + thisAdventure.previous);
console.log("The next Adventure will be " + thisAdventure.next);
console.log("This Adventure has these stat changes " + thisAdventure.statGain);
var next = thisAdventure.next;

var line = <p>{thisAdventure.text}</p>
console.log("This character is " + this.props.route.character);

var btn1Name, btn2Name, btn3Name;
var btn1Thresh, btn2Thresh, btn3Thresh;
var btn1Stat, btn2Stat, btn3Stat;
var btn1Success, btn2Success, btn3Success;
var btn1Fail, btn2Fail, btn3Fail;
if(thisAdventure.statGain){
if(thisAdventure.statGain.length >0){
var StatsIncrease = thisAdventure.statGain[0];
console.log("This page's possible stat increases: " + StatsIncrease);
}
}
var statChangeText;

if(StatsIncrease != null){
console.log('ChangeStats is a ' + this.props.route.changeStats);
switch(StatsIncrease.type){
case 'strength':
this.props.route.character.strength += StatsIncrease.amount;
//{() => this.props.changeStats('strength', StatsIncrease.amount)};
statChangeText = <p>{"You gained " + StatsIncrease.amount + " Strength!"}</p>;
var nStr, nBrn, nCharm, nInj, nStress, nScand;
nStr = this.props.route.character.strength; nBrn = this.props.route.character.brains; nCharm = this.props.route.character.charm; nInj = this.props.route.character.injuries; nStress = this.props.route.character.stress; nScand = this.props.route.character.scandal;
var nChara = {id: "default", strength: nStr, brains: nBrn, charm: nCharm, injuries: nInj, stress: nStress, scandal: nScand}
api.updateChar("default", nChara).then(resp => {
	self.setState({
	character: resp	
	});
	}).catch(e => {
	console.log(e);	
	});
//need a callback here that tells index.js (specifically App) that strength needs to be updated
//in future, this section will no longer need to refer to props.route, but will refer instead to the stats variable
//in index.js' App component
break;
case 'brains':
this.props.route.character.brains += StatsIncrease.amount;
statChangeText = <p>{"You gained " + StatsIncrease.amount + " Brains!"}</p>;
break;
case 'charm':
this.props.character.charm += StatsIncrease.amount;
statChangeText = <p>{"You gained " + StatsIncrease.amount + " Charm!"}</p>;
break;
case 'injuries':
this.props.route.character.injuries += StatsIncrease.amount;
statChangeText = <p>{"Your Injuries increased by " + StatsIncrease.amount + "! Don't let it get too high, or you'll die!"}</p>;
break;
case 'stress':
this.props.route.character.stress += StatsIncrease.amount;
statChangeText = <p>{"Your Stress increased by " + StatsIncrease.amount + "! You shouldn't let too much stress into your life. It can do funny things to your head."}</p>;
break;
case 'scandal':
this.props.route.character.scandal += StatsIncrease.amount;
statChangeText = <p>{"Your Scandal increased by " + StatsIncrease.amount + "! I daresay you're becoming downright indecent. If this rises too high, you'll draw the ire of the Blue Queen."}</p>;
break;	
}
}



//if(typeof thisAdventure.tests != 'undefined'){
if(thisAdventure.text){
for(var i = 0; i<thisAdventure.tests.length; i++)
{
//make this draw up a button, which when clicked calls a function that carries out this
var difficulty;
var thresh = thisAdventure.tests[i].threshold;
var stat = thisAdventure.tests[i].statRequired;
if(stat === 'strength'){ 	
difficulty = this.state.character[0].strength - thresh;
}
else if(stat === 'brains'){
difficulty = this.props.route.character.brains - thresh;	
}
else if(stat === 'charm'){
difficulty = this.props.route.character.charm - thresh;	
}
else{
difficulty = thresh;	
}
if(difficulty<-5){
difficulty = -5;	
}
else if(difficulty>10){
difficulty = 10;	
}
var PercentChance = (difficulty * 10) + 50;

switch(i){
case 0:
btn1Name =  thisAdventure.tests[i].name;
btn1Thresh = thisAdventure.tests[i].threshold;
btn1Stat = thisAdventure.tests[i].statRequired;
btn1Success = thisAdventure.tests[i].onSuccess;
btn1Fail = thisAdventure.tests[i].onFail;

console.log("The test is named " + btn1Name + ". It is a " + btn1Stat + " test.");

buttons.push(<button onClick={() => this.performTest(btn1Name, btn1Thresh, btn1Stat, btn1Success, btn1Fail)}>{thisAdventure.tests[i].name + ' (' + PercentChance + '% chance)'}</button>) 

break;

case 1:
btn2Name =  thisAdventure.tests[i].name;
btn2Thresh = thisAdventure.tests[i].threshold;
btn2Stat = thisAdventure.tests[i].statRequired;
btn2Success = thisAdventure.tests[i].onSuccess;
btn2Fail = thisAdventure.tests[i].onFail;

console.log("The test is named " + btn2Name + ". It is a " + btn2Stat + " test.");
buttons.push(<button onClick={() => this.performTest(btn2Name, btn2Thresh, btn2Stat, btn2Success, btn2Fail)}>{thisAdventure.tests[i].name + ' (' + PercentChance + '% chance)'}</button>) 
break;

case 2:
btn3Name =  thisAdventure.tests[i].name;
btn3Thresh = thisAdventure.tests[i].threshold;
btn3Stat = thisAdventure.tests[i].statRequired;
btn3Success = thisAdventure.tests[i].onSuccess;
btn3Fail = thisAdventure.tests[i].onFail;

console.log("The test is named " + btn3Name + ". It is a " + btn3Stat + " test.");
buttons.push(<button onClick={() => this.performTest(btn3Name, btn3Thresh, btn3Stat, btn3Success, btn3Fail)}>{thisAdventure.tests[i].name + ' (' + PercentChance + '% chance)'}</button>) 
break;

default:	
}




}
//anonymous function is to stop the default behavior, otherwise it won't wait for the button to be clicked
//sending in i-1 is a quick-n-dirty workaround to get around the bizarre fact that i somehow winds up being
//passed in as 1 point higher than it's supposed to be (there's only one element in the array tests[], so
//i should only ever equal 0, which is not a problem. However, it inexplicably equals 1, which doesn't exist
//and causes a crash. Also, the buttons always seem to execute the last option in the array, all the buttons will do
//the same thing. Really unfortunate.

}
//}
//this.forceUpdate();

		var adventures = self.state.adventures;
if(typeof (self.state.character) != 'undefined'){
console.log("this.state.character's strength is :" + self.state.character[0].strength);	
return(
<div>
<StatsBar foo={self.state.character[0]}/>
<DamagesBar dmgs={self.state.character[0]}/>
<div style={mainStyle}>
<h2>ParaQuest</h2>
{line}
{responses}
{buttons}
{successOrFail}
{statChangeText}
<NextAdventures nextOnes={next} adventure={thisAdventure}/>
<BackArea previous={thisAdventure.previous} />
</div>
</div>

)};	
}
}	
});

export default AdventureView;