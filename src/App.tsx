import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CodeRunner from "./CodeRunner";
import Lesson from "./Lesson";

import "../static/scss/main.scss";

type State = {

}

class App extends Component<{}, State> {
  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact={true} path="" render={() => (
              <Lesson definition={{title: "Hello World", children: []}}/>
            )}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
