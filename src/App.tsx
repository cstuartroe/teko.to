import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CodeRunner from "./CodeRunner";

import "../static/scss/main.scss";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact={true} path="" render={() => <CodeRunner/>}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;