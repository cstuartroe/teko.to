import React, { Component } from "react";
import { Link } from "react-router-dom";
const classNames = require("classnames");

type Props = {
  reverseHomeLinkColor?: boolean,
}

function NavbarLink(props: {title: string, href: string}) {
  return <Link to={props.href} className="navbar-link">
    {props.title}
  </Link>
}

const NavbarLinkDefs: [string, string][] = [
  ["About", "/about"],
  ["Install", "/install"],
  ["Learn", "/lesson/Hello_World"],
  ["Free Code", "/code"],
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
              <NavbarLink title={defn[0]} href={defn[1]}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
