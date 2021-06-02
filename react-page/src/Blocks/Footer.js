import React, { useState, useEffect  } from 'react';
import styled, {css} from 'styled-components';
import Logo from '../Logo/Logo';

const FooterBlock = styled.div`
  background: linear-gradient(180deg, #455A64 0%, #607D8B 100%);
  
  .container {
   display: flex;
   justify-content: space-between;
   padding: 30px 0;
   
   @media (max-width: 400px) {
     flex-direction: column;
     
     p {
      text-align: center;
     }
     
     .email {
       padding-top: 15px;
     }
   }
   
   p {
    color: white;
    }
   
   .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center
   }
   
    svg {
     path {
      fill: white;
    } 
   } 
   
   .email {
     display: flex;
     align-items: center;
     justify-content: center;
     
      a {
        color: white;
       }
    }
  }
`;

const Footer = (props) => {
  return (
    <FooterBlock>
      <div className="container">
        <p>© 2020 - Minden jog fenntartva</p>
        <Logo/>
        <div className="email">
          <a href = "mailto: fodorzsana@gmail.com">fodorzsana@gmail.com</a>
        </div>
      </div>
    </FooterBlock>
  )
}

export default Footer
