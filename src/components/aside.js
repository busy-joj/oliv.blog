import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FaGithub } from 'react-icons/fa6'
import './layout.css'

const Aside = () => (
    <div class="aside">
        <div class="aside-img">
            <span class="img">
                <StaticImage src="../images/profile.jpg" loading="eager" alt=""/>
            </span>
        </div>
        <div class="aside-txt">
            <span class="name">category</span>
            <ul>
                {/* <li class="info">All<span> { totalCount }</span></li> */}
                <li class="info">
                    <Link to='/' className="info-link">All<span> (0)</span></Link>
                </li>
                <li class="info">
                    <Link to='/' className="info-link">Javascript</Link>
                </li>
                <li class="info">
                    <Link to='/' className="info-link">Javascript</Link>
                </li>
                <li class="info">
                    <Link to='/' className="info-link">Javascript</Link>
                </li>
            </ul>
        </div>
        <div class="aside-bt">
            <Link to="https://github.com/busy-joj">
                <FaGithub className="btn-icon"/><span className="blind">GitHub</span>
            </Link>
            <Link to="https://github.com/busy-joj">
                <FaGithub className="btn-icon"/><span className="blind">GitHub</span>
            </Link>
            <Link to="https://github.com/busy-joj">
                <FaGithub className="btn-icon"/><span className="blind">GitHub</span>
            </Link>
        </div>
    </div>
)

export default Aside
