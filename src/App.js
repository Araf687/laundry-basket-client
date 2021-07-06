import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home/Home';
import NotFound from './components/NotFound/NotFound';

export const UserContext=createContext({});

function App() {
  const [loggedInUser,setLoggedInUser]=useState({});
  const [selectedService,setSelectedService]=useState("");
  const sessionData=sessionStorage.getItem('user');
  if(!loggedInUser.email && sessionData){
    setLoggedInUser(JSON.parse(sessionData));
}
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser,selectedService,setSelectedService]}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard> 
          </PrivateRoute>

          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
