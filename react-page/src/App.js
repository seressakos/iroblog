import React, { Component } from 'react';
import './App.css';
import MainPage from './Main/Main'
import {BrowserRouter} from "react-router-dom";



class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <MainPage/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
