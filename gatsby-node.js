const path = require(`path`)
const postTemplate = path.resolve(`./src/templates/postTemplate.js`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  if(result.errors){
    reporter.panicOnBuild(`Error while running GraphQl query.`)
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: postTemplate,
      context: { id : node.id},
    })
  })
}