import React, { Component } from 'react';
import {withRouter} from "react-router";

const BlogFull =(props) => {
  return (
    [...Array(props.contentelements)].map((elem, index) => {
      if (props.match.params.blogid === props.url[index]) {
        return  <div key={props.title[index]} id={props.id[index]}>
          <h1>{props.title[index]}</h1>
          {props.imageurl ?  <img src={props.imageurl[index]}/> : null}
          {props.texts ? <p dangerouslySetInnerHTML={{ __html: props.texts[index] }}></p> : null}
        </div>
      } else {
        return null;
      }
    })
  )
};

export default withRouter(BlogFull);
