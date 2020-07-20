import React, { Component } from 'react';
import styled, {css} from 'styled-components'

const AboutBlockWrapper =  styled.div`

`;

const InnerWrapper = styled.div`

`;

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
      fetch('https://iroblog/jsonapi/node/home_page?fields[node--home_page]=body,field_profile_image&include=field_profile_image&fields[file--file]=uri', {'method': 'GET'}),
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

          if (elem['relationships']['field_profile_image']) {
            alt = elem['relationships']['field_profile_image']['data']['meta']['alt'];
          }
        })

        if (data[0]['included']) {
          data[0]['included'].map((elem, index) => {
            profileImage = 'https://iroblog' + elem['attributes']['uri']['url'];
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
         {aboutText}
         {profileImage}
         </InnerWrapper>
       </AboutBlockWrapper>
    )
  }
}

export default About;
