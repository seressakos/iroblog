import React, { useState, useEffect  } from 'react';
import {withRouter} from "react-router";
import BlogTeaser from '../Node/BlogTeaser'
import styled, {css} from 'styled-components';

const BlogSection = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center
`
const PaginationWrapper = styled.div`
   display: flex;
   align-items: center;
   margin: 30px 0;
   
   svg {
    cursor: pointer
   }
   
   ul {
    display: flex;
    padding: 0 30px;
    align-items: center;
    list-style: none;
    
    li {
         margin: 0 10px;
         
      a {
        padding: 10px 15px;
        border-radius: 50%;
        background: #B0BEC5;
      }
      
      .active {
        background: #99CCD0;
       }
     }
    }
`;

const BlogBlock = (props) => {
  const [elementsTorender, setElementsTorender] = useState([]);
  const [arrayOfNodeIndexes, setArrayOfNodeIndexes] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(()=> {
    let elements = [...Array(Math.min(props.elements.length, 6)).keys()];
    let allElements = [...Array(props.elements.length).keys()];
    let pagination = [...Array(Math.ceil(props.elements.length / 6)).keys()].map(i => ++i);

    setElementsTorender(elements);
    setArrayOfNodeIndexes(allElements);
    setPagination(pagination);
  },[]);

  const renderElements = (e, props) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    let blogElemets = arrayOfNodeIndexes;
    let sliceEnd = e.target.id * 6;
    let sliceStart = sliceEnd - 6;

    let splittedBlogElements = blogElemets.slice(sliceStart, sliceEnd);

    setElementsTorender(splittedBlogElements);
  };

  const paginationArrowRight = () => {
    window.scrollTo(0, 0);
    let renderedElements = elementsTorender
    let lastRenderedElement = renderedElements[renderedElements.length - 1];
    let sliceStart = lastRenderedElement + 1;
    let sliceEnd = sliceStart + 6;

    // Check if we are on the last page. (If we have X content, the last
    // element is going to be X-1.
    if (arrayOfNodeIndexes.length - 1 === lastRenderedElement) {
      return false
    }

    let splittedRenderedElements = arrayOfNodeIndexes.slice(sliceStart, sliceEnd);

    setElementsTorender(splittedRenderedElements)
  };

  const paginationArrowLeft = () => {
    window.scrollTo(0, 0);
    let renderedElements = elementsTorender;
    let sliceEnd = renderedElements[0];
    let sliceStart = sliceEnd - 6;


    if (renderedElements[0] === 0) {
      return false
    }

    let splittedRenderedElements = arrayOfNodeIndexes.slice(sliceStart, sliceEnd);

    setElementsTorender(splittedRenderedElements);
  }

  let blogs = elementsTorender.map((elem, index) => {
    return <BlogTeaser
      key={props.elements[elem]['id']}
      id={props.elements[elem]['id']}
      link={props.elements[elem]['url']}
      title={props.elements[elem]['title']}
      imageurl={props.elements[elem]['imageUrl']}
      text={props.elements[elem]['sumText']}
    />
  });



  let paginations = pagination.map((elem, index) => {
    if ((elem * 6) - 6 === elementsTorender[0]) {
      return  <li key={elem}>
        <a className='active' href='/' id={elem} onClick={(e) =>renderElements(e, props)}>{elem}</a>
      </li>
    }
    return  <li key={elem}>
      <a href='/' id={elem} onClick={(e) =>renderElements(e, props)}>{elem}</a>
    </li>
  });

  let navigationBlock = <PaginationWrapper>
    <svg onClick={()=>paginationArrowLeft()} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <circle cx="16" cy="16" r="16" fill="#99CCD0"/>
      <path d="M17 22L11 16L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <ul>
      {paginations}
    </ul>
    <svg className="active" onClick={()=>paginationArrowRight()} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#99CCD0"/>
      <path d="M13 22L19 16L13 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    </PaginationWrapper>

  return (
    <div className="container">
      <BlogSection>
        {blogs}
        <PaginationWrapper>
          {navigationBlock}
        </PaginationWrapper>
      </BlogSection>
    </div>
  )
};

export default withRouter(BlogBlock);
