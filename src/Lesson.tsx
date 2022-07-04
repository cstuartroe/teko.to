import React, { Component } from "react";
import { LessonDef } from "./types";
import { parse } from "@textlint/markdown-to-ast";
import CodeRunner from "./CodeRunner";

function AstNode(props: {src: any}) {
  const { src } = props;

  let children = [];
  if (src.children) {
    children = src.children.map((node: any, i: number) => <AstNode src={node} key={i}/>);
  }

  switch (src.type) {
    case "Str":
      return src.value;

    case "Header":
      switch (src.depth) {
        case 1:
          return <h1>{children}</h1>;
        case 2:
          return <h2>{children}</h2>;
        case 3:
          return <h3>{children}</h3>;
      }
      break;

    case "Paragraph":
      return <p>{children}</p>;

    case "CodeBlock":
      const parts = src.value.split('---');
      const starter_code = parts[0];
      let target_output = undefined;
      if (parts.length > 1) {
        target_output = parts[1].trim();
      }

      return <CodeRunner {...{starter_code, target_output}}/>

    default:
      console.log("Unknown node type");
      console.log(src);
  }

  return <div/>;
}

type Props = {
  definition: LessonDef,
}

type State = {
  content: string,
}

export default class Lesson extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
    }
  }

  componentDidMount() {
    fetch(`/static/md/${this.props.definition.title}.md`)
      .then(response => response.text())
      .then(content => {
        this.setState({content})
      })
  }

  render() {
    const ast = parse(this.state.content);

    return (
      <div className="row lesson">
        <div className="col-12">
          {ast.children.map((node: any, i: number) => <AstNode src={node} key={i}/>)}
        </div>
      </div>
    );
  }
}
