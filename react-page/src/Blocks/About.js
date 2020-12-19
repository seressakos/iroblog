import React, { Component } from 'react';
import styled, {css} from 'styled-components'
import {jsonAPI} from "../system/Url.js"
import {baseUrl} from "../system/Url.js";

const AboutBlockWrapper =  styled.div`
    background: no-repeat bottom right url('/vector.png');
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-top: 70px;
  padding-bottom: 35px;
  
  @media (min-width: 996px) {
    flex-direction: row;
  }
`;

const TextWrapper = styled.div`
   width: auto;
   
   @media (min-width: 996px) {
     max-width: calc(100% / 12 * 8);
   }
`;

const ImageWrapper = styled.div`
  width: auto;
  
  @media (min-width: 996px) {
    margin-left: 60px;
    max-width: calc(100% / 12 * 4 - 60px);
  }
  
  img {
    border-radius: 50%;
  } 
`

class About extends Component {
  constructor() {
    super();
    this.state = {
      body: null,
      profile: null,
      alt: null,
    }
  }

  componentDidMount() {
    Promise.all([
      fetch(`${jsonAPI}/node/home_page?fields[node--home_page]=body,field_profile_image&include=field_profile_image&fields[file--file]=uri`, {'method': 'GET'}),
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then(data => {
        let text;
        let profileImage;
        let alt;

        data[0]['data'].map((elem, index) => {
          if (elem['attributes']['body']) {
            text = elem['attributes']['body']['value'];
          }

          if (elem['relationships']['field_profile_image']['data']) {
            alt = elem['relationships']['field_profile_image']['data']['meta']['alt'];
          }
        })

        if (data[0]['included']) {
          data[0]['included'].map((elem, index) => {
            profileImage = `${baseUrl}` + elem['attributes']['uri']['url'];
          })

          this.setState({ profile: profileImage })
        }

        this.setState({ body:text })
        this.setState({ alt: alt })
    })
  }

  render() {
    let aboutText = this.state.body ?
      <div dangerouslySetInnerHTML={{ __html: this.state.body }}>
      </div>
      : null

    let profileImage = this.state.profile ?
       <img src={this.state.profile} alt={this.state.alt ? this.state.alt : null}/>
    : null


    return (
       <AboutBlockWrapper>
        <InnerWrapper className="container">
          <TextWrapper>
            {aboutText}
          </TextWrapper>
          <ImageWrapper>
            {profileImage}
          </ImageWrapper>
         </InnerWrapper>
       </AboutBlockWrapper>
    )
  }
}

export default About;
