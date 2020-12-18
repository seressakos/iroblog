import React, { Component } from 'react';
import {Link} from "react-router-dom";
import styled, {css} from 'styled-components';

const Card = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
`

const Li = styled.li`
  margin: 0 15px;
  
  a {
    color: #EA4505;
    text-decoration: none;
    font-family: 'Muli Bold';
  }
`

const Text = styled.p`
 flex-grow: 1;
 flex-shrink: 0;
 color: #607D8B;
`

const CardBlog = (props) => {
  return (
    <Card id={props.id}>
      <h3>{props.title}</h3>
      <p>{props.created}</p>
      {props.text ? <Text dangerouslySetInnerHTML={{ __html: props.text }}></Text> : null}
      <Link to={props.link}>Tovább</Link>
    </Card>
  )
}

export default CardBlog;
