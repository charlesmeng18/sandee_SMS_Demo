import React, { Component } from 'react';
import './App.css';
import SMSForm from './SMS/SMSForm'
import CheckList from './SMS/CheckList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SMSForm/>
          <CheckList/>


        </header>
      </div>
    );
  }
}

export default App;
