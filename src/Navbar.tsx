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
  ["GitHub", "https://github.com/cstuartroe/teko"],
];

export default class Navbar extends Component<Props, {}> {
  render() {
    const boxClassNames = classNames({
      "col-2": true,
      "logo-box": true,
      "reverse": !!this.props.reverseHomeLinkColor,
    })

    return (
      <div className="row navbar">
        <div className={boxClassNames}>
          <img src="/static/img/blue-fox.png"
               alt="blue fox logo by https://www.vecteezy.com/members/erwanwanto750414870"/>
          <h1 className="teko-home-link">
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
