import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';

const title = 'React';

const welcome = {
  greeting:'Hey',
  title: 'React',
}

function getTitle(title){
  return title;
}

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, 
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
    },
];


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
	  <Router>
	    <div>
        {/*<h1>
        1 {welcome.greeting} {welcome.title}
        </h1>

        <h1>
          2 {getTitle('React')}
        </h1>

        <h1>3 Hello world {title}</h1>  */}
        <ul>
          {list.map(function(item){
            return <li>{item.title}</li>;
          })}
        </ul>
        
        <Search />
        
        <PrivateRoute exact path="/" component={Home}/> 
	    </div>
	  </Router>
    );
  }
}

function Search(){
  return(
    <div>
      <label htmlFor='search'>Search :</label>
      <input id ='search' type='text'/>
    </div>
  );
}

export default App;