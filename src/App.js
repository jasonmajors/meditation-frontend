import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MeditationSubmit from './components/MeditationSubmit';
import { Switch, Route } from 'react-router-dom'
import MeditationGridList from './components/MeditationGridList';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Switch>
            <Route
              exact
              path="/"
              component={MeditationGridList}
              tileData={this.meditations}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/submit" component={MeditationSubmit} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
