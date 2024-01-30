---
slug: "/react-contribution"
title: "express로 웹 크롤링하기"
date: "2024-01-11"
series: "Project. 코테PT💪"
category: "Node.js"
tags: ["project", "server", "Javascript", "API"]
---

프론트엔드 개발자로 서버를 만들게 될 줄은 꿈에도 몰랐다...  
교육을 들으며 서버에 대해서 많이 알고, 백엔드 개발자와 소통도 문제없다고 생각했는데  
직접 서버를 만들어야 하다니 눈 앞이 캄캄했다.  
그래도 서버때문에 포기할 수는 없으니 여기 저기 물어보고, 찾아보며 해결해보았다ㅎㅎ

서버를 만들기 위해 다른 언어를 배우기에는  
너무 배보다 배꼽이 큰 거 같아서 그래도 같은 JS가문이라면 조금이나마 수월하지 않을까 생각이 들어서  
Node.js로 서버를 구현하기로 했다.

express, axios, cheerio, cors! 이 네가지 라이브러리를 이용하였다.

```javascript
const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const cors = require("cors")
```

아래의 코드를 살펴보면 axios를 활용해서 타겟 페이지에서 HTML data를 가지고 온다.  
가지고 온 HTML Data를 cheerio를 활용해 load하고 그 안에 필요한 데이터를 가공해서  
하나의 배열에 넣어준다.

```javascript
app.get("/api", function (req, res) {
    const getHTML = async () => {
        try {
            const html = await axios.get(url, { headers })
            let List = []

            const $ = cheerio.load(html.data)
            const $bodyList = $(".table-responsive tr")
            $bodyList
                .filter(
                    (i, el) =>
                        $(el).find("td.result").has(".result-ac").length > 0
                )
                .map((i, el) => {
                    List[i] = {
                        problemNum: $(el).find("td a.problem_title").text(),
                        problemLink: $(el)
                            .find("td a.problem_title")
                            .attr("href"),
                        language: $(el).find("td.time").next("td").text(),
                        solvedTime: new Date(
                            $(el).find("td a.update").attr("title")
                        ),
                    }
                })
            return List
        } catch (error) {
            console.error(error)
            return []
        }
    }
    const lists = getHTML()
    res.json(lists)
})
```

실행!! 과연!! 결과는...?!?!?!  
서버를 처음 구축해보고, 실행해보니 긴장됐다... 제발 되라....!!!!!

결과는...

```bash
Promise { <pending> }
```

pending!!  
그래도 Rejected가 아니여서 덜 절망적이었다 ㅎㅎ  
pending은 약속된 결과 값이 반환되지 않은 상태로 Async / Await를 손보면 될듯하다!!  
getHTML() 함수를 호출할 때 await를 작성을 안해서 pending이었다!!

```javascript
app.get("/pet", async function (req, res) {
    const getHTML = async () => {
        try {
            const html = await axios.get(url, { headers })
            let List = []

            const $ = cheerio.load(html.data)
            const $bodyList = $(".table-responsive tr")
            $bodyList
                .filter(
                    (i, el) =>
                        $(el).find("td.result").has(".result-ac").length > 0
                )
                .map((i, el) => {
                    List[i] = {
                        problemNum: $(el).find("td a.problem_title").text(),
                        problemLink: $(el)
                            .find("td a.problem_title")
                            .attr("href"),
                        language: $(el).find("td.time").next("td").text(),
                        solvedTime: new Date(
                            $(el).find("td a.real-time-update").attr("title")
                        ),
                    }
                })
            return List
        } catch (error) {
            console.error(error)
            return []
        }
    }
    const lists = await getHTML()
    res.json(lists)
})
```

와우!!! 데이터가 매우 잘 넘어온다!!
이렇게 만들어진 api를 프론트엔드에서 호출해주면 완성!!

```javascript
useEffect(() => {
    const fetchData = async () => {
        await axios
            .get(`http://localhost:8080/pet`)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log("Error", error)
            })
    }
    fetchData()
}, [])
```

### 마치며🎉

정교하게 만들지는 못했지만, 내가 서버를 만들다니...!!!!  
만들어서 사용할 수 있어서 좋은 것도 있지만, 직접 서버를 만들어보니 서버와 클라이언트가 어떻게 소통하는지  
보다 명확하게 이해할 수 있었던 아주 좋은 기회였다!!  
하나 하나 고쳐나가고 추가하면서 DB도 만들어 연결하고 더욱 그럴 듯하게 만들어야겠다!!
