import React, { useState, useEffect  } from 'react';
import {withRouter} from "react-router";
import BlogTeaser from '../Node/BlogTeaser'

const BlogBlock =(props) => {
  let blogs = props.elementstorender.map((elem, index) => {

    return <BlogTeaser
      key={props.elements[elem]['id']}
      id={props.elements[elem]['id']}
      link={props.elements[elem]['url']}
      title={props.elements[elem]['title']}
      imageurl={props.elements[elem]['imageUrl']}
      text={props.elements[elem]['sumText']}
    />
  })

  let paginations = props.pagination.map((elem, index) => {
    return <li key={elem}>
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
