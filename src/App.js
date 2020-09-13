import React, { useState, useEffect } from 'react';
import NavBar from './components/navbar';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Counters from './components/counters';
// import About from './components/pages/about';
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
import axios from 'axios';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "./Auth";

const App = () => {

  const loadUsers = async () => {
    axios.get('http://localhost:8081/inventory').then(result => console.log(result.data));
  }

  const initialStorage = JSON.parse(window.localStorage.getItem('counters'));
  const initialCounters = [
    { id: 1, value: 4, name: 'apple' },
    { id: 2, value: 0, name: 'banana' },
    { id: 3, value: 0, name: 'grape' },
    { id: 4, value: 2, name: 'peach' }
  ];
  const [counters, setCounters] = useState(initialStorage || initialCounters);

  useEffect(() => {
    //loadUsers();
    window.localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters])

  const getTotal = () => {
    let t = counters.reduce((total, item) => (total + item.value), 0);
    return t;
  }

  const handleIncrement = counter => {

    const newCounters = counters.map(item => {
      if(item.id === counter.id) {
        return {...item, value: item.value + 1}
      }
      return item;
    });
    setCounters(newCounters);
  }

  const handleDecrement = counter => {

    const newCounters = counters.map(item => {
      if(item.id === counter.id && item.value > 0) {
        return {...item, value: item.value - 1}
      }
      return item;
    });
    setCounters(newCounters);
  }

  const handleDelete = counterId => {
    console.log('Delete event', counterId);
    const newCounters = counters.filter(c => c.id !== counterId);
    setCounters(newCounters);
  };

  const handleReset = () => {

    const newCounters = counters.map(item => {
      return {...item, value: 0}
    });
    setCounters(newCounters);
  }

  return (
    
    <React.Fragment>
      <AuthProvider>
        <Router>
          <NavBar total={getTotal()}/>
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

/**
 * <Counters 
            counters={counters}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleReset}
            onDelete={handleDelete}
          />
 */

export default App;
