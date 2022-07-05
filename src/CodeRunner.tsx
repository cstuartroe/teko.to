import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import HighlightedCode from "./HighlightedCode";

type Props = {
  starter_code?: string,
  target_output?: string,
  frameHeight?: string,
  frozen?: boolean,
}

type State = {
  code: string,
  output?: string,
  status: "ready" | "running" | "errored",
  cursor: number,
}

export default class CodeRunner extends Component<Props, State>{
  private textarea =  React.createRef<HTMLTextAreaElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      code: props.starter_code || "",
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

    let maxLineLength = 80;
    const inputBox = this.textarea.current;
    if (inputBox !== null) {
      maxLineLength = Math.floor((inputBox.offsetWidth - 50) / 8.40);
    }

    this.state.code.split('\n').forEach((line, i) => {
      numbersString += (i+1);

      const addedLines = Math.max(Math.floor((line.length + maxLineLength - 1)/maxLineLength), 1);

      numbersString += '\n'.repeat(addedLines);
      numLines += addedLines;
    })

    const codeContent = this.state.code.replace(/ /g, '\xa0');

    let inputHeight = "300px";
    if (this.props.frameHeight) {
      inputHeight = this.props.frameHeight;
    } else if (this.props.frozen) {
      inputHeight = (22*numLines) + "px";
    }

    return <div className="row code-runner">
      <div className="col-12 code code-input" style={{height: inputHeight}}
           onClick={() => this.textarea.current?.focus()}>
        <HighlightedCode rows={numLines} content={codeContent}/>
        <textarea rows={numLines} spellCheck={false} ref={this.textarea}
                  value={codeContent} className="editable" readOnly={!!this.props.frozen}
                  onChange={event => this.setState({
                    code: event.target.value,
                    cursor: event.target.selectionEnd,
                  })}/>
        <div className="line-numbers">{numbersString}</div>
      </div>
      <button className="run-button"
              onClick={() => this.runCode()} disabled={this.state.status == "running"}>
        <FontAwesomeIcon icon={faPlay}/>
      </button>
      {this.state.output !== undefined && (
        <div className="col-12 code code-output">
          {this.state.output}
          {this.state.status === "errored" && (
            <span className="runtime-error">Process killed.</span>
          )}
          {this.state.output.trim() === this.props.target_output && (
            <span className="success-notif">Success!</span>
          )}
        </div>
      )}
    </div>
  }
}
