import React from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import Seo from "../components/seo"

const postTemplate = ({ data }) => {
	let { markdownRemark } = data
	let { frontmatter, html } = markdownRemark
	return (
		<Layout>
			<Seo title={frontmatter.title} />
			<div className='post-article'>
				<h2 className='post-article-tit'>{frontmatter.title}</h2>
				<div className='post-article-info'>
					<span className='date'>{frontmatter.date}</span>
					<span>
						{frontmatter.tags.map(v =>(
							<span className='tag'>{v}</span>
						))}
					</span>
				</div>
				<div 
					className='post-article-txt'
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query ($id: String!) {
		markdownRemark (id: { eq: $id }) {
			id
			html
			frontmatter {
				slug
				category
				date
				title
				tags
			}
		}
	}
`
export const Head = ({ data }) => <Seo title={data.markdownRemark.frontmatter.title} />

export default postTemplate
