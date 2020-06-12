import React, { Component } from 'react';
import {Link} from "react-router-dom";

const BlogBlock =({url, texts, title, id}) => {
  return (
    <div id={id}>
      <Link to={id}>
        <h1>{title}</h1>
      </Link>

      {url ?  <img src={url}/> : null}
      {texts ? <p dangerouslySetInnerHTML={{ __html: texts }}></p> : null}
    </div>
  )
};

export default BlogBlock;
