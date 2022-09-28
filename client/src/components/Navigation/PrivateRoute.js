import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import SignIn from '../SignIn';
import Landing from '../Landing';
import history from './history';
import Reviews from '../Reviews';
import Search from '../Search';
import MyPage from '../MyPage';

export default function PrivateRoute({

}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/Home" exact component={Home} />
      <Route path="/SignIn" exact component={SignIn} />
      <Route path="/" exact component={Landing} />
      <Route path="/reviews" exact component={Reviews} />
      <Route path="/search" exact component={Search} />
      <Route path="/myPage" exact component={MyPage} />
      </Switch>
    </Router>
  );
}