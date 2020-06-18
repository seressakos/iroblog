import React, { Component } from 'react';

import {withRouter} from "react-router";
import BlogTeaser from '../Node/BlogTeaser'

const BlogBlock =(props) => {
  let elemNum = props.contentelements;
  let blogs =   [...Array(props.contentelements)].map((elem, index) => {
    return <BlogTeaser
      key={index}
      id={props.id[index]}
      link={props.url[index]}
      title={props.title[index]}
      imageurl={props.imageurl[index]}
      text={props.texts[index]}
    />
  })

  // const testhandler =()=> {
  //   elemNum = elemNum + 1;
  //   console.log(elemNum)
  // }

  return (
    <div>
      {blogs}
      <button onClick={props.renderHandler}>MORE</button>
    </div>
  )
};

export default withRouter(BlogBlock);
