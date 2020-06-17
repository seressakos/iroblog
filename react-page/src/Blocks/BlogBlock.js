import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

const BlogBlock =(props) => {
  return (
    [...Array(props.contentelements)].map((elem, index) => {
      return  <div key={index} id={props.id[index]}>
          <Link to={props.url[index]}>
            <h1>{props.title[index]}</h1>
          </Link>

          {props.imageurl ?  <img src={props.imageurl[index]}/> : null}
          {props.texts ? <p dangerouslySetInnerHTML={{ __html: props.texts[index] }}></p> : null}
        </div>
    })
  )
};

export default withRouter(BlogBlock);
