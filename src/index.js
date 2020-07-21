import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css';
import App from '../src/components/App';
import * as serviceWorker from './serviceWorker';

function Index() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={App} />
        </Switch>
      </Router>
    </Fragment>
  )
}
ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
