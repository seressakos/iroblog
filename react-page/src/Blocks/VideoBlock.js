import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import styled, {css} from 'styled-components';
import {jsonAPI} from "../system/Url.js";
import Loader from "../Elements/Loader";

const VideoBlockWrapper = styled.div`
  background: no-repeat url('/swiper-background.png');
  padding: 70px 0;
  padding-bottom: 0;
  
  h2 {
   margin-top: 0;
  }
`

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 30px;

  svg {
    cursor: pointer;
    padding: 0 20px;
  }
  
  .active:hover {
   circle {
     fill: #008089;
   }
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  transition: left 0.5s;
  
  .video {
    min-width: 100%;
    
    h4 {
     text-align: center;
    }
  }
`

const VideoBlock = (props) => {
  const [videos, setVideos ] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const refContainer = useRef(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [counter, setCounter] = useState(0);
  const [cardWidth, setcardWidth] = useState();

  const createNodeObject = ({ title, url, id }) => ({
    title,
    url,
    id,
  });

  useEffect(() => {
    Promise.all([
      fetch(`${jsonAPI}/node/videos?fields[node--videos]=title,field_video_link,drupal_internal__nid&sort=-nid`, {'method': 'GET'})
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then(data => {
        let videoArray = [];

        data[0]['data'].map((element) => {
          let id =element['attributes']['drupal_internal__nid'];
          let title = element['attributes']['title'];
          let url = element['attributes']['field_video_link']['uri'];

          videoArray.push(createNodeObject({
            title: title,
            url: url,
            id: id,
            }
          ))
        })

        setVideos(videoArray);
        setLoaded(true);
        setcardWidth(refContainer.current.offsetWidth)
      })
  }, []);


  const slideRight = (left) => {
    let num = counter;
    num ++;
    setCounter(prev => num);
    setLeftPosition(left - cardWidth);
  };

  const slideLeft = (left) => {
    let num = counter;
    num--;
    setCounter(prev => num);
    setLeftPosition(left + cardWidth);
  };

 if (loaded) {
   return (
     <VideoBlockWrapper>
     <div className="container">
       <h2>Videók</h2>

       <VideoWrapper ref={refContainer}>
         <VideoContainer style={{left: `${leftPosition}px`}}>
           {videos.map((video, index)=> {
             return <div className="video" key={video['id']}>
               <ReactPlayer url={video['url']} width='100%' height='600px'/>
               <h4>{video['title']}</h4>
             </div>
           })}
         </VideoContainer>
         <ArrowWrapper>
           {
             counter <= 0 ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="16" cy="16" r="16" fill="#B0BEC5"/>
                 <path d="M17 22L11 16L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
               : <svg className="active" onClick={()=>{slideLeft(leftPosition)}} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
                 <circle cx="16" cy="16" r="16" fill="#99CCD0"/>
                 <path d="M17 22L11 16L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
           }
           {
             counter >= videos.length - 1 ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="16" cy="16" r="16" fill="#B0BEC5"/>
                 <path d="M13 22L19 16L13 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>  :
                 <svg className="active" onClick={()=>{slideRight(leftPosition)}}  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <circle cx="16" cy="16" r="16" fill="#99CCD0"/>
                   <path d="M13 22L19 16L13 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
           }
         </ArrowWrapper>
       </VideoWrapper>
     </div>
     </VideoBlockWrapper>
   )
 }

 return (<Loader/>);
}

export default VideoBlock;
