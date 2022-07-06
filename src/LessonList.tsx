import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LessonDef } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const classnames = require("classnames");

type Props = {
  lesson: LessonDef,
  position: number[],
  visible: boolean,
  selected: string,
}

type State = {
  expanded: boolean,
}

function containsSublesson(lesson: LessonDef, title: string): boolean {
  if (lesson.title === title) {
    return true;
  } else {
    return lesson.children.some(child => containsSublesson(child, title));
  }
}

export class LessonItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: containsSublesson(props.lesson, props.selected),
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (prevProps.visible && !this.props.visible) {
      this.setState({expanded: false});
    }

    if (prevProps.selected !== this.props.selected) {
      this.setState({
        expanded: containsSublesson(this.props.lesson, this.props.selected),
      })
    }
  }

  toggleOpen() {
    this.setState({expanded: !this.state.expanded});

    window.getSelection()?.removeAllRanges();
  }

  render() {
    const {lesson, position, selected} = this.props;

    const icon = this.state.expanded ? faAngleDown : faAngleRight;

    const link_classnames = classnames({
      selected: selected === lesson.title,
    });

    return (
      <div className="lesson-list-section">
        <div className="lesson-list-item">
          <div className="lesson-number">{position.join('.')}</div>
          <div className={link_classnames}>
            <Link to={'/lesson/' + lesson.title.replace(' ', '_')}>
              {lesson.title}
            </Link>
          </div>
        </div>

        {lesson.children.length > 0 && (
          <FontAwesomeIcon icon={icon} onClick={() => this.toggleOpen()}/>
        )}

        {this.state.expanded && (
          <LessonList lessons={lesson.children} position={position}
                      visible={this.state.expanded} selected={selected}/>
          )}
      </div>
    );
  }
}

export default function LessonList(props: {
  lessons: LessonDef[],
  position: number[],
  visible: boolean,
  selected: string,
}) {
  return <>
    {props.lessons.map((lesson, i) => (
      <LessonItem lesson={lesson} key={i} position={[...props.position, i+1]}
                  visible={props.visible} selected={props.selected}/>
      ))}
  </>;
}
