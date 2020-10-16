import React, { Component } from 'react';
import styled, {css} from 'styled-components';

const CardWrapper = styled.div`
  max-width: 100%;
  margin: 0 30px;
  
  @media (min-width: 900px) {
    max-width: calc(50% - 60px);
  }
  
  &:nth-child(n-2) {
   margin-top: 45px;
  }
`;

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ECEFF1;
  height: 100%;
  border-radius: 4px;
`;

const CardBody = styled.div`
  display: flex;
  flex-grow: 1;
  
  .image-wrapper {
   position: relative;
   min-width: calc(100% / 12 * 4);
   
   img {
    position: absolute;
    top: -20px;
    left: -15px;
    filter: drop-shadow(0px 0px 10px rgba(5, 93, 107, 0.2));
  }
 }
 
   .text-wrapper {
    max-width: calc(100% / 12 * 8);
    padding-right: 30px;
    
   @media (max-width: 900px) {
    max-width: 100%;
    padding: 30px;
   }
  }
`

const CardFooter = styled.div`
  padding: 30px;
  text-align: right;
`

const ReceptioItem =({imageUrl, title, text, url}) => {
  return (
    <CardWrapper>
      <CardInner>
        <CardBody>
          {window.innerWidth > 600 ?  <div className="image-wrapper">
            {imageUrl ?  <img src={imageUrl} width='180' height='275'/> : null}
          </div> : null}
          <div className="text-wrapper">
            <h4>{title}</h4>
            {text ? <div dangerouslySetInnerHTML={{ __html: text }}></div> : null}
          </div>
        </CardBody>
        <CardFooter>
          <a href={url}>Tovabb a cikre</a>
        </CardFooter>
      </CardInner>
    </CardWrapper>
  )
}

export default ReceptioItem;
