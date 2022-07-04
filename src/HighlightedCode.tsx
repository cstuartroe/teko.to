import React, { Component } from "react";

const regexes: [RegExp, string][] = [
  [/\/\/.*/, 'teko-comment'],
  [/"[^"]*"/, 'teko-string'],
  [/(?<![a-z])(fn|var|type|while|for|in|if|then|else|do|scope|Map|Set)(?![a-z])/, 'teko-keyword'],
];

function processLine(s: string): any[] {
  for (const pair of regexes) {
    const [regex, className] = pair;

    const match = regex.exec(s);

    if (match != null) {
      const before = s.substring(0, match.index);
      const after = s.substring(match.index + match[0].length);

      return [
        ...processLine(before),
        <span className={className}>{match[0]}</span>,
        ...processLine(after),
      ];
    }
  }

  return [s];
}

type Props = {
  rows: number,
  content: string,
}

export default class HighlightedCode extends Component<Props, any> {
  render() {
    return (
      <div className="highlighted-code">
        {this.props.content.split('\n').map(line => <>
          {processLine(line)}
          {'\n'}
        </>)}
      </div>
    );
  }
}
