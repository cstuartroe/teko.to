import React, { Component } from "react";

const regexes: [RegExp, string][] = [
  [/\/\/.*/, 'teko-comment'],
  [/"[^"]*"/, 'teko-string'],
  [/(?<![a-z])(fn|var|type|while|for|in|if|then|else|do|scope|Map|Set)(?![a-z])/, 'teko-keyword'],
];

function processLine(s: string, index: number): any[] {
  for (const pair of regexes) {
    const [regex, className] = pair;

    const match = regex.exec(s);

    if (match != null) {
      const before = s.substring(0, match.index);
      const after = s.substring(match.index + match[0].length);

      const beforePieces = processLine(before, index);
      const span = <span className={className} key={index + beforePieces.length}>{match[0]}</span>;
      const afterPieces = processLine(after, index + beforePieces.length + 1);

      return [...beforePieces, span, ...afterPieces];
    }
  }

  return [<span key={index}>{s}</span>];
}

type Props = {
  rows: number,
  content: string,
}

export default class HighlightedCode extends Component<Props, any> {
  render() {
    return (
      <div className="highlighted-code">
        {this.props.content.split('\n').map((line, i) => <span key={i}>
          {processLine(line, 0)}
          {'\n'}
        </span>)}
      </div>
    );
  }
}
