import React, { useState, useEffect, useRef  } from 'react';
import CardBlog from '../Node/CardBlog';
import styled, {css} from 'styled-components';

const SliderBlock = styled.div`
  background-color: #E5F2F3;
  
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
  
  @media (min-width: 1200px) {
    padding-left: 120px;
    padding-right: 0;
  }
`;

const SliderCard = styled.div`
  min-width: calc(100% - 30px);
  padding: 30px;
  
  @media (min-width: 900px) {
    min-width: calc(100% / 12 * 3);
    max-width: calc(100% / 12 * 3);
  }
`;

const ArrowWrapper = styled.div`
  display: flex;
  
  .arrow {
    background: url('/right.svg') center no-repeat;
    width: 32px;
    height: 32px;
    padding: 0 10px;
  }
  
  .arrow-right--inactive {
    background: url('/right-inactive.svg') center no-repeat;
  }
  
  .arrow-left {
    transform: rotate(180deg);
  }
  
  .arrow-left--inactive {
    background: url('/right-inactive.svg') center no-repeat;
    transform: rotate(180deg);
  }
`;

const BlogSlider =(props) => {
  const refContainer = useRef(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [counter, setCounter] = useState(0);
  const [windowWidth, setWindowWidth] = useState();
  const [cardWidth, setcardWidth] = useState();

  useEffect(()=> {
    setWindowWidth(window.innerWidth);
    setcardWidth(refContainer.current.offsetWidth)
  },[])

  let blogs = props.num.map((_, index) => {
    if (windowWidth > 900 && counter > 0 && index === counter - 1 || index === counter + 3) {
      return <SliderCard key={props.elements[index]['id']} ref={refContainer} className="small">
        <CardBlog
          id={props.elements[index]['id']}
          link={props.elements[index]['url']}
          title={props.elements[index]['title']}
          text={props.elements[index]['text']}
        />
      </SliderCard>
    } else {
      return <SliderCard key={props.elements[index]['title']} ref={refContainer}>
        <CardBlog
          id={props.elements[index]['id']}
          link={props.elements[index]['url']}
          title={props.elements[index]['title']}
          text={props.elements[index]['text']}
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
            counter <= 0 ? <div className="arrow arrow-left--inactive"></div>
              : <div className="arrow arrow-left" onClick={()=>{slideLeft(leftPosition)}}></div>
          }
          {
            windowWidth > 900 ?
              counter >= props.num.length - 3 ? <div className="arrow arrow-right--inactive"></div>  :
                <div className="arrow arrow-right" onClick={()=>{slideRight(leftPosition)}}></div>
              :
              counter >= props.num.length - 1 ? <div className="arrow arrow-right--inactive"></div>  :
                <div className="arrow arrow-right" onClick={()=>{slideRight(leftPosition)}}></div>
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
