import React, { Component } from 'react';
import Logo from './Logo/Logo';
import './App.css';
import MainPage from './Main/Main'
import {BrowserRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import styled, {css} from 'styled-components'

const Ul = styled.ul`
  background-image: linear-gradient(to bottom right, #FEDFC0, #FFECD9);
  padding: 20px 0;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <header className="App-header">
          <div className="header__upper">
            <Logo/>
          </div>
          <nav className="main-navigation">
            <Ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to={{
                pathname: '/blog',
                hash: '#blog'
              }}>Blog</Link></li>
            </Ul>
          </nav>
        </header>
        <MainPage/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
