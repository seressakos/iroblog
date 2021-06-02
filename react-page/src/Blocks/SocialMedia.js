import React, {useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {jsonAPI} from "../system/Url.js";
import {baseUrl} from "../system/Url.js";

const SocialMediaSection = styled.div`
 background-color: #FFF2E6;
 padding: 30px 0 120px 0;
 
 .container {
    display: flex;
    flex-direction: column;
    align-items: normal;
    justify-content: center;
 
 @media (min-width: 1200px) {
   flex-direction: row;
  }
 }
 
 .newsletter-block {
   padding-top: 60px;
   
   .container {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
   }
 }
`

const SocialMediaCard = styled.div`
  max-width: calc(100% / 12 * 4);
  min-width: calc(100% / 12 * 4);
  margin: 5px 0;
  
  @media (max-width: 900px) {
    max-width: 50%;
    min-width: 50%;
  }
  
    @media (max-width: 400px) {
    max-width: 70%;
    min-width: 70%;
  }
  
  
  .card-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SocialMediaBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  h3 {
   margin: 30px 0;
  }
  
  @media (min-width: 900px) {
   max-width: 50% - 30px;
   min-width: 50% -30px;
  }
  
  @media (min-width: 1200px) {
   padding: 0 30px;
  }
  
 
  .wrapper {
   display: flex;
   flex-wrap: wrap;
   background-color: white;
   flex-grow: 1;
   padding: 25px 25px 0 25px;
   box-shadow: 0px 0px 10px rgba(234, 69, 5, 0.1);
   border-radius: 4px 4px 0 0;
   
   @media (max-width: 400px) {
     flex-direction: row;
     flex-wrap: nowrap;
     overflow: scroll;
     padding-bottom: 30px;
   }
  }
  
  .social-link {
     background-color: white;
     display: flex;
     padding: 30px 0;
     width: 100%;
     align-items: flex-end;
     justify-content: center;
     border-radius: 0 0 4px 4px;
     
    @media (max-width: 400px) {
     background-color: inherit;
    } 
   }
   
     .social-link::-webkit-scrollbar:horizontal {
       height: 10px;
     }
     
     .social-link::-webkit-scrollbar {
    -webkit-appearance: none;
    }
`;

const SocialMedia = () => {
  const [urls, setUrls ] = useState([]);
  const [facebookUrls, setFacebookUrls] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${jsonAPI}/node/instagram?fields[node--instagram]=title,field_mp4,drupal_internal__nid&include=field_mp4&fields[file--file]=uri&sort=-nid`, {'method': 'GET'}),
      fetch(`${jsonAPI}/node/instagram?fields[node--instagram]=title,field_facebook,drupal_internal__nid&include=field_facebook&fields[file--file]=uri&sort=-nid`, {'method': 'GET'}),
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then(data => {
        let instaUrlArray = [];
        let facebookUrlArray = [];


        if (data['0']['included']) {
          data['0']['included'].map((element) => {
            let url = `${baseUrl}` + element['attributes']['uri']['url'];
            instaUrlArray.push(url);
          });
        }

        if (data['1']['included']) {
          data['1']['included'].map((element) => {
            let imageUrl = `${baseUrl}` + element['attributes']['uri']['url'];
            facebookUrlArray.push(imageUrl);
          })
        }

        setUrls(instaUrlArray.reverse());
        setFacebookUrls(facebookUrlArray.reverse());
        setLoaded(true);
      })
  }, []);

  if (loaded) {
    return (
      <SocialMediaSection>
        <div className="container">
          <SocialMediaBlock>
            <h3>Facebook</h3>
            <div className='wrapper'>
                {
                  facebookUrls.map((img, index) => {

                    if (index > 6) {
                      return null
                    }

                    return <SocialMediaCard key={img}>
                      <div className="card-body">
                        <img src={img} width="160" height="160" alt="face"/>
                      </div>
                    </SocialMediaCard>
                  })
                }
            </div>
            <div className="social-link">
              <a href="https://www.facebook.com/fodorzsana">Tovább a Facebookra</a>
            </div>
          </SocialMediaBlock>
          <SocialMediaBlock>
            <h3>Instagram</h3>
            <div className='wrapper'>
              {
                urls.map((el, index) => {
                  if (index >= 6) {
                    return null
                  }

                  if (el.split('.').pop() === 'jpeg' || el.split('.').pop() === 'jpg') {
                    return <SocialMediaCard key={el}>
                      <div className="card-body">
                        <img src={el} width="160" height="160" alt="insta"></img>
                      </div>
                    </SocialMediaCard>
                  } else {
                    return <SocialMediaCard key={el}>
                      <div className="card-body">
                        <video width="160" height="160" autoPlay muted>
                          <source src={el} type="video/mp4"></source>
                        </video>
                      </div>
                    </SocialMediaCard>
                  }
                })
              }
            </div>
            <div className="social-link">
              <a href="https://www.instagram.com/fodorzsana/">Tovább az Instagramra</a>
            </div>
          </SocialMediaBlock>
        </div>
      </SocialMediaSection>
    )
  }

  return (false)
}

export default SocialMedia;
