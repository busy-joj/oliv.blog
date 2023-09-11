---
slug: "/react-huge-bundles"
title: "Dynamic import for Code Splitting"
date: "2023-09-11"
category: "React"
tags: ["Javascript", "React", "Dynamic import"]
---

React는 브라우저가 자바스크립트 번들을 다운로드하는데  
오랜 시간이 걸리기 때문에 초기 페이지 로딩 속도가 느려진다.

그래서 Code splitiing이 필요하다!  
즉, 번들 파일의 코드를 분할하여, 모든 코드를 한 번에 불러오지 않고 사용자가 필요로 할 때  
필요한 코드만 불러오자!

### 💊 Dynamic import

기존에 파일 최상단에 import 구문을 사용해서 불러오는 것은 Static import! 정적 import이다.  
 코드 구조를 분석해 모듈을 한곳에 모아 번들링하고, 사용하지 않는 모듈은 제거(가지치기)해주는 장점이 있지만,  
 번들 크기가 너무 크다는 단점이 있다.

그래서 Dynamic import가 때에 따라 필요하다.

-   자바스크립트 방식  
    프로미스 객체를 반환하는 import() 구문을 사용하자!  
    함수를 호출하는 문법을 취하고 있으나 함수는 아니다.

```javascript
    // promise 형식으로 사용할 수 있고,
    import('./sum').then(sum => {
        console.log(sum(1 + 2));
    });

    // async & await를 사용하여 비동기로 필요할 때 호출한다!
    const hello = async () => {
	const { hiMom } = await import(’./helpers’)
	return hiMom
}
```

-   React 방식  
    React에서 컴포넌트 파일을 정의하고 동적 불러오기를 사용하면 에러가 발생한다.  
    따라서 React에서는 React.lazy를 사용해야 한다.  
    React.lazy는 import() 구문을 반환하는 콜백 함수를 인자로 받는다.  
    단, React.lazy는 반드시 지켜야 하는 규칙이 있다.  
     1. React 컴포넌트를 포함해야 한다. 2. export default를 가진 모듈이어야 한다. 3. React.lazy로 불러온 컴포넌트는 단독으로 쓰일 수 없고,  
     React.Suspense 컴포넌트로 하위에서 렌더링 되어야 한다.

         ```jsx
            import { Suspense } from 'react';

            const SomeComponent = React.lazy(() => import('./SomeComponent'));

            const MyComponent = () => {
                return (
                    <Suspense fallback={<div>로딩 중. . .</div>}>
                    <SomeComponent />
                    </Suspense>
                );
            }
        ```

### 마치며🎉

성능을 위하여 import 마저 비동기로 import 하는 React...  
잊지 말고 기억 했다가 적재적소에 사용해야겠다.
