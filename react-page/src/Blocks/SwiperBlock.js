import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import styled, {css} from 'styled-components'

const PagesBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const PagesBlockMagnified = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  
  .canvas {
    background: white;
  }
`;

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 780px;
  margin-top: 30px;
  
  @media (max-width: 900px) {
   width: 100%;
  }
  
  .pagers {
    display: flex;
    width: calc(100% / 12 * 7);
    justify-content: flex-end;
    
    .arrow {
    width: 32px;
    height: 32px;
    background-color: #99CCD0;
    border-radius: 50%;
    background-image: url('/left.png');
    background-repeat: no-repeat;
    background-position: center;
    }
    
    .right {
      transform:rotate(180deg);
      margin-left: 5px;
    }
    
    .left {
      margin-right: 5px;
    }
  }
  
  .magnify {
    width: calc(100% / 12 * 5);
    text-align: right;
  }
`;

const swiperBlock = (props) => {
  return (
    <div style={{position: 'relative'}}>
      {!props.magnified ?
      <div className="container">
        <PagesBlock>
          <Pages>
            <img src={props.urls[props.counter]} width='780px' height='550px'/>
            <ButtonWrapper>
              <div className="pagers">
                <span className="arrow left" onClick={props.clickedLeft}></span>
                <span className=" arrow right" onClick={props.clickedRight}></span>
              </div>
              <div className="magnify">
                <button onClick={props.magnify}>Nagyito</button>
              </div>
            </ButtonWrapper>
          </Pages>
        </PagesBlock>
      </div>:
          <PagesBlockMagnified>
            <div className='canvas'>
              <Pages>
                <img src={props.urls[props.counter]} width='1000px' height='704px'/>
                <ButtonWrapper>
                  <div className="pagers">
                    <button onClick={props.clickedLeft}>Left</button>
                    <button onClick={props.clickedRight}>Right</button>
                  </div>
                  <div className="magnify">
                   <button onClick={props.magnify}>X</button>
                  </div>
                </ButtonWrapper>
              </Pages>
            </div>
          </PagesBlockMagnified>
        }
    </div>
  )
}


export default withRouter(swiperBlock);
