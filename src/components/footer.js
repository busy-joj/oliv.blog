import React from 'react'
import { Link } from "gatsby"

import "./layout.css"

const Footer = ({ siteTitle, siteAthor }) => (
    <footer className="footer">
        <Link to="/" className='footer-sns'>{ siteTitle }</Link>
        <div className="footer-copy">
            &copy; {new Date().getFullYear()} { siteAthor } Built with Gatsby &#9679; Hosted on GitHub
        </div>
    </footer>
)

export default Footer