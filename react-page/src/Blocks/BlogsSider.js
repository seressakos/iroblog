import React, { useState, useEffect, useRef  } from 'react';
import CardBlog from '../Node/CardBlog';
import styled, {css} from 'styled-components';

const SliderBlock = styled.div`
  background-color: #E5F2F3;
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
`;

const SliderCard = styled.div`
  min-width: calc(100% / 12 * 4);
  max-width: calc(100% / 12 * 4);
`

const BlogSlider =(props) => {
  const refContainer = useRef(0);
  const [leftPosition, setLeftPosition] = useState(90);
  const [counter, setCounter] = useState(0);

  let blogs = props.num.map((_, index) => {
    if (counter > 0 && counter === index ||  index === counter + 3) {
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
          id={props.id[index]}
          link={props.elements[index]['url']}
          title={props.elements[index]['title']}
          text={props.elements[index]['text']}
        />
      </SliderCard>
    }
  })

  const slideRight = (left) => {
    const elementwidth = refContainer.current.offsetWidth + (refContainer.current.offsetWidth / 2);
    setLeftPosition(left - elementwidth);
    setCounter(counter + 1);
  }

  const slideLeft = (left) => {
    const elementwidth = refContainer.current.offsetWidth + (refContainer.current.offsetWidth / 2);
    setLeftPosition(left + elementwidth);
    setCounter(counter - 1);
  }

  return (
    <SliderBlock>
      <div onClick={()=>{slideRight(leftPosition)}}>Right</div>
      <div onClick={()=>{slideLeft(leftPosition)}}>Left</div>
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
