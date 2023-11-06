import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import { FaAngleDown } from "react-icons/fa6"

import Layout from "../components/layout"

import * as styles from "../components/index.module.css"
import Seo from "../components/seo"

const DiaryPage = ({ data }) => {
    const [joinSeriesData, setJoinSeriesData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)

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
    const handleAccodian = (e, index) => {
        if (selectedIndex === index) {
            setSelectedIndex(null)
        } else {
            setSelectedIndex(index)
        }
    }
    useEffect(() => {
        setJoinSeriesData(joinObjects(seriesData))
    }, [])
    return (
        <Layout>
            {/* 시리즈 컴포넌트 스타일 작업하여 수정필요 */}
            {joinSeriesData ? (
                <div className={styles.textCenter}>
                    <div className="post-accodian">
                        <h3 className="post-tit">diary page</h3>
                        {joinSeriesData.map((series, index) => {
                            return (
                                <div
                                    key={series.series}
                                    className={`post-accodian-wrap ${
                                        selectedIndex === index ? "on" : ""
                                    }`}>
                                    <div
                                        className="post-accodian-tap"
                                        onClick={e => handleAccodian(e, index)}>
                                        <span className="tit">
                                            <span className="tit-icon close">
                                                📁
                                            </span>
                                            <span className="tit-icon open">
                                                📂
                                            </span>{" "}
                                            {series.series}
                                        </span>
                                        <FaAngleDown className="btn-icon" />
                                    </div>
                                    <ul className="post-accodian-content">
                                        {series.datas.map(data => {
                                            return (
                                                <li key={data.slug}>
                                                    <Link
                                                        to={data.slug}
                                                        className="link">
                                                        {data.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <></>
            )}
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
