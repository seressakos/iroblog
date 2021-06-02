import React, { Component } from 'react';
import Header from '../Blocks/Header'
import HeroBlock from '../Blocks/HeroBlock'
import VideoBlock from '../Blocks/VideoBlock'
import BlogBlock from '../Blocks/BlogBlock'
import MyBook from '../Blocks/MyBooks'
import BlogSlider from '../Blocks/BlogsSider'
import BlogFull from "../Node/BlogFull";
import About from '../Blocks/About';
import Footer from "../Blocks/Footer";
import ReceptionBlock from "../Blocks/ReceptionBlock";
import SocialMedia from "../Blocks/SocialMedia";
import Newsletter from "../Blocks/Newsletter";
import PagesBlocks from "../Blocks/PagesBlocks";
import {Route} from "react-router";
import {jsonAPI} from "../system/Url.js";
import {baseUrl} from "../system/Url.js";
import Loader from "../Elements/Loader";

class MainPage extends Component {
  constructor(props) {
    super();
    this.state = {
      urls: [],
      hero : {
        urls: [],
        classes: ['active', '', ''],
      },
      blog: {
        blogelements: [],
        renderedelements: [],
      },
      loading: true,
      counter: 0,
      magnified: false,
      leftposition: 0,
    }
  }

  componentDidMount() {
    Promise.all([
      fetch(`${jsonAPI}/node/article?fields[node--article]=created,author,title,body,field_image,drupal_internal__nid&include=field_image&fields[file--file]=uri&sort=-nid`, {'method': 'GET'}),
      fetch(`${jsonAPI}/node/home_page?fields[node--home_page]=body&include=field_hero&fields[file--file]=uri&sort=-nid`, {'method': 'GET'}),
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then (data => {
        const urls = [];
        const heroImageUrls = [];
        const blog = {...this.state.blog}
        const hero = {...this.state.hero}
        let elements = blog.blogelements.length;

        const createBlogObject = ({ title, text, url, imageUrl = null, id, sumText, created }) => ({
          title,
          text,
          url,
          imageUrl,
          id,
          sumText,
          created,
        });

        data[0]['data'].map((elem, index)=> {
          elements ++;

          if (index < Math.min(data[0]['data'].length, 6)) {
            blog.renderedelements.push(index);
          }
        })

        blog.contentelements = data[1]['data'].length;

         data[0]['data'].map((element, index) => {
           let sanitazedString = element['attributes']['title'].replace(/[^a-zA-Z ]/g, "").split(' ').join('_').toLowerCase();
           let text = element['attributes']['body']['value'];
           let sumText = element['attributes']['body']['summary'];
           let id = `blog_${element['attributes']['drupal_internal__nid']}`;
           let createdDate = element['attributes']['created'].slice(0, 10).replace(/-/g, '/');

           if (element['relationships']['field_image']['data']) {
             data[0]['included'].forEach( e => {
               if (element['relationships']['field_image']['data']['id'] === e['id']) {
                 let blogImage = `${baseUrl}` + e['attributes']['uri']['url'];
                 blog.blogelements.push(createBlogObject({
                     title: element['attributes']['title'],
                     text: text,
                     url: sanitazedString,
                     imageUrl: blogImage,
                     id: id,
                     sumText: sumText,
                     created: createdDate,
                   }
                 ))
               }
             })
           } else {
             blog.blogelements.push(createBlogObject({
                 title: element['attributes']['title'],
                 text: text,
                 url: sanitazedString,
                 id: id,
                 sumText: sumText,
                 created: createdDate,
               }
             ))
           }
         })


        this.setState({blog: blog})

        if (data[1]['included']) {
          data[1]['included'].map(obj => {
            let imgurl = `${baseUrl}` +  obj['attributes']['uri']['url'];
            heroImageUrls.push(imgurl);
          })

          hero.urls = heroImageUrls

          this.setState({hero: hero});
        }

        this.setState({loading: false})
      })
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

    if (counter < 0) {
      return
    }

    this.setState({counter: counter});
  }

  rightClickHandler = () => {
    let counter = this.state.counter;
    let urls = this.state.urls
    counter ++

    if (counter > urls.length - 1) {
      return
    }

    this.setState({counter: counter});
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loader/>
        </div>
      )
    } else {
      return (
        <div>
          <Header/>
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
                <About/>
                <PagesBlocks/>
                <MyBook/>
                <VideoBlock/>
                <BlogSlider
                  elements={this.state.blog.blogelements}
                  leftposition={this.state.leftposition}
                />
                <ReceptionBlock/>
                <Newsletter/>
                <SocialMedia/>
              </div>
              )}/>
          <Route path="/blog" render={() => (
            <BlogBlock
              elements={this.state.blog.blogelements}
              elementstorender = {this.state.blog.renderedelements}
            />
          )}/>
          <Route path={'/:blogid'} render={() => (
            <BlogFull
              elements={this.state.blog.blogelements}
            />
          )}/>
          <Footer/>
        </div>
      )
    }
  }
}

export default MainPage;
