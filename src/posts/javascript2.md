---
slug: "/react-useEffect"
title: "useEffect 사용법과 안티패턴 그리고 React Query, SWR"
date: "2023-08-27"
category: "React"
tags: ["Javascript", "React", "useEffect"]
---

## useEffect

-   컴포넌트가 Mount(화면에 첫 렌더링), Update(다시 렌더링), Unmount(화면에서 사라질때) 될 때 특정 작업을 실행할 수 있도록 하는 Hook입니다.
-   useEffect Hook을 componentDidMount와 componentDidUpdate, componentWillUnmount가 합쳐진 것으로 생각해도 좋습니다.

### useEffect의 문법

```javascript
import { useEffect } from "react"

// 렌더링 될때마다 실행
useEffect(() => {
    // 작업
})

// 화면에 첫 렌더링 될 때만(Mount) 실행
useEffect(() => {
    // 작업
}, [])

// 화면에 첫 렌더링 될 때 실행, value 값이 바뀔 때 사용
useEffect(() => {
    // 작업
}, [value]) // Dependency Array(의존성 배열)

// cleanup
useEffect(() => {
    return () => {
        //
    }
}, [dependencies])
```

### useEffect의 용례

useEffect()는 side-effect를 처리하기 위해 사용한다고 합니다.

#### side-Effect

side-Effect란 함수가 실행되면서 함수 외부에 존재하는 값이나 상태를 변경시키는 등의 행위를 맙합니다.  
예: 함수에서 전역변수의 값을 변경 / 함수 외부에 존재하는 버튼의 텍스트 변경 등

함수가 매개변수를 받아 결과를 생성하는 것과 무관한 외부의 상태를 변경하거나 외부와 상호작용해야 하는 코드는 useEffect() 함수를 통해 분리헤서 side-Effect를 처리하는 것이죠!

1. API 호출  
   API를 매번 컴포넌트가 새로 렌더링 될 때마다 데이터를 새로 가져오는 것은 낭비이니,  
   useEffect를 이용해 처음 mount될 때만 한 번 API를 가지고 오도록 하는 것입니다.

```javascript
import { useEffect, useState } from "react"

function Posts() {
    const [posts, setposts] = useState([])
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/1/posts")
            .then(resp => resp.json())
            .then(blogPosts => setposts(blogPosts))
    }, [])

    return (
        <div className="App">
            {posts &&
                posts.map(post => {
                    ;<li>{post.title}</li>
                })}
        </div>
    )
}

export default Posts
```

2. form
   사용자가 form에 키보드로 한 글자 한 글자 작성해서 검색할 때와 같이 특정 영역의 값이 변하고,
   그 때마다 리 렌더해줘야할 때 사용합니다.

```javascript
import { useEffect, useState } from "react"

function Search() {
    const [posts, setposts] = useState([])
    const [search, setsearch] = useState("")

    useEffect(() => {
        const filteredPosts = posts.filter(p => p.title.includes(search))
        setposts(filteredPosts)
    }, [search])

    return (
        <div className="App">
            {posts && (
                <input
                    type="text"
                    value={search}
                    onChange={e => {
                        setsearch(e.target.value)
                    }}
                />
            )}
            {posts && posts.map(post => <li>{post.title}</li>)}
        </div>
    )
}

export default Search
```

3. 이벤트 리스너를 추가 삭제할 때
   이벤트 리스너로 인해서 mount된 컴포넌트가 이벤트 리스너가 종료되고 unmount되었을 때도 계속해서 함수가 실행된다면,  
   성능에 부하가 올 수도 있겠죠?
   이럴때 useEffect의 cleanup 코드를 작성하여 이벤트 리스너를 삭제시켜줍니다.

```javascript
useEffect(() => {
    const timer = setInterval(() => {
        console.log("타이머 돌아가는 중")
    }, 1000)

    return () => {
        console.log("타이머 종료")
    }
})
```

### useEffect의 안티패턴

1. 무한 루프

```javascript
import { useEffect, useState } from "react"

function MyComponent() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        setCount(count + 1)
    })

    return <div>{count}</div>
}
```

useEffect을 의존성 배열 없이 사용하면 해당 컴포넌트가 렌더링 될때마다 setCount가 작동합니다.
setCount는 State이기 때문에 해당 컴포넌트를 Re-rendering 하게되고,
그러면 mount되어 또 useEffect이 작동합니다.
결국 무한 루프가 되어 버리죠...

2. 불필요한 의존성 배열

```javascript
import { useEffect } from "react"

function TodoList({ todos, filter }) {
    useEffect(() => {
        console.log("filtering todos")
        // filter todos
    }, [todos, filter])

    return <div>{/* todo list JSX */}</div>
}
```

## React-Query vs SWR

### React-Query

React Query는 React Application에서 서버 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트하는 작업을 도와주는 라이브러리입니다.
쉽게 말해 비동기 데이터를 불러오는 과정 중 발생하는 문제들을 해결해줍니다.

```javascript
    import {  useQuery } from '@tanstack/react-query';
    import axios from 'axios';

    const fetcher= () => {
    return axios.get(`/api/allassets,fetcher`);
    };

    function Explore=()=>{
    const {isLoading, error, data, isFetching} = useQuery("assets",fetcher);

    return (
        <div>
        {data.map(asset=><p>{asset.name}</p>)}
        </div>
    )}
```

#### React Query가 해결해주는 문제

1.  get을 한 데이터에 대해 update를 하면 자동으로 get을 다시 수행
2.  데이터가 오래 되었다고 판단되면 다시 get
3.  동일 데이터 여러번 요청하면 한번만 요청
4.  무한 스크롤

#### useQuery

data fetching을 위해 제공하는 기능으로 주로 GET 요청을 할 때 사용합니다.

-   queryKey(첫번째 파라미터): Query를 Unique key로 사용되는 배열
-   queryFn(두번째 파라미터)은 Promise를 리턴하는 함수
-   최종 반환 값은 API의 성공, 실패 여부, 반환값을 포함한 객체

#### useMutation

data fetching을 위한 기능이며, 주로 post, update 요청을 할 때 사용합니다.
useMutation의 첫 번째 파라미터에 비동기 함수가 들어가고, 두 번째 인자로 상황 별 분기 설정이 들어간다

### SWR

SWR 먼저 캐시로부터 데이터를 반환한 후, 서버에 데이터를 가져오는 fetch 요청을 보내고, 최종적으로 최신화된 데이터를 가져옵니다.
SWR을 사용하면 컴포넌트는 지속적 그리고 자동적으로 데이터 업데이트를 합니다.

```javascript
import useSWR from "swr"

function Profile() {
    const { data, error, isLoading } = useSWR("/api/user", fetcher) // key 문자열과 fetcher 함수

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return <div>hello {data.name}!</div>
}
```
