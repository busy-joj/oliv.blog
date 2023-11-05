import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const DiaryPage = ({ data }) => {
    const [joinSeriesData, setJoinSeriesData] = useState([])

    let edges = data.allMarkdownRemark.edges
    const seriesData = Object.entries(edges).reduce((acc, [_, value]) => {
        const series = value.node.frontmatter.series
        const data = value.node.frontmatter
        return (acc = [
            {
                series: series,
                datas: data,
            },
            ...acc,
        ])
    }, [])
    const joinObjects = props => {
        const originalArray = props
        const resultObject = {}
        originalArray.forEach(item => {
            const { series, datas } = item
            if (resultObject[series]) {
                resultObject[series].datas.push(datas)
            } else {
                resultObject[series] = {
                    series: series,
                    datas: [datas],
                }
            }
        })
        const resultArray = Object.values(resultObject)
        return resultArray
    }
    console.log(seriesData)
    useEffect(() => {
        setJoinSeriesData(joinObjects(seriesData))
    }, [])
    return (
        <Layout>
            <h1>diary page</h1>
            <p>제작중입니다.</p>
            {/* 시리즈 컴포넌트 스타일 작업하여 수정필요 */}
            {joinSeriesData ? (
                <div>
                    {joinSeriesData.map(series => {
                        return (
                            <div key={series.series}>
                                {series.series}
                                {series.datas.map(data => {
                                    return (
                                        <div key={data.slug}>{data.title}</div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            ) : (
                <></>
            )}
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    )
}
export const Head = () => <Seo title="Diary" />

export const diaryQuery = graphql`
    query {
        allMarkdownRemark(filter: { frontmatter: { series: { ne: null } } }) {
            edges {
                node {
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
export default DiaryPage
