import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const diaryPage = ({ data }) => {
    let edges = data.allMarkdownRemark.edges
    console.log("diaryPage", edges)

    return (
        <Layout>
            <h1>diary page</h1>
            <p>제작중입니다.</p>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    )
}
export const Head = () => <Seo title="diary" />

export const diaryQuery = graphql`
    query {
        allMarkdownRemark(filter: { frontmatter: { series: { ne: null } } }) {
            edges {
                node {
                    id
                    frontmatter {
                        series
                        date
                        category
                        slug
                        tags
                        title
                    }
                }
            }
        }
    }
`
export default diaryPage
