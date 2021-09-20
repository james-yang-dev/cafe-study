import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from '../layout/Header'

import { OrderPage, DetailPage } from '../pages'

function Routes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={OrderPage} />
        <Route exact path="/order" component={OrderPage} />
        <Route exact path="/detail" component={DetailPage} />
      </Switch>
    </Router>
  );
}

export default Routes;