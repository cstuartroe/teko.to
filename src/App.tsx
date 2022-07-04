import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LessonDef } from "./types";
import Lesson, { LessonFromParams } from "./Lesson";

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
      <Router>
        <div className="container-fluid">
          <Routes>
            <Route index element={<Lesson title={"Hello World"} lessons={this.state.lessons}/>}/>

            <Route path="lesson">
              <Route path=":title" element={<LessonFromParams lessons={this.state.lessons}/>}/>
            </Route>

            <Route path="*" element={<Navigate to="/" replace={true}/>}/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
