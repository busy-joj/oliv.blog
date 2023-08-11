import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header
    className="header"
  >
    <Link
      to="/"
      className="header-logo"
    >
      {siteTitle}
    </Link>
    <Link
      to="/"
      className="header-go"
    >
      Go to Resume
    </Link>
    <nav
      className="header-nav"
    >
      <ul
        className="header-nav-list"
      >
        <li>
          <Link to="./" className="link active">Home</Link>
        </li>
        <li>
          <Link to="./article" className="link">Article</Link>
        </li>
        <li>
          <Link to="./contact" className="link">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
