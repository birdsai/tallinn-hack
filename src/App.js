import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import media from './components/Media';

// Containers
import Home from './containers/Home';
import Maps from './containers/Maps';
import About from './containers/About';
import Features from './containers/Features';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/features" component={Features} />
          <Route exact path="/maps" component={Maps} />
          <Route exact path="/about" component={About} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;

injectGlobal`
  body {
    font-family: 'Montserrat', sans-serif;
  }
  ${media.down.tablet`
    h1, .h1 {
      font-size: 2.133rem;
      line-height: 2.933rem;
    }
    h2, .h2 {
      font-size: 1.6rem;
      line-height: 2.133rem;
    }
    h3, .h3 {
      font-size: 1.333rem;
      line-height: 1.867rem;
    }
    h4, .h4 {
      font-size: 1.2rem;
    }
    h5, .h5 {
      font-size: 1rem;
    }
    h6, .h6 {
      font-size: 0.9rem;
    }
  `}
  ${media.up.desktop`
    .overlap-y-lg {
      margin-top: -4.5rem !important;
    }
    .overlap-x-lg {
      margin-left: -4.5rem;
    }
  `}
`;
