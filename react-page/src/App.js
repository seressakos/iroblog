import React, { Component } from 'react';
import './App.css';
import MainPage from './Main/Main'
import {BrowserRouter} from "react-router-dom";
import {Helmet} from "react-helmet";


class App extends Component {
  render() {
    const newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;

    return (
      <div className="App">
        <Helmet>
          <title>Fodor Zsana</title>
          <meta property="og:title" content="Fodor Zsana" />
          <meta property="og:description" content="Fodor Zsana írói weboldala" />
          <meta property="og:image" content="http://fodorzsana.hu/letter.jpg" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
          <meta property="og:url" content={newURL} />
        </Helmet>
        <BrowserRouter>
        <MainPage/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
