import React, { Component } from "react";
import Navbar from "./Navbar";

type SnippetProps = {
  text: string,
}

class CommandSnippet extends Component<SnippetProps, {}> {
  render() {
    return (
      <div className="code command-snippet">
        <div className="prompt">$</div>
        <div className="command">
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default class Install extends Component<{}, {}> {
  render() {
    return (
      <>
        <Navbar/>

        <div className="row main-frame">
          <div className="col-0 col-md-2 col-lg-3"/>

          <div className="col-12 col-md-8 col-lg-6">
            <p>
              The recommended installation process is to use Go.
            </p>

            <p>
              Make sure you have the latest version of the Go programming language installed, then run
            </p>

            <CommandSnippet text={"go install github.com/cstuartroe/teko@latest"}/>

            <p>
              For more information, check out{' '}
              <a href="https://github.com/cstuartroe/teko">
                the GitHub repository
              </a>
              .
            </p>
          </div>
        </div>
      </>
    );
  }
}
