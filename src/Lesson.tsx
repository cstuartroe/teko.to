import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { LessonDef } from "./types";
import { parse } from "@textlint/markdown-to-ast";
import CodeRunner from "./CodeRunner";
import LessonList from "./LessonList";

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
  title: string,
  lessons: LessonDef[],
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

  getContent() {
    fetch(`/static/md/${this.props.title}.md`)
      .then(response => response.text())
      .then(content => {
        this.setState({content})
      });
  }

  componentDidMount() {
    this.getContent();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (prevProps.title !== this.props.title) {
      this.getContent();
    }
  }

  render() {
    const ast = parse(this.state.content);

    return (
      <div className="row lesson">
        <div className="col-2 lesson-panel">
          <LessonList lessons={this.props.lessons} position={[]} visible={true}/>
        </div>
        <div className="col-1"/>
        <div className="col-6">
          {ast.children.map((node: any, i: number) => <AstNode src={node} key={i}/>)}
        </div>
      </div>
    );
  }
}

export function LessonFromParams(props: {lessons: LessonDef[]}) {
  let { title } = useParams();

  if (title === undefined) {
    return null;
  }

  return <Lesson title={title} lessons={props.lessons}/>
}
