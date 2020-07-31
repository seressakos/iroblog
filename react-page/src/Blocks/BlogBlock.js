import React, { useState, useEffect  } from 'react';
import {withRouter} from "react-router";
import BlogTeaser from '../Node/BlogTeaser'

const BlogBlock =(props) => {
  let elementsToRender = props.contentelements
  let blogs = elementsToRender.map((elem, index) => {
    return <BlogTeaser
      key={index}
      id={props.id[elem]}
      link={props.url[elem]}
      title={props.title[elem]}
      imageurl={props.imageurl[elem]}
      text={props.texts[elem]}
    />
  })

  let paginations = props.pagination.map((elem, index) => {
    return <li key={index}>
        <a href='/' id={elem} onClick={(e) =>props.renderHandler(e, props)}>{elem}</a>
      </li>
  })

  let navigationBlock = <div>
      <div onClick={()=>props.leftarrowhandler()}>Arrayleft</div>
      {paginations}
      <div onClick={()=>props.rightarrowhandler()}>ArrayRight</div>
    </div>

  return (
    <div>
      {blogs}
      {navigationBlock}
    </div>
  )
};

export default withRouter(BlogBlock);
