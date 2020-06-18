import React, { Component } from 'react';
import {Link} from "react-router-dom";

const blogTeaser = (props) => {
  return (
    <div id={props.id}>
      <Link to={props.link}>
         <h1>{props.title}</h1>
        </Link>
          {props.imageurl ?  <img src={props.imageurl}/> : null}
          {props.imageurl ?  <img src={props.imageurl} width='400' height='300'/> : null}
          {props.text ? <p dangerouslySetInnerHTML={{ __html: props.text }}></p> : null}
    </div>
  )
}

export default blogTeaser;
