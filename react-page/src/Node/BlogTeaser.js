import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import {Link} from "react-router-dom";

const BlogCard = styled.div`
  max-width: 100%;
  box-shadow: 0px 0px 10px rgba(5, 93, 107, 0.2);
  margin-top: 30px;
  
  @media (min-width: 900px) {
    max-width: 50%;
  }
 
  h3 {
   a {
     text-decoration: none;
     font-family: 'Muli Bold';
     color: #EA4505;
   }
  
  }
`

const BlockCardBody = styled.div`
 padding: 30px;
 border-radius: 0 0 3px 3px;
 
 .more-link {
   padding: 15px 0;
  }
`;

const blogTeaser = (props) => {

  return (
    <BlogCard id={props.id}>
      {props.imageurl ?  <img src={props.imageurl} width='600' height='400' className="responsive"/> : null}
      <BlockCardBody>
        <h3>
          <Link to={props.link}>
            {props.title}
          </Link>
        </h3>
        {props.text ? <p dangerouslySetInnerHTML={{ __html: props.text }}></p> : null}
        <div className="more-link">
          <Link to={props.link}>
            Tovább
          </Link>
        </div>
      </BlockCardBody>
    </BlogCard>
  )
}

export default blogTeaser;
