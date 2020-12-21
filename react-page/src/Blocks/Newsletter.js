import React, { useState, useEffect  } from 'react';
import styled, {css} from 'styled-components';

const NewsletterBlock = styled.div`
  background-image: url(./letter.jpg);
  height: 340px;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  
  .overlay {
    height: 100%;
    background-color:rgba(0, 0, 0, 0.4)
  }
  
  .container {
    height: 100%;
    
    .inner-block {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 100%;
     
     h2 {
      color: white;
      font-weight: 700;
      font-family: WorkSans Bold;
     }
    }
    
  }
`;


const Newsletter = () => {
  return (
    <NewsletterBlock>
      <div className="overlay">
      <div className="container">
        <div className="inner-block">
          <h2>Iratkozz fel a hírlevelemre!</h2>
          <a className="button" target="_blank" href="https://mailchi.mp/637fc48e3e7f/szeretsz-e-novella">
            Feliratkozás
          </a>
        </div>
        </div>
      </div>
    </NewsletterBlock>
  )
};

export default Newsletter;
