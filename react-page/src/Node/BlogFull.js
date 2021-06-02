import React, { Component } from 'react';
import {withRouter} from "react-router";
import {FacebookShareButton} from "react-share";
import styled, {css} from 'styled-components';

const BlogSection = styled.div`
 padding: 60px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 
 .blog-image {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
 }
 
 h2 {
  text-align: center;
 }
 
 img {
  @media (max-width: 900px) {
   max-width: 100%;
   min-width: 100%;
   height: auto;
   display: block;
  } 
 }
 
 .blog__text {
   padding: 30px 15px;
   border-bottom: 1px solid #B0BEC5;
 }
 
 .blog__footer {
   padding: 30px;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 
 button {
  margin-left: 10px;
 }
`;

const BlogFull =(props) => {

  return (
    [...Array(props.elements.length)].map((elem, index) => {
      if (props.match.params.blogid === props.elements[index]['url']) {
        return  <div className='container' key={props.elements[index]['id']}>
          <BlogSection>
            <div id={props.elements[index]['id']}>
              <div className="blog-image">
                {props.elements[index]['imageUrl'] ?  <img src={props.elements[index]['imageUrl']} width='600' height='600'/> : null}
              </div>
              <h2>{props.elements[index]['title']}</h2>
              <div className="blog__text">
                {props.elements[index]['text'] ? <p dangerouslySetInnerHTML={{ __html: props.elements[index]['text'] }}></p> : null}
              </div>
              <div className="blog__footer">
                <p>Ha tetszett, kérlek oszd meg a Facebookon is:</p>
                <FacebookShareButton url={`http://fodorzsana.hu/${props.elements[index]['url']}`}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#008089" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </FacebookShareButton>
              </div>
            </div>
          </BlogSection>
        </div>
      } else {
        return null;
      }
    })
  )
};

export default withRouter(BlogFull);
