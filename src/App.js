import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CountryList from './CountryList';
import CountryEdit from './CountryEdit';
import LocationEdit from './LocationEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/country/list' exact={true} component={CountryList}/>
          <Route path='/country/:id' component={CountryEdit}/>
          <Route path='/location/:id' component={LocationEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;