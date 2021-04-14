import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CountryList from './country/CountryList';
import CountryEdit from './country/CountryEdit';
import LocationEdit from './location/LocationEdit';
import LocationList from './location/LocationList';
import AgencyEdit from './agency/AgencyEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/country/list' exact={true} component={CountryList}/>
          <Route path='/country/:id' component={CountryEdit}/>
          <Route path='/location/list' exact={true} component={LocationList}/>
          <Route path='/location/:id' component={LocationEdit}/>
          <Route path='/agency/:id' component={AgencyEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;