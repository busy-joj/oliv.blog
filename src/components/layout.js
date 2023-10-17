import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Aside from "./aside"
import Footer from "./footer"

import "./layout.css"

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            allMarkdownRemark {
                group(field: { frontmatter: { category: SELECT } }) {
                    fieldValue
                    totalCount
                }
                totalCount
            }
            site {
                siteMetadata {
                    author
                    title
                }
            }
        }
    `)

    return (
        <div className="wrap">
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
            <main className="main">
                <Aside
                    siteCatagory={data.allMarkdownRemark.group}
                    siteArticleTotal={data.allMarkdownRemark.totalCount}
                />
                <div className="content">{children}</div>
            </main>
            <Footer
                siteTitle={data.site.siteMetadata?.title || `Title`}
                siteAthor={data.site.siteMetadata?.author || `author`}
            />
        </div>
    )
}

export default Layout
