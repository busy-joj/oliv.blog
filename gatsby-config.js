/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
    siteMetadata: {
        title: `oliv.blog`,
        description: `지속가능한 개발자가 되기 위해 써내려가는 블로그입니다.`,
        author: `Jeong Younjung`,
        siteUrl: `https://d301gw6ixi4s19.cloudfront.net/`,
    },
    plugins: [
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ["G-FPSELH07Q0"],
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 800,
                        },
                    },
                    {
                        resolve: "gatsby-remark-prismjs",
                        options: {
                            classPrefix: "language-",
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: false,
                            noInlineHighlight: false,
                            languageExtensions: [],
                            prompt: {
                                user: "root",
                                host: "localhost",
                                global: false,
                            },
                        },
                    },
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-mdx`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/`,
                name: `src`,
            },
        },
    ],
}
