import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// Containers
import Home from './containers/Home';
import Maps from './containers/Maps';

// Components
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/maps" component={Maps} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
