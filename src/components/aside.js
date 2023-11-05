import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FaGithub, FaLinkedin } from "react-icons/fa6"

import "./layout.css"

const Aside = ({ siteCatagory, siteArticleTotal }) => {
    return (
        <div className="aside">
            <div className="aside-img">
                <span className="img">
                    <StaticImage
                        src="../images/profile.jpg"
                        loading="eager"
                        alt=""
                    />
                </span>
            </div>
            <div className="aside-txt">
                <span className="name">category</span>
                <ul>
                    <li className="info">
                        <Link to="/" className="info-link">
                            All<span> ({siteArticleTotal})</span>
                        </Link>
                    </li>
                    {siteCatagory.map((catagory, index) => (
                        <li key={index} className="info">
                            <Link to={`/`} className="info-link">
                                {catagory.fieldValue}({catagory.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="aside-bt">
                <Link to="https://github.com/busy-joj">
                    <FaGithub className="btn-icon" />
                    <span className="blind">GitHub</span>
                </Link>
                <Link to="https://www.linkedin.com/in/jyj-frontenddev/">
                    <FaLinkedin className="btn-icon" />
                    <span className="blind">Linkedin</span>
                </Link>
            </div>
        </div>
    )
}

export default Aside
