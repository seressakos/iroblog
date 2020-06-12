import React, { Component } from 'react';
import {withRouter} from "react-router";

const BlogFull =(props) => {
  console.log('ghal', props.match.params.blogid)
  console.log(props.id)
  let urlParam = props.match.params.blogid;
  let blogId = props.id;

  // if (props.match.params.blogid === props.id) {
  //   return (
  //      <div>{props.id}</div>
  //   )
  // } else {
  //   return null;
  // }

  return (
    <div>
      {urlParam === props.id &&
      <div>{props.id}</div>
      }
    </div>
  )
};

export default withRouter(BlogFull);
