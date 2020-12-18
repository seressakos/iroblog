import React, { useState, useEffect, useRef  } from 'react';
import CardBlog from '../Node/CardBlog';
import styled, {css} from 'styled-components';

const SliderBlock = styled.div`
  background-color: #E5F2F3;
  padding-top: 50px;
  padding-bottom: 140px;
  
  .arrow-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const SLiderWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  transition: left 0.5s;
  padding: 0 30px;
  
  @media (max-width: 1200px) {
    padding: 0;
  }
  
  @media (min-width: 1200px) {
    padding-left: 120px;
    padding-right: 0;
  }
`;

const SliderCard = styled.div`
  min-width: calc(100% - 60px);
  padding: 30px;
  
  > div {
   background: white;
   padding: 20px;
   border-radius: 3px;
   box-shadow: 0px 0px 10px rgba(5, 93, 107, 0.2);
  }
  
  @media (min-width: 1200px) {
    background: white;
    min-width: calc(100% / 12 * 3 - 30px);
    max-width: calc(100% / 12 * 3 - 30px);
    margin: 0 15px;
    border-radius: 3px;
    box-shadow: 0px 0px 10px rgba(5, 93, 107, 0.2);
    
    > div {
     background: inherit;
     padding: 0;
     border-radius: none;
     box-shadow: none;
  }
  }
 
`;

const ArrowWrapper = styled.div`
  display: flex;
  
  svg {
    cursor: pointer;
    padding: 0 10px;
  }
  
  .active:hover {
   circle {
     fill: #008089;
   }
  }
`;

const BlogSlider =(props) => {
  const refContainer = useRef(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [counter, setCounter] = useState(0);
  const [windowWidth, setWindowWidth] = useState();
  const [cardWidth, setcardWidth] = useState();
  const [elementsTorender, setElementsTorender] = useState([]);
  const [hasMounted, setHasmounted] = useState(false);

  useEffect(()=> {
    let elements = [];
    props.elements.forEach((_, index) => {
      if (index < 6) {
        elements.push(index);
      }
    });

    setHasmounted(true);
    setElementsTorender(elements);
    setWindowWidth(window.innerWidth);
    setcardWidth(refContainer.current.offsetWidth);
  },[hasMounted]);

  let blogs = elementsTorender.map((_, index) => {
    if (windowWidth > 900 && counter > 0 && index === counter - 1 || index === counter + 3) {
      return <SliderCard key={props.elements[index]['id']} ref={refContainer} className="small">
        <CardBlog
          id={props.elements[index]['id']}
          link={props.elements[index]['url']}
          title={props.elements[index]['title']}
          text={props.elements[index]['sumText']}
          created={props.elements[index]['created']}
        />
      </SliderCard>
    } else {
      return <SliderCard key={props.elements[index]['title']} ref={refContainer}>
        <CardBlog
          id={props.elements[index]['id']}
          link={props.elements[index]['url']}
          title={props.elements[index]['title']}
          text={props.elements[index]['sumText']}
          created={props.elements[index]['created']}
        />
      </SliderCard>
    }
  });

  const slideRight = (left) => {
    let num = counter;
    num ++;
    setCounter(prev => num);
    setLeftPosition(left - cardWidth);
  };

  const slideLeft = (left) => {
    let num = counter;
    num--;
    setCounter(prev => num);
    setLeftPosition(left + cardWidth);
  };

  return (
    <SliderBlock>
      <div className="arrow-wrapper container">
        <h2>Blog</h2>
        <ArrowWrapper>
          {
            counter <= 0 ?  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#B0BEC5"/>
                <path d="M17 22L11 16L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              : <svg className="active" onClick={()=>{slideLeft(leftPosition)}} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <circle cx="16" cy="16" r="16" fill="#99CCD0"/>
                <path d="M17 22L11 16L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          }
          {
            windowWidth > 900 ?
              counter >= elementsTorender.length - 3 ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#B0BEC5"/>
                  <path d="M13 22L19 16L13 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>   :
                <svg className="active" onClick={()=>{slideRight(leftPosition)}}  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#99CCD0"/>
                  <path d="M13 22L19 16L13 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              :
              counter >= elementsTorender.length - 1 ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#B0BEC5"/>
                  <path d="M13 22L19 16L13 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> :
                <svg className="active" onClick={()=>{slideRight(leftPosition)}}  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#99CCD0"/>
                  <path d="M13 22L19 16L13 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
          }
        </ArrowWrapper>
      </div>
      <div className="slider-container">
        <SLiderWrapper>
          <SlideContainer style={{left: `${leftPosition}px`}}>
            {blogs}
          </SlideContainer>
        </SLiderWrapper>
      </div>
    </SliderBlock>
  )
};

export default BlogSlider;
