import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FaGithub, FaLinkedin } from "react-icons/fa6"

import "./layout.css"

const Aside = ({ siteCatagory, siteArticleTotal }) => {
    return (
        <div class="aside">
            <div class="aside-img">
                <span class="img">
                    <StaticImage
                        src="../images/profile.jpg"
                        loading="eager"
                        alt=""
                    />
                </span>
            </div>
            <div class="aside-txt">
                <span class="name">category</span>
                <ul>
                    <li class="info">
                        <Link to="/" className="info-link">
                            All<span> ({siteArticleTotal})</span>
                        </Link>
                    </li>
                    {siteCatagory.map(catagory => (
                        <li class="info">
                            <Link to="/" className="info-link">
                                {catagory.fieldValue}({catagory.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div class="aside-bt">
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
