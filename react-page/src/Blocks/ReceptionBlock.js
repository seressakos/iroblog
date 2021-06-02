import React, { useState, useEffect  } from 'react';
import styled, {css} from 'styled-components';
import {jsonAPI} from "../system/Url.js";
import {baseUrl} from "../system/Url.js";
import Reception from "../Node/Reception";
import Loader from "../Elements/Loader";

const ReceptionSection = styled.div`
  padding: 30px;
  
  @media (max-width: 400px) {
    padding: 0;
  }
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const Title = styled.h2`
  padding-top: 70px;
  padding-bottom: 30px;
`
const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
`

const ReceptionBlock =() => {
  const [node, setNode ] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [renderedElements, setRenderedElements] = useState(0);

  const createNodeObject = ({ text, title, url, imageUrl = null, id }) => ({
    text,
    title,
    url,
    imageUrl,
    id,
  });

  useEffect(() => {
    Promise.all([
      fetch(`${jsonAPI}/node/kritika?fields[node--kritika]=body,field_link,title,drupal_internal__nid,field_image&include=field_image&fields[file--file]=uri&sort=-nid`, {'method': 'GET'})
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then(data => {
        let nodeArray = [];

        data[0]['data'].map((element, index) => {
          let text = element['attributes']['body'] ? element['attributes']['body']['value'] : null;
          let url = element['attributes']['field_link'] ? element['attributes']['field_link']['uri'] : null;
          let id = element['id'];
          let title = element['attributes']['title'];

          if (element['relationships']['field_image']['data']) {
            data[0]['included'].forEach( e => {
              if (element['relationships']['field_image']['data']['id'] === e['id']) {
                let bookImage = `${baseUrl}` + e['attributes']['uri']['url'];
                nodeArray.push(createNodeObject({
                    text: text,
                    title: title,
                    url: url,
                    imageUrl: bookImage,
                    id: id,
                  }
                ))
              }
            })
          } else {
            nodeArray.push(createNodeObject({
              text: text,
              title: title,
              url: url,
              id: id,
              }
            ))
          }
        });

        setRenderedElements(Math.min(nodeArray.length, 2));
        setNode(nodeArray);
        setLoaded(true)
      })
  }, []);

  const renderHandler = () => {
    if (renderedElements + 2 <= node.length ) {
      setRenderedElements(prev => (
        prev + 2
      ))
    } else {
      setRenderedElements(prev => (
        prev + 1
      ))
    }
  }


  if (loaded) {
    if (node.length === 0) {
      return (null)
    }

    return (
      <ReceptionSection>
        <div className="container">
          <Title>Hírek rólam</Title>
          <Block>
            {[...Array(renderedElements)].map((item, index) => {
              return <Reception
                key={node[index].id}
                imageUrl={node[index].imageUrl}
                title={node[index].title}
                text={node[index].text}
                url={node[index].url}
              />
            })}
          </Block>
          {node.length > 2 && renderedElements < node.length ?
            <MoreButtonWrapper>
              <a onClick={() => {renderHandler()}} className="button">Mutass mèg</a>
            </MoreButtonWrapper>
            : null }
        </div>
      </ReceptionSection>
    );
  }

  return (<Loader/>);
}

export default ReceptionBlock;
