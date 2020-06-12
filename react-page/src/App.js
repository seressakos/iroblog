import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './Main/Main'
import {BrowserRouter} from "react-router-dom";
import {Link} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <header className="App-header">
         <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to={{
             pathname: '/blog',
             hash: '#blog'
           }}>Blog</Link></li>
         </ul>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

          <MainPage/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
