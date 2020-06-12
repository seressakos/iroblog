import React from 'react';
import {withRouter} from "react-router-dom";

const swiperBlock = (props) => {
  return (
    <div>
      <img src={props.url}/>
      <button onClick={props.clickedLeft}>Left</button>
      <button onClick={props.clickedRight}>Right</button>
    </div>
  )
}


export default withRouter(swiperBlock);
