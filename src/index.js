import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import './index.css';
import AutorBox from './components/Autor';
import LivroBox from './components/Livro';
import Home from './components/Home';

ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute path="/" component={Home}/>
      <Route path='/autor' component={AutorBox} />
      <Route path='/livro' component={LivroBox} />
    </Route>
  </Router>),
  document.getElementById('root')
);
