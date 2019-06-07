import React, { Component } from 'react';
import './App.css';
import MeditationSubmit from './components/MeditationSubmit';
import { Router , Route } from 'react-router-dom'
import MeditationGridList from './components/MeditationGridList';
import Login from './components/Login';
import Meditation from './components/Meditation';
import Auth from './Auth/Auth'
import LoadingPage from './components/LoadingPage';
import history from './history'

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Route exact path="/" render={ (props) => <Login auth={auth} {...props} />} />
          <Route
            exact
            path="/meditations"
            component={MeditationGridList}
            tileData={this.meditations}
          />
          <Route exact path="/login"  render={ () => auth.login() } />
          <Route exact path="/submit" component={MeditationSubmit} />
          <Route exact path="/meditations/:meditation" component={Meditation} />
          <Route exact path="/callback" render={ (props) => {
            handleAuthentication(props)
            return <LoadingPage {...props} />
          }}/>
        </Router>
      </div>
    );
  }
}

export default App;
