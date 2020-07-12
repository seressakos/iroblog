import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";

const swiperBlock = (props) => {
  let className = props.classname;

  return (
    <div>
      <img className={className} src={props.url}/>
      <button onClick={props.clickedLeft}>Left</button>
      <button onClick={props.clickedRight}>Right</button>
    </div>
  )
}


export default withRouter(swiperBlock);
