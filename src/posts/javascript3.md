---
slug: "/react-query"
title: "useEffect 사용법과 안티패턴 그리고 React Query, SWR"
date: "2023-08-28"
category: "React"
tags: ["Javascript", "React", "query", "SWR"]
---

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

### React Query, SWR 차이

-   React Query win🏅

    1. Data Optimization
       React Query는 렌더링 퍼포먼스 측면에서도 뛰어난 라이브러리으로 쿼리가 업데이트될 때만 컴포넌트를 업데이트합니다. 또한 여러 컴포넌트가 같은 쿼리를 사용하고 있을 때는 한꺼번에 묶어 업데이트해 줍니다. 반면 SWR은 해당되지 않습니다.
    2. Selectors
       React-Query는 서버에서 가져오는 데이터를 fetching 단계에서 결과를 추출할 수 있습니다.

    ```javascript
    import { useQuery } from "react-query"

    function User() {
        const { data } = useQuery("user", fetchUser, {
            select: user => user.username,
        })
        return <div>Username: {data}</div>
    }
    ```

    3. Lagged Query Data
       React Query는 다음 데이터를 불러오기까지 현재 데이터를 표시해줍니다. 예를 들면 페이지네이션에서 다음 페이지를 불러오는 동안 보여 줄 데이터가 없을 때 현재 캐싱되어 있는 데이터를 자동으로 렌더링하는 것입니다. 이는 페이지네이션에서 꽤 유용하게 사용된다고 합니다. 반면, SWR이 기본적으로 지원하고 있는 기능은 아니지만 부가적인 코드 작성을 통해 구현 가능하다.

-   SWR win🏅

    1. Provider의 유무
       React-Query는 \_app 컴포넌트에 전용 Provider을 wrapping해줘야, 자식 컴포넌트에서 활용 가능한 반면, SWR은 그대로 fetching을 해주면 된다고 합니다.
    2. useSWR, useQuery 모두 두 번째 인자로 fetcher를 받지만, 차이점이 있다면 SWR은 fetcher의 인자로 useSWR의 첫 번째 인자를 넘겨 주고, useQuery는 fetcher에 url을 직접 전달해야 합니다. 또한 SWR은 전역 설정을 통해 fetcher를 정해 둘 수 있지만, React Query는 항상 두 번째 인자에 fetcher를 넘겨 줘야 합니다.

-   무승부?
    1. Mutation
       둘 다 변형시킨다는 의미에서는 같지만, React Query의 뮤테이션은 post/patch/put/delete를 통해 서버의 상태를 변형시키는 것이고, SWR의 뮤테이션은 useSWR()을 통해 받아온 데이터를 클라이언트 사이드에서 변형시켜 업데이트해 주는 개념이라는 차이가 있습니다.

https://mycodings.fly.dev/blog/2023-02-12-react-useeffect-hook-complete-guide
