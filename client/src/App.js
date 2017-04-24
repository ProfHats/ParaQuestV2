import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
/*	state = {adventures: []}
	
	componentDidMount(){
	fetch('/adventures')
		.then(res => res.json())
		.then(users =>this.setState({ adventures }));
	}
*/	
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Adventures</h2>
		  {this.state.adventures.map(adv =>
		  <div key={adv.id}>{adv.text}</div>
		  )}
	 </div>
     
      </div>
    );
  }
}

export default App;
