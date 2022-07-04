import React, { Component } from "react";
import Navbar from "./Navbar";
import CodeRunner from "./CodeRunner";

const starterCode = (
  `// <-- Try clicking that arrow if you're not sure what to do.

println("Try clicking one of the header links!")
`);

export default class Home extends Component<{}, {}> {
  render() {
    return (
      <>
        <Navbar/>

        <div className="row">
          <div className="col-1 col-md-2 col-lg-3"/>
          <div className="col-10 col-md-8 col-lg-6">
            <div style={{paddingTop: "20vh"}}/>
            <CodeRunner starter_code={starterCode} frozen/>
          </div>
        </div>
      </>
    );
  }
}
