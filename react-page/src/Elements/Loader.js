import React from "react";
import styled from "styled-components";
import { keyframes } from 'styled-components'

const animation = keyframes`
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`
const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`


const HourGlass =styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    
    &::after {
     content: " ";
     display: block;
     border-radius: 50%;
     width: 0;
     height: 0;
     margin: 8px;
     box-sizing: border-box;
     border: 32px solid #008089;
     border-color: #008089 transparent #fff transparent;
     animation: ${animation} 1.2s infinite;
    }
  `

const Loader = () => {
   return (
     <LoaderWrapper>
       <HourGlass/>
     </LoaderWrapper>
   )
}

export default Loader;
