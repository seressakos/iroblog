import React, { useState, useEffect  } from 'react';
import styled, {css} from 'styled-components'

const BookBlock = styled.div`
  background: #FFFAEC;
  padding-top: 35px;
`;

const BookBlockTile = styled.div`
    display: flex;
    flex-direction: column;
    padding: 35px 0;
    
    @media (min-width: 900px) {
      flex-direction: row;
      
      .trailer-text {
       padding-left: 80px;
      }
  }
`;

const MyBook =(props) => {
  const [urls, setUrls ] = useState([]);
  const [texts, setTexts ] = useState([]);
  let booksBlog;

  useEffect(() => {
    Promise.all([
      fetch('https://iroblog/jsonapi/paragraph/zigzag?fields[paragraph--zigzag]=field_description,field_book&include=field_book&fields[file--file]=uri&sort=created', {'method': 'GET'})
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then(data => {
        if (data[0]['included']) {
          let urlArray= [];
          let textArray = [];

          data[0]['included'].map(obj => {
            let imgurl = 'https://iroblog' +  obj['attributes']['uri']['url'];
            urlArray.push(imgurl)
          });

          data[0]['data'].map(obj => {
            if (obj['attributes']['field_description']) {
              let text = obj['attributes']['field_description']['value'];
              textArray.push(text);
            }
          })

          setUrls(urlArray);
          setTexts(textArray);
        }
      })
  }, []);

  if (urls || texts) {
    return (
      <BookBlock>
        <div className="container">
          {urls.map((url, index) => {
            if (index % 2 === 0 && index !== 0) {
              return <BookBlockTile key={index}>
                <div className="trailer-text">
                  <div dangerouslySetInnerHTML={{ __html: texts[index] }}></div>
                </div>
                <div className="book-image">
                  <img src={url}/>
                </div>
              </BookBlockTile>
            }

            return <BookBlockTile key={index}>
              <div className="book-image">
                <img src={url} width="324px" height="436px"/>
              </div>
              <div className="trailer-text" dangerouslySetInnerHTML={{ __html: texts[index] }}></div>
            </BookBlockTile>
          })}
        </div>
      </BookBlock>
    )

    } else {
      return (null)
   }
}

export default MyBook;
