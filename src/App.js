import React, { Component } from 'react';
import './App.css';
import MeditationSubmit from './components/MeditationSubmit';
import { Router , Route } from 'react-router-dom'
import MeditationGridList from './components/MeditationGridList';
import Login from './components/Login';
import Meditation from './components/Meditation';
import LoadingPage from './components/LoadingPage';
import history from './history'

class App extends Component {
  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.auth.handleAuthentication()
    }
  }

  render() {
    const { auth } = this.props

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
          <Route exact path="/logout" render={ () => auth.logout() } />
          <Route exact path="/submit" component={MeditationSubmit} />
          <Route exact path="/meditations/:meditation" component={Meditation} />
          <Route exact path="/callback" render={ (props) => {
            this.handleAuthentication(props)
            return <LoadingPage {...props} />
          }}/>
        </Router>
      </div>
    );
  }
}

export default App;
