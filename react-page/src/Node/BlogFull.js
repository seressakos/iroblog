import React, { Component } from 'react';
import {withRouter} from "react-router";

const BlogFull =(props) => {

  return (
    [...Array(props.elements.length)].map((elem, index) => {
      if (props.match.params.blogid === props.elements[index]['url']) {
        return  <div key={props.elements[index]['id']} id={props.elements[index]['id']}>
          <h1>{props.elements[index]['title']}</h1>
          {props.elements[index]['imageUrl'] ?  <img src={props.elements[index]['imageUrl']}/> : null}
          {props.elements[index]['text'] ? <p dangerouslySetInnerHTML={{ __html: props.elements[index]['text'] }}></p> : null}
        </div>
      } else {
        return null;
      }
    })
  )
};

export default withRouter(BlogFull);
