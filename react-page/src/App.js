import React, { Component } from 'react';
import Logo from './Logo/Logo';
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
          <div className="header__upper">
            <Logo/>
          </div>
         <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to={{
             pathname: '/blog',
             hash: '#blog'
           }}>Blog</Link></li>
         </ul>
        </header>
        <MainPage/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
