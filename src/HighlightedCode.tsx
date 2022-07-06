import React, { Component } from "react";

const block_comment_regex = /(\/\*|\*\/)/

const regexes: [RegExp, string][] = [
  [/\/\/.*/, 'teko-comment'],
  [/"[^"]*"/, 'teko-string'],
  [/(?<![a-z])(fn|var|type|while|for|in|if|then|else|do|scope|Map|Set)(?![a-z])/, 'teko-keyword'],
  [/\/\*/, 'teko-comment'],
];

function processLine(s: string, index: number, state: ParserState): JSX.Element[] {
  if (state.blockCommentDepth > 0) {
    const match = block_comment_regex.exec(s)

    if (match === null) {
      return [<span className='teko-comment' key={index}>{s}</span>];
    } else {
      if (match[0] === '/*') {
        state.blockCommentDepth += 1;
      } else if (match[0] === '*/') {
        state.blockCommentDepth -= 1;
      } else {
        throw "Bad regex";
      }

      return [
        <span className='teko-comment' key={index}>{s.substring(0, match.index + 2)}</span>,
        ...processLine(s.substring(match.index + 2), index + 1, state),
      ];
    }
  }

  for (const pair of regexes) {
    const [regex, className] = pair;

    const match = regex.exec(s);

    if (match != null) {
      const before = s.substring(0, match.index);
      const after = s.substring(match.index + match[0].length);

      const beforePieces = processLine(before, index, state);
      const span = <span className={className} key={index + beforePieces.length}>{match[0]}</span>;

      if (match[0] === '/*') {
        state.blockCommentDepth += 1;
      }

      const afterPieces = processLine(after, index + beforePieces.length + 1, state);

      return [...beforePieces, span, ...afterPieces];
    }
  }

  return [<span key={index}>{s}</span>];
}

type Props = {
  rows: number,
  content: string,
}

type ParserState = {
  blockCommentDepth: number,
}

export default class HighlightedCode extends Component<Props, any> {
  render() {
    const parserState = {
      blockCommentDepth: 0,
    };

    return (
      <div className="highlighted-code">
        {this.props.content.split('\n').map((line, i) => <span key={i}>
          {processLine(line, 0, parserState)}
          {'\n'}
        </span>)}
      </div>
    );
  }
}
