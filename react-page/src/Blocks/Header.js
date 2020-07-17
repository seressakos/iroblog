import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import {Link} from "react-router-dom";
import {Route} from "react-router";
import styled, {css} from 'styled-components'

const Ul = styled.ul`
  background-image: linear-gradient(to bottom right, #FEDFC0, #FFECD9);
  padding: 20px 0;
`;

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="header__upper">
          <Logo/>
        </div>
        <nav className="main-navigation">
          <Ul>
            <li><Link to="/">Home</Link></li>
            <li onClick={this.props.navigationhandler}><Link to={{
              pathname: '/blog',
              hash: '#blog'
            }}>Blog</Link></li>
          </Ul>
        </nav>
      </header>
    )
  }
}

export default Header;
