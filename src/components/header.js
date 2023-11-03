import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
    <header className="header">
        <Link to="/" className="header-logo">
            {siteTitle}
        </Link>
        <a
            href="https://www.notion.so/Frontend-Engineer-e13dfe60dd104df3be3045dae63869dc?pvs=4"
            target="_blank"
            rel="noreferrer"
            className="header-go">
            Go to Resume
        </a>
        <nav className="header-nav">
            <ul className="header-nav-list">
                {/* [시작] 2023.11.03 링크 수정필요 */}
                <li>
                    <Link to="./" className="link active">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="./" className="link">
                        Article
                    </Link>
                </li>
                {/* [끝] 2023.11.03 링크 수정필요 */}
                <li>
                    <Link to="/diary" className="link">
                        Diary
                    </Link>
                </li>
                {/* <li>
                    <Link to="./contact" className="link">
                        Contact
                    </Link>
                </li> */}
            </ul>
        </nav>
    </header>
)

export default Header
