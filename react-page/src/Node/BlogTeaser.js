import React, { Component } from 'react';
import {Link} from "react-router-dom";

const blogTeaser = (props) => {
  console.log(props.link)
  return (
    <div id={props.id}>
      <Link to={props.link}>
         <h1>{props.title}</h1>
        </Link>
          {props.imageurl ?  <img src={props.imageurl}/> : null}
          {props.text ? <p dangerouslySetInnerHTML={{ __html: props.text }}></p> : null}
    </div>
  )
}

export default blogTeaser;
