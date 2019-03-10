import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MeditationGridList from './components/MeditationGridList';

class App extends Component {
  meditations() {
    // TODO: Fetch from firebase
    return [
      {
        id: 0,
        img: 'https://material-ui.com/static/images/grid-list/burgers.jpg',
        title: 'Get big, Get dank',
        description: 'Let us guide you through being dope',
      },
      {
        id: 1,
        img: 'https://material-ui.com/static/images/grid-list/honey.jpg',
        title: 'Mother. Fucking. Honey.',
        description: 'Get the Honey',
      },
      {
        id: 2,
        img: 'https://material-ui.com//static/images/grid-list/hats.jpg',
        title: 'Hats. What are they and why?',
        description: "Just don't wear hats",
      },
      {
        id: 3,
        img: 'https://material-ui.com/static/images/grid-list/vegetables.jpg',
        title: 'Veggies... should you eat them?',
        description: 'Yeah you should probably eat them',
      },
      {
        id: 7,
        img: 'https://material-ui.com/static/images/grid-list/star.jpg',
        title: 'Starfish',
        description: 'No',
      },
    ]
  }

  render() {
    return (
      <div className="App">
        <NavBar title="Knurling" />
        <MeditationGridList tileData={this.meditations()} />
      </div>
    );
  }
}

export default App;
