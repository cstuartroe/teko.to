import React, { Component } from "react";
import Navbar from "./Navbar";

function FinnishWord(props: {word: string}) {
  return <a href={`https://en.wiktionary.org/wiki/${props.word}#Finnish`} style={{fontStyle: "italic"}}>
    {props.word}
  </a>
}

export default class About extends Component<{}, {}> {
  render() {
    return (
      <>
        <Navbar/>

        <div className="row main-frame">
          <div className="col-0 col-md-2 col-lg-3"/>

          <div className="col-12 col-md-8 col-lg-6">
            <h2>What is Teko?</h2>

            <p>
              Teko is a programming language created by Conor Stuart-Roe. It is a high-level, interpreted
              language that is statically and structurally typed. In many ways, the most similar language
              to Teko is TypeScript.
            </p>

            <h2>What type of project is Teko right for?</h2>

            <p>
              Teko hasn't found a particular niche yet, but it's safe to say it's good for the same types of
              projects as any other scripting language - ones for which a quick start is desired and developer
              time is far more valuable than processor time.
            </p>

            <p>
              Teko's particular approach to typing - that is, one which makes maximal use of structural
              typing, type inference, and type manipulation - is designed to get out of the programmer's
              way as much as possible without sacrificing safety. The edge it might have over other scripting
              languages is this added measure of safety, which hopefully comes at a minimal cost in added
              mental energy spent on satisfying the type checker.
            </p>

            <h2>
              When was Teko created?
            </h2>

            <p>
              I first began work on Teko in December 2018, but the project has largely been an education in
              compiler design for me, and it was much slower going and with many more false starts than it
              would have been for someone already practiced in programming language implementation.
            </p>

            <p>
              The current Go implementation was begun in November 2020, and it's been a basically usable language
              since spring 2022.
            </p>

            <h2>Where does the name come from?</h2>

            <p>
              <FinnishWord word={"teko"}/> is a Finnish word meaning "action" or "deed".
              It is also used as a prefix denoting artifice, transforming
              e.g. <FinnishWord word={"äly"}/> "intelligence" into <FinnishWord word={"tekoäly"}/> "artificial
              intelligence", <FinnishWord word={"kieli"}/> "language" into <FinnishWord word={"tekokieli"}/>{' '}
              "constructed language", <FinnishWord word={"jää"}/> "naturally occurring ice"
              to <FinnishWord word={"tekojää"}/> "ice made in a freezer", and perhaps my favorite,
              the word <FinnishWord word={"pirteä"}/> "vivacious" becomes <FinnishWord word={"tekopirteä"}/>,
              a word which Wiktionary defines as "someone who pretends to be lively, despite being tired" (#relatable).
            </p>
          </div>
        </div>
      </>
    );
  }
}
