import React, { Component } from 'react';
import Header from '../Blocks/Header'
import HeroBlock from '../Blocks/HeroBlock'
import SwiperBlock from '../Blocks/SwiperBlock'
import BlogBlock from '../Blocks/BlogBlock'
import BlogFull from "../Node/BlogFull";
import About from '../Blocks/About';
import {Route} from "react-router";

class MainPage extends Component {
  constructor(props) {
    super();
    this.state = {
      url: '',
      urls: [],
      hero : {
        urls: [],
        classes: ['active', '', ''],
      },
      classname: 'cica kutya',
      blog: {
        contentelements: 0,
        url: [],
        imageurls: [],
        title: [],
        sumtext: [],
        texts: [],
        id: [],
        elementstorender: 3,
        renderedelements: [],
        splittedcontentelements : [],
        paginationelements: [],
      },
      loading: true,
    }
  }

  componentDidMount() {
    Promise.all([
      fetch('https://iroblog/jsonapi/node/swipe?include=field_swipe_image&fields[file--file]=uri',
        {'method': 'GET'},
      ),
      fetch('https://iroblog/jsonapi/node/article?fields[node--article]=title,body,field_image&include=field_image&fields[file--file]=uri&sort=-nid', {'method': 'GET'}),
      fetch('https://iroblog/jsonapi/node/home_page?fields[node--home_page]=body&include=field_hero&fields[file--file]=uri&sort=-nid', {'method': 'GET'}),
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then (data => {
        const urls = [];
        const heroImageUrls = [];
        const blog = {...this.state.blog}
        const hero = {...this.state.hero}
        let elements = blog.contentelements;
        this.setState({loading: false})

        if (data[0]['included']) {
          data[0]['included'].map(obj =>{
            let imgurl = 'https://iroblog' +  obj['attributes']['uri']['url'];
            urls.push(imgurl);
          })

          this.setState({urls: urls})
        }

        data[1]['data'].map((elem, index)=> {
          elements ++;

          if (elem['attributes']['body']) {
            let sumtext = elem['attributes']['body']['value'].substring(0, 255);
            blog.texts.push(elem['attributes']['body']['value']);
            blog.sumtext.push(sumtext)
          }

          if (elem['relationships']['field_image']['data'] !== null) {
            if (data[1]['included'][index] !== undefined) {
              let blogImage = 'https://iroblog' + data[1]['included'][index]['attributes']['uri']['url'];
              blog.imageurls.push(blogImage);
            }
          } else {
            let blogImage = '';
            blog.imageurls.push(blogImage);
          }

          blog.id.push('blog' + elements);

          if (index < 4) {
            blog.renderedelements.push(index)
          }
        })

        blog.contentelements = data[1]['data'].length;

         data[1]['data'].map(title => {
           let sanitazedString = title['attributes']['title'].replace(/[^a-zA-Z ]/g, "").split(' ').join('_').toLowerCase()
           blog.title.push(title['attributes']['title']);
           blog.url.push(sanitazedString);
        })

        for (let i = 0; i < elements; i++) {
          blog.splittedcontentelements.push(i);
        }

        let paginationElementNumber = Math.ceil(elements / 4);

        for (let i = 1; i < paginationElementNumber + 1; i++) {
          blog.paginationelements.push(i)
        }

        this.setState({blog: blog})

        if (data[2]['included']) {
          data[2]['included'].map(obj => {
            let imgurl = 'https://iroblog' +  obj['attributes']['uri']['url'];
            heroImageUrls.push(imgurl);
          })

          hero.urls = heroImageUrls

          this.setState({hero: hero});
        }
      })
  }

  menuHandler = () => {
    const blog = {...this.state.blog}
    let contentelements = blog.contentelements;
    const firstRenderedElements = [];

    for (let i = 0; i < contentelements - 1; i ++) {
      if (i < 4) {
        firstRenderedElements.push(i)
      }
    }

    blog.renderedelements = firstRenderedElements
    this.setState({blog: blog})
  }

  getIdofActiveDot = (e) => {
    const hero = {...this.state.hero}
    let intager = e.target.id;
    let array = hero.classes
    array.splice(0, array.length);
    array[intager] = "active";
    hero.classes = array

    this.setState({hero: hero})
  }

  leftClickHandler = () => {
    let counter = this.state.counter;
    counter --
    let elem = document.querySelector('.cica');
    this.setState({counter: counter});
  }

  rightClickHandler = () => {
    let counter = this.state.counter;
    counter ++
    this.setState({counter: counter});
  }

   renderElements = (e, props) => {
     window.scrollTo(0, 0);
     e.preventDefault();

     const blog = {...this.state.blog}
     let sliceEnd = e.target.id * 4;
     let sliceStart = sliceEnd - 4;

     blog.renderedelements = blog.splittedcontentelements.slice(sliceStart, sliceEnd);

     this.setState({blog: blog})
   }

   paginationArrowRight = () => {
     window.scrollTo(0, 0);
     const blog = {...this.state.blog};
     let lastRenderedElement = blog.renderedelements[blog.renderedelements.length - 1];
     let sliceStart = lastRenderedElement + 1;
     let sliceEnd = sliceStart + 4;

     // Check if we are on the last page. (If we have X content, the last
     // element is going to be X-1.
     if (blog.contentelements-1 === lastRenderedElement) {
       return false
     }

     blog.renderedelements = blog.splittedcontentelements.slice(sliceStart, sliceEnd);

     this.setState({blog: blog})
   }

  paginationArrowLeft = () => {
    window.scrollTo(0, 0);
    const blog = {...this.state.blog};
    let sliceEnd = blog.renderedelements[0];
    let sliceStart = sliceEnd - 4;


    if (blog.renderedelements[0] === 0) {
      return false
    }

    blog.renderedelements = blog.splittedcontentelements.slice(sliceStart, sliceEnd);

    this.setState({blog: blog})
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
        <div>
          <Header navigationhandler={this.menuHandler}/>
          <Route
            path="/"
            exact render={() => (
              <div>
                {
                  this.state.hero.urls.length > 0 ?
                    <HeroBlock
                      imageurls={this.state.hero.urls}
                      class={this.state.hero.classes}
                      idhandler={this.getIdofActiveDot}
                    /> : null
                }
                {
                  this.state.urls[0] ?
                  <SwiperBlock
                  url={this.state.urls[0]}
                  classname={this.state.classname}
                  clickedLeft={this.leftClickHandler}
                  clickedRight={this.rightClickHandler}/>
                  : null
                }
                <About/>
              </div>
              )}/>
          <Route path="/blog" render={() => (
            <BlogBlock
              imageurl={this.state.blog.imageurls}
              title={this.state.blog.title}
              texts={this.state.blog.sumtext}
              id={this.state.blog.id}
              contentelements = {this.state.blog.renderedelements}
              url={this.state.blog.url}
              renderHandler={this.renderElements}
              pagination={this.state.blog.paginationelements}
              rightarrowhandler={this.paginationArrowRight}
              leftarrowhandler={this.paginationArrowLeft}
            />
          )}/>
          <Route path={'/:blogid'} render={() => (
            <BlogFull
              imageurl={this.state.blog.imageurls}
              title={this.state.blog.title}
              texts={this.state.blog.texts}
              id={this.state.blog.id}
              contentelements = {this.state.blog.contentelements}
              url={this.state.blog.url}
            />
          )}/>
        </div>
      )
    }
  }
}

export default MainPage;
