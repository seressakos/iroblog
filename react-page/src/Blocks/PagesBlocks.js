import React, { useState, useEffect  } from 'react';
import styled, {css} from 'styled-components';
import {jsonAPI} from "../system/Url.js";
import {baseUrl} from "../system/Url.js";
import Loader from "../Elements/Loader";

const ArrowWrapper = styled.div`
  position: relative;
  width: 33.333%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    cursor: pointer;
    padding: 0 10px;
  }
  
  .active:hover {
   circle {
     fill: #008089;
   }
  }
  
  .search {
    @media (min-width: 600px) {
       position: absolute;
       right: 0;
    }
  }
`;

const Pages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -30px;
  min-height: 1200px;
  
  @media (max-width: 500px) {
    min-height: 600px;
  }
  
  img {
   position: relative;
  }
`;

const Img = styled.img`
  width: ${props => {
  if (props.showMagnify) {
    return '100%'
    }
    return '900px'
   }
  };
  display: ${props => {
    if (props.loaded) {
      return 'block'
    }
    return 'none'
  }};
  height: auto;
  
   @media (min-width: 900px) {
     width: ${props => {
       if (props.showMagnify) {
         return '700px'
       }
       return '1200px'
     }
   };
  }
  
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PagesBlock =(props) => {
  const [counter, setCounter] = useState(0);
  const [urlArray, setUrlArray] = useState([]);
  const [showMagnify, setShowMagnify] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const handleImageLoading = () => {
    setLoaded(true);
  }

  const onclickHandler = (num) => {
    setLoaded(false);
    let number = counter

    setCounter(prevState =>
      number + num
    )
  }
  const magnify = () => {
    setShowMagnify(prevState => !prevState);
  }

  useEffect(()=> {
    Promise.all([
      fetch(`${jsonAPI}/node/home_page?fields[node--home_page]=body&include=field_pdf&fields[file--file]=uri&sort=-nid`, {'method': 'GET'}),
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then (data => {
        if (data[0]['included']) {
          setUrlArray([
            ...urlArray,
            ...data[0]['included'].map(elem => {
              return `${baseUrl}` + elem['attributes']['uri']['url'];
            })
          ]);
        }
     })
  }, []);

  if (urlArray.length <0) {
  return (
    <div>
      <div className="container">
        {showMagnify ? <h2>Belelapozó - Szeretsz?</h2> : null}
        <InnerContainer>
          <Pages>
            {!loaded ? <Loader/>: null}
              <Img loaded={loaded} showMagnify={showMagnify} onLoad={()=> handleImageLoading()} src={urlArray[counter]}/>
          </Pages>
          <ArrowWrapper>
            {
              counter <= 0 ?  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#B0BEC5"/>
                  <path d="M17 22L11 16L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                : <svg className="active" onClick={()=>{onclickHandler(-1)}} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <circle cx="16" cy="16" r="16" fill="#99CCD0"/>
                  <path d="M17 22L11 16L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            }
            {
              counter >= urlArray.length - 1 ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#B0BEC5"/>
                  <path d="M13 22L19 16L13 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>   :
                <svg className="active" onClick={()=>{onclickHandler(1)}}  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#99CCD0"/>
                  <path d="M13 22L19 16L13 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            }
            {showMagnify ?
              <svg className="search" onClick={()=> {magnify()}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#008089" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="#008089" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> : <svg className="search" onClick={()=> {magnify()}}width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6.08594L6 18.0859" stroke="#008089"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6.08594L18 18.0859" stroke="#008089"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          </ArrowWrapper>
        </InnerContainer>
      </div>
    </div>
  ) } else {
    return null
  }
}

export default PagesBlock;
