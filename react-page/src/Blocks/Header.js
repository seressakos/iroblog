import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import {Link} from "react-router-dom";
import '../App.css'
import styled, {css} from 'styled-components'
import {FacebookShareButton} from "react-share";

const Ul = styled.ul`
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

const MainNav = styled.nav`
    background-image: linear-gradient(to bottom right, #FEDFC0, #FFECD9);
    
    .container {
     display: flex;
     align-items: center;
     justify-content: center;
     
     button {
      position: absolute;
      right: 30px;
     }
    }
`

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="header__upper">
          <Logo/>
        </div>
        <MainNav>
          <div className="container">
            <Ul>
              <Li><Link to="/">Home</Link></Li>
              <Li onClick={this.props.navigationhandler}><Link to={{
                pathname: '/blog',
                hash: '#blog'
              }}>Blog</Link></Li>
            </Ul>
            <FacebookShareButton url="www.fodorzsana.hu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#EA4505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </FacebookShareButton>
          </div>
        </MainNav>
      </header>
    )
  }
}

export default Header;
