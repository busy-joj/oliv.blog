import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Aside from "./aside"
import Footer from "./footer"

import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <div className="wrap">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className="main">
        <Aside />
        <div className="content">{children}</div>
      </main>
      <Footer siteTitle={data.site.siteMetadata?.title || `Title`} siteAthor={data.site.siteMetadata?.author || `author`} />
    </div>
  )
}

export default Layout
