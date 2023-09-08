import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FaGithub } from "react-icons/fa6"

import "./layout.css"

const Aside = data => {
    let { allMarkdownRemark } = data
    let { group } = allMarkdownRemark
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
                {/* <div className="main-intro">
                <h2>Welcome!💫 {data.site.siteMetadata.title}</h2>
                <p>안녕하세요!</p>
                <p>지속가능한 프론트엔드 개발자 oliv입니다!</p>
            </div> */}
                {/* <h4>{data.allMarkdownRemark.totalCount} Post</h4> */}
                <span class="name">category</span>
                <ul>
                    {group.map(v => (
                        <li>{v}</li>
                    ))}
                    <li class="info">
                        <Link to="/" className="info-link">
                            All<span> (0)</span>
                        </Link>
                    </li>
                    <li class="info">
                        <Link to="/" className="info-link">
                            Javascript
                        </Link>
                    </li>
                    <li class="info">
                        <Link to="/" className="info-link">
                            Javascript
                        </Link>
                    </li>
                    <li class="info">
                        <Link to="/" className="info-link">
                            Javascript
                        </Link>
                    </li>
                </ul>
            </div>
            <div class="aside-bt">
                <Link to="https://github.com/busy-joj">
                    <FaGithub className="btn-icon" />
                    <span className="blind">GitHub</span>
                </Link>
                <Link to="https://github.com/busy-joj">
                    <FaGithub className="btn-icon" />
                    <span className="blind">GitHub</span>
                </Link>
                <Link to="https://github.com/busy-joj">
                    <FaGithub className="btn-icon" />
                    <span className="blind">GitHub</span>
                </Link>
            </div>
        </div>
    )
}

export const query = graphql`
    query {
        allMarkdownRemark(limit: 10) {
            group(field: { frontmatter: { category: SELECT } }) {
                fieldValue
                totalCount
            }
        }
    }
`

export default Aside
