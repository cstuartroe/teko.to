import React, { Component } from "react";

type State = {
  code: string,
  output: string,
}

export default class CodeRunner extends Component<{}, State>{
  constructor(props: {}) {
    super(props);

    this.state = {
      code: "",
      output: "",
    }
  }

  async runCode() {
    this.setState({
      output: "",
    })

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
    }
  }

  // numLines() {
  //   return (this.state.code.match(/\n/g) || []).length + 1;
  // }
  //
  // lineNumbers() {
  //   const numbersString = Array.from({length: this.numLines()}, (_, i) => i + 1).join('\n');
  //
  //   return <div className="line-numbers">{numbersString}</div>
  // }

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
        <button onClick={() => this.runCode()}>Run!</button>
      </div>
      <div className="col-6 code code-input">
        <textarea rows={numLines} spellCheck={false}
                  onChange={event => this.setState({code: event.target.value})}/>
        <div className="line-numbers">{numbersString}</div>
      </div>
      <div className="col-6 code code-output">
        {this.state.output}
      </div>
    </div>
  }
}
