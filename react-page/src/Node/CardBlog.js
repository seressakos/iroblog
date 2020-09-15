import React, { Component } from 'react';
import {Link} from "react-router-dom";

const CardBlog = (props) => {
  return (
    <div id={props.id}>
      <Link to={props.link}>
        <h1>{props.title}</h1>
      </Link>
      {props.text ? <div dangerouslySetInnerHTML={{ __html: props.text }}></div> : null}
    </div>
  )
}

export default CardBlog;
