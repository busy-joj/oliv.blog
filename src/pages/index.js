import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "../components/index.module.css"
import "../components/post.css"

const IndexPage = ({ data }) => {
    console.log("index", data)
    return (
        <Layout>
            <div className={styles.textCenter}>
                <div className="post-list">
                    <h3 className="post-tit">Recent Posts</h3>
                    {data.allMarkdownRemark.edges.map(({ node }) => (
                        <div key={node.id} className="post-list-box">
                            <Link to={node.frontmatter.slug} className="tit">
                                {node.frontmatter.title}
                            </Link>
                            <span className="date">
                                {node.frontmatter.date}
                            </span>
                            <span className="desc">{node.excerpt}</span>
                            <span>
                                {node.frontmatter.tags.map((item, index) => {
                                    return (
                                        <span key={index} className="tag">
                                            {item}
                                        </span>
                                    )
                                })}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="Home" />

export const indexQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
            edges {
                node {
                    id
                    frontmatter {
                        category
                        date(formatString: "DD MMMM, YYYY")
                        title
                        slug
                        tags
                    }
                    excerpt
                }
            }
            totalCount
        }
    }
`

export default IndexPage
