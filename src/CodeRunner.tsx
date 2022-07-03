import React, { Component } from "react";

type State = {
  code: string,
  output: string,
  status: "ready" | "running" | "errored",
  cursor: number,
}

export default class CodeRunner extends Component<{}, State>{
  private textarea =  React.createRef<HTMLTextAreaElement>();

  constructor(props: {}) {
    super(props);

    this.state = {
      code: "",
      output: "",
      status: "ready",
      cursor: 0,
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

        if (!response.ok) {
          throw "A resource limit was reached";
        }

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

  setCursor() {
    const ta = this.textarea.current;

    if (ta === null) { return; }

    ta.focus();
    ta.selectionEnd = this.state.cursor;
  }

  componentDidMount() {
    this.setCursor();
  }

  componentDidUpdate() {
    this.setCursor();
  }

  render() {
    let numbersString = "";
    let numLines = 0;

    let maxLineLength = 0;
    const inputBox = this.textarea.current;
    if (inputBox !== null) {
      maxLineLength = Math.floor((inputBox.offsetWidth - 50) / 9.65);
    }

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
        <textarea rows={numLines} spellCheck={false} ref={this.textarea}
                  value={this.state.code.replace(' ', '\xa0')}
                  onChange={event => this.setState({
                    code: event.target.value,
                    cursor: event.target.selectionEnd,
                  })}/>
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
