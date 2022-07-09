import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { LessonDef } from "./types";
import { parse } from "@textlint/markdown-to-ast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CodeRunner from "./CodeRunner";
import LessonList, { lessonLink } from "./LessonList";
import Navbar from "./Navbar";

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

    case "HorizontalRule":
      return <hr/>;

    case "Code":
      return <span className="code">{src.value}</span>

    case "CodeBlock":
      const parts = src.value.split('---');
      const starter_code = parts[0].trim();
      let target_output = undefined;
      if (parts.length > 1) {
        target_output = parts[1].trim();
      }

      return <CodeRunner {...{starter_code, target_output}}/>

    case "Strong":
      return <span style={{fontWeight: 700}}>{children}</span>

    case "Emphasis":
      return <span style={{fontStyle: "italic"}}>{children}</span>

    default:
      console.log("Unknown node type");
      console.log(src);
      return null;
  }
}

function flatten(lessons: LessonDef[]): string[] {
  const out: string[] = [];

  lessons.forEach(lesson => {
    out.push(lesson.title);
    out.push(...flatten(lesson.children));
  });

  return out;
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

  getNeighbors(): [string | null, string | null] {
    const flattened = flatten(this.props.lessons);

    const index = flattened.indexOf(this.props.title);

    return [
      index > 0 ? flattened[index - 1] : null,
      (index < flattened.length - 1) ? flattened[index + 1] : null,
    ];
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
    const [prev, next] = this.getNeighbors();

    return (
      <>
        <Navbar reverseHomeLinkColor={true}/>

        <div className="row lesson">
          <div className="col-2 lesson-panel">
            <LessonList lessons={this.props.lessons} position={[]} visible={true} selected={this.props.title}/>
          </div>
          <div className="col-1 pl-0">
            {prev && (
              <Link to={lessonLink(prev)}>
                <div className="lesson-arrow">
                  <div>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="col-6 main-frame lesson-body">
            <h1>{this.props.title}</h1>
            {ast.children.map((node: any, i: number) => <AstNode src={node} key={i}/>)}
          </div>
          <div className="col-1 pr-0">
            {next && (
              <Link to={lessonLink(next)}>
                <div className="lesson-arrow">
                  <div>
                    <FontAwesomeIcon icon={faAngleRight}/>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }
}

export function LessonFromParams(props: {lessons: LessonDef[]}) {
  let { title } = useParams();

  if (title === undefined) {
    return null;
  }

  return <Lesson title={title.replace(/_/g, ' ')} lessons={props.lessons}/>
}
