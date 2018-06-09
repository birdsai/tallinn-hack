import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

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
      <div>
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
