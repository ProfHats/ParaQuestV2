import React from 'react';
import {Router} from 'react-router';
import {AdventureAPI} from './AdventuresAPI';
import {browserHistory} from 'react-router';

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
	var dataForButtons = this.props.nextOnes.map(function(nextAdv,index) {
		return (
		<p><Adventure adventure={nextAdv} /></p>
		
	)}.bind(this) )
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
}	
});

var AdventureView = React.createClass({
goToInventory : function(advID){
	browserHistory.push(advID + "/inventory");
},

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
else if(tStat === 'form'){
checkForm = <Form />;
	
}

if(passed){

browserHistory.push(success);
}
else{
browserHistory.push(fail);	
}	
},

render: function(){
	
var mainStyle = {
	position: 'absolute',
	left: 100,

};	
var statBarStyle = {
	borderStyle: 'solid black',
	borderWidth: 2
};

var checkForm;	
var successOrFail;
var responses = [];
var buttons = [];
buttons.push(<button onClick={()=> this.goToInventory(this.props.params.advID)}>Inventory</button>)
var advId = this.props.params.advID;
console.log("This ID is " + advId);
var adventure = AdventureAPI.getAdventure(advId);
console.log("This Adventure is " + adventure);
var next = adventure.next;
var line = <p>{adventure.text}</p>
console.log("This character is " + this.props.route.character);

var btn1Name, btn2Name, btn3Name;
var btn1Thresh, btn2Thresh, btn3Thresh;
var btn1Stat, btn2Stat, btn3Stat;
var btn1Success, btn2Success, btn3Success;
var btn1Fail, btn2Fail, btn3Fail;
var StatsIncrease = adventure.statGain[0];
console.log("This page's possible stat increases: " + StatsIncrease);
var statChangeText;

if(StatsIncrease != null){
console.log('ChangeStats is a ' + this.props.route.changeStats);
switch(StatsIncrease.type){
case 'strength':
this.props.route.character.strength += StatsIncrease.amount;
//{() => this.props.changeStats('strength', StatsIncrease.amount)};
statChangeText = <p>{"You gained " + StatsIncrease.amount + " Strength!"}</p>;
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

if(adventure.tests.length>0){
for(var i = 0; i<adventure.tests.length; i++)
{
//make this draw up a button, which when clicked calls a function that carries out this
var difficulty;
var thresh = adventure.tests[i].threshold;
var stat = adventure.tests[i].statRequired;
if(stat === 'strength'){ 	
difficulty = this.props.route.character.strength - thresh;
}
else if(stat === 'brains'){
difficulty = this.props.route.character.brains - thresh;	
}
else if(stat === 'charm'){
difficulty = this.props.route.character.charm - thresh;	
}
if(difficulty<-5){
difficulty = -5;	
}
else if(difficulty>10){
difficulty = 10;	
}
var PercentChance = (difficulty * 10) + 50;
console.log("PTest: Test is " + adventure.tests[i].statRequired);

switch(i){
case 0:
btn1Name =  adventure.tests[i].name;
btn1Thresh = adventure.tests[i].threshold;
btn1Stat = adventure.tests[i].statRequired;
btn1Success = adventure.tests[i].onSuccess;
btn1Fail = adventure.tests[i].onFail;

console.log("The test is named " + btn1Name + ". It is a " + btn1Stat + " test.");
if(btn1Stat === 'form'){
checkForm = <Form tryHandler={this.formTest()}/>	
	
}
else{
buttons.push(<button onClick={() => this.performTest(btn1Name, btn1Thresh, btn1Stat, btn1Success, btn1Fail)}>{adventure.tests[i].name + ' (' + PercentChance + '% chance)'}</button>) 
}
break;

case 1:
btn2Name =  adventure.tests[i].name;
btn2Thresh = adventure.tests[i].threshold;
btn2Stat = adventure.tests[i].statRequired;
btn2Success = adventure.tests[i].onSuccess;
btn2Fail = adventure.tests[i].onFail;

console.log("The test is named " + btn2Name + ". It is a " + btn2Stat + " test.");
buttons.push(<button onClick={() => this.performTest(btn2Name, btn2Thresh, btn2Stat, btn2Success, btn2Fail)}>{adventure.tests[i].name + ' (' + PercentChance + '% chance)'}</button>) 
break;

case 2:
btn3Name =  adventure.tests[i].name;
btn3Thresh = adventure.tests[i].threshold;
btn3Stat = adventure.tests[i].statRequired;
btn3Success = adventure.tests[i].onSuccess;
btn3Fail = adventure.tests[i].onFail;

console.log("The test is named " + btn3Name + ". It is a " + btn3Stat + " test.");
buttons.push(<button onClick={() => this.performTest(btn3Name, btn3Thresh, btn3Stat, btn3Success, btn3Fail)}>{adventure.tests[i].name + ' (' + PercentChance + '% chance)'}</button>) 
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
//this.forceUpdate();


return(
<div>
<StatsBar foo={this.props.route.character}/>
<DamagesBar dmgs={this.props.route.character}/>
<div style={mainStyle}>
<h2>ParaQuest</h2>
{line}
{responses}
{buttons}
{successOrFail}
{statChangeText}
{checkForm}
<NextAdventures nextOnes={next} adventure={adventure}/>
<BackArea previous={adventure.previous} />
</div>
</div>
);	
}	
});

export default AdventureView;