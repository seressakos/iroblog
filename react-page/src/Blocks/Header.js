import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import {Link} from "react-router-dom";
import '../App.css'
import styled, {css} from 'styled-components'

const Ul = styled.ul`
  background-image: linear-gradient(to bottom right, #FEDFC0, #FFECD9);
  padding: 20px 0;
  margin: 0;
  display: flex;
  justify-content: center;
  list-style: none;
`;

const Li = styled.li`
  margin: 0 15px;
  
  a {
    color: #EA4505;
    text-decoration: none;
    font-family: 'Muli Bold';
  }
`

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="header__upper">
          <Logo/>
        </div>
        <nav className="main-navigation">
          <Ul>
            <Li><Link to="/">Home</Link></Li>
            <Li onClick={this.props.navigationhandler}><Link to={{
              pathname: '/blog',
              hash: '#blog'
            }}>Blog</Link></Li>
          </Ul>
        </nav>
      </header>
    )
  }
}

export default Header;
