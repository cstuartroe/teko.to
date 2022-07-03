import React, { Component } from "react";

type State = {
  code: string,
  output: string,
  status: "ready" | "running" | "errored",
}

export default class CodeRunner extends Component<{}, State>{
  constructor(props: {}) {
    super(props);

    this.state = {
      code: "",
      output: "",
      status: "ready",
    }
  }

  async runCode() {
    if (this.state.status == "running") {
      return;
    }

    this.setState({
      output: "",
      status: "running",
    })

    try {
      const response = await fetch("/create_run/", {
        method: "POST",
        body: JSON.stringify({
          contents: this.state.code,
        }),
      });

      if (response.body == null) {
        return;
      }

      const reader = response.body.getReader();

      while (true) {
        const { value, done } = await reader.read();

        this.setState({
          output: this.state.output + new TextDecoder().decode(value),
        });

        if (done) break;

        if (this.state.output.length > 5000) {
          await reader.cancel()
          throw "Too long yo";
        }
      }

      this.setState({
        status: "ready",
      })
    } catch (e) {
      this.setState({
        status: "errored",
      })
    }
  }

  render() {
    let numbersString = "";
    let numLines = 0;

    const maxLineLength = 53;

    this.state.code.split('\n').forEach((line, i) => {
      numbersString += (i+1);

      const addedLines = Math.max(Math.floor((line.length + maxLineLength - 1)/maxLineLength), 1);

      numbersString += '\n'.repeat(addedLines);
      numLines += addedLines;
    })

    return <div className="row">
      <div className="col-12 code-top-bar">
        <button onClick={() => this.runCode()} disabled={this.state.status == "running"}>
          Run!
        </button>
      </div>
      <div className="col-6 code code-input">
        <textarea rows={numLines} spellCheck={false}
                  onChange={event => this.setState({code: event.target.value})}/>
        <div className="line-numbers">{numbersString}</div>
      </div>
      <div className="col-6 code code-output">
        {this.state.output}
        {this.state.status === "errored" && (
          <span className="runtime-error">Process killed.</span>
        )}
      </div>
    </div>
  }
}
