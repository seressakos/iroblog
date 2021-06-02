import React, { useState, useEffect  } from 'react';
import styled, {css} from 'styled-components';
import {jsonAPI} from "../system/Url.js";
import {baseUrl} from "../system/Url.js";

const BookBlock = styled.div`
  padding-top: 35px;
`;

const BookBlockTile = styled.div`
   &.even {
     background: white;
     
      .trailer-text {
         padding: 40px 80px 30px 20px;
      }
   }
   
   &.odd {
     background: #FFFAEC;
     
       .trailer-text {
         padding: 40px 20px 30px 80px;
      }
   }
    
    .container {
      display: flex;
      flex-direction: column;
      padding: 35px 0;
      
      @media (min-width: 900px) {
      flex-direction: row;
     
    }
  }
`;

const MyBook =(props) => {
  const [nodes, setNodes] = useState([]);
  const [urls, setUrls ] = useState([]);
  const [texts, setTexts ] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${jsonAPI}/paragraph/zigzag?fields[paragraph--zigzag]=field_description,field_book&include=field_book&fields[file--file]=uri&sort=created`, {'method': 'GET'}),
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then(data => {
        let urlArray= [];
        let textArray = [];

        data[0]['data'].map((obj, index) => {
          if (obj['attributes']['field_description']) {
            let text = obj['attributes']['field_description']['value'];
            textArray.push(text);
          }

          if (data[0]['included']) {
              let imgurl = `${baseUrl}` +  data[0]['included'][index]['attributes']['uri']['url'];
              urlArray.push(imgurl)
          }
        })

        setUrls(urlArray);
        setTexts(textArray);
        setNodes(data);
      });
  }, []);

  if (nodes) {
    return (
      <BookBlock>
          {nodes.map((_, index) => {
              return <BookBlockTile className={index % 2 === 1 ? 'even' : 'odd'} key={index}>
                  {index % 2 === 1 ? <div className="container">
                    <div className="trailer-text">
                      <div dangerouslySetInnerHTML={{ __html: texts[index] }}></div>
                    </div>
                    {urls.length > 0 ?  <div className="book-image">
                          <img src={urls[index]} width="324px" height="436px"/>
                        </div> :
                        null}
                    </div>
                  :
                    <div className="container">
                    {urls.length > 0 ?  <div className="book-image">
                        <img src={urls[index]} width="324px" height="436px"/>
                      </div> :
                      null}
                      <div className="trailer-text">
                        <div dangerouslySetInnerHTML={{ __html: texts[index] }}></div>
                      </div>
                    </div>
                  }
              </BookBlockTile>

          })}
      </BookBlock>
    )

    } else {
      return (null)
   }
}

export default MyBook;
