import React, { Component } from "react";
import Navbar from "./Navbar";
import CodeRunner from "./CodeRunner";

export default class FreeCode extends Component<{}, {}> {
  render() {
    return (
      <>
        <Navbar/>
        <div className="row main-frame">
          <div className="col-0 col-md-1"/>
          <div className="col-12 col-md-10">
            <CodeRunner frameHeight={"60vh"}/>
          </div>
        </div>
      </>
    );
  }
}
