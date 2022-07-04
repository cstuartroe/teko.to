import React, { Component } from "react";
import { Link } from "react-router-dom";
const classNames = require("classnames");

type Props = {
  reverseHomeLinkColor?: boolean,
}

function NavbarLink(props: {title: string, href: string}) {
  const { title, href } = props;
  
  if (href[0] == "/") {
    return <Link to={href} className="navbar-link">
      {title}
    </Link>
  } else {
    return <a href={href} className="navbar-link" target="_blank">
      {title}
    </a>;
  }
}

const NavbarLinkDefs: [string, string][] = [
  ["About", "/about"],
  ["Install", "/install"],
  ["Learn", "/lesson/Hello_World"],
  ["Play", "/code"],
  ["GitHub", "https://github.com/cstuartroe/teko.to"],
];

export default class Navbar extends Component<Props, {}> {
  render() {
    const homeClassNames = classNames({
      "teko-home-link": true,
      "reverse": !!this.props.reverseHomeLinkColor,
    })

    return (
      <div className="row navbar">
        <div className="col-2" style={{padding: 0}}>
          <h1 className={homeClassNames}>
            <Link to="/">
              teko
            </Link>
          </h1>
        </div>
        <div className="col-0 col-md-3 col-lg-5"/>
        <div className="col-10 col-md-7 col-lg-5" style={{padding: 0}}>
          <div className="navbar-links">
            {NavbarLinkDefs.map((defn, i) => (
              <NavbarLink title={defn[0]} href={defn[1]} key={i}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
