import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LessonDef } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  lesson: LessonDef,
  position: number[],
  visible: boolean,
}

type State = {
  expanded: boolean,
}

export class LessonItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: false,
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (prevProps.visible && !this.props.visible) {
      this.setState({expanded: false});
    }
  }

  toggleOpen() {
    this.setState({expanded: !this.state.expanded});

    window.getSelection()?.removeAllRanges();
  }

  render() {
    const {lesson, position} = this.props;

    const icon = this.state.expanded ? faAngleDown : faAngleRight;

    return (
      <div className="lesson-list-section">
        <div className="lesson-list-item">
          <div className="lesson-number">{position.join('.')}</div>
          <div>
            <Link to={'/lesson/' + lesson.title.replace(' ', '_')}>
              {lesson.title}
            </Link>
          </div>
        </div>

        {lesson.children.length > 0 && (
          <FontAwesomeIcon icon={icon} onClick={() => this.toggleOpen()}/>
        )}

        {this.state.expanded && (
          <LessonList lessons={lesson.children} position={position} visible={this.state.expanded}/>
          )}
      </div>
    );
  }
}

export default function LessonList(props: {lessons: LessonDef[], position: number[], visible: boolean}) {
  return <>
    {props.lessons.map((lesson, i) => (
      <LessonItem lesson={lesson} key={i} position={[...props.position, i+1]}
                  visible={props.visible}/>
      ))}
  </>;
}
