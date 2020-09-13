import React, { useState, useEffect } from 'react';
import NavBar from './components/navbar';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/homeComponent';
import LoginComponent from './components/loginComponent';
import SigngUpComponent from './components/signgUpComponent';
import ReserveComponent from './components/reserveComponent';
import Profile from './components/pages/profile';
import CreateEventComponent from './components/createEventComponent';
import EditUser from './components/pages/editUser';
import Users from './components/pages/users';
import Events from './components/pages/events';
import Configuration from './components/pages/config';
import NotFound from './components/pages/notFound';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "./Auth";

const App = () => {

  return (
    
    <React.Fragment>
      <AuthProvider>
        <Router>
          <NavBar />
          <main className="container">
            <div className="m-2">
              <Switch>
                <PrivateRoute exact path="/" component={HomeComponent} />
                <Route exact path="/login" component={LoginComponent} />
                <Route exact path="/signup" component={SigngUpComponent} />
                <PrivateRoute exact path="/reserve" component={ReserveComponent} />
                <PrivateRoute exact path="/createEvent" component={CreateEventComponent} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </main>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
