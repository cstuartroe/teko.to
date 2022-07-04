import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LessonDef } from "./types";
import Lesson from "./Lesson";

import "../static/scss/main.scss";

type State = {
  lessons: LessonDef[],
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      lessons: [],
    }
  }

  componentDidMount() {
    fetch("/lessons.json")
      .then(res => res.json())
      .then(lessons => this.setState({lessons}))
  }

  render() {
    return (
      <div className="container-fluid">
        <Router>
          <Switch>
            <Route exact={true} path="" render={() => (
              <Lesson definition={{title: "Hello World", children: []}} lessons={this.state.lessons}/>
            )}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
