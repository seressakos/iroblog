import React, { Component } from 'react';
import SwiperBlock from '../Blocks/SwiperBlock'
import BlogBlock from '../Blocks/BlogBlock'
import BlogFull from "../Node/BlogFull";
import {Route, Link} from "react-router";

class MainPage extends Component {
  constructor(props) {
    super();
    this.state = {
      url: '',
      urls: [],
      blog: {
        contentelements: 0,
        imageurls: [],
        title: [],
        texts: [],
        id: []
      }
    }
  }

  componentDidMount() {
    Promise.all([
      fetch('https://samltest/jsonapi/node/swipe?include=field_swipe_image&fields[file--file]=uri', {'method': 'GET'}),
      fetch('https://samltest/jsonapi/node/article?fields[node--article]=title,field_text,field_image&include=field_image&fields[file--file]=uri', {'method': 'GET'})
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then (data => {
        const urls = [];
        const blog = {...this.state.blog}
        let elements = blog.contentelements;

        data[0]['included'].map(obj =>{
           let imgurl = 'https://samltest' +  obj['attributes']['uri']['url'];
            urls.push(imgurl);
         })

        this.setState({urls: urls})


        data[1]['data'].map(text=>{
          elements ++;

          if (text['attributes']['field_text']) {
            blog.texts.push(text['attributes']['field_text']['value']);
          }

          blog.id.push('blog' + elements);
          blog.contentelements = elements;
        })


        data[1]['included'].map(element=> {
          let bimage = 'https://samltest' + element['attributes']['uri']['url'];
          blog.imageurls.push(bimage);
        })



         data[1]['data'].map(title => {
          blog.title.push(title['attributes']['title'])
        })

        this.setState({blog: blog})
      })
  }

  leftClickHandler = () => {
    let counter = this.state.counter;
    counter --
    this.setState({counter: counter});
  }

  rightClickHandler = () => {
    let counter = this.state.counter;
    counter ++
    this.setState({counter: counter});
  }

  render() {
    return (
      <div>
        <Route path="/" exact render={() => ( <SwiperBlock url={this.state.urls[0]} clickedLeft={this.leftClickHandler} clickedRight={this.rightClickHandler}/>)}/>
        {[...Array(this.state.blog.contentelements)].map((element, index) => {
          return <Route key={index} path="/blog" render={() => (
            <BlogBlock
              key={index}
              url={this.state.blog.imageurls[index]}
              title={this.state.blog.title[index]}
              texts={this.state.blog.texts[index]}
              id={this.state.blog.id[index]}
              />
          )}/>
        })}
        {[...Array(this.state.blog.contentelements)].map((element, index) => {
          return <Route key={index} path={'/:blogid'} render={() => (
            <BlogFull
              key={index}
              url={this.state.blog.imageurls[index]}
              title={this.state.blog.title[index]}
              texts={this.state.blog.texts[index]}
              id={this.state.blog.id[index]}
            />
          )}/>
        })}
      </div>
      )
  }
}

export default MainPage;
