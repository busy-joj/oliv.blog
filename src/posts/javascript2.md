---
slug: "/test2"
title: "js파일의 사이즈가 어마어마하게 크다면?"
date: "2023-08-18"
category: "Javascript"
---
스크립트 태그(CSS, JS) 내 속성 Async, Defer 의 정의 및 동작 원리의 차이
async와 defer는 script의 <span style="font-weight:600;">실행 시점을 조절하는 속성</span>입니다.

```html
    <script src="main.js" async></script>
    <script src="main.js" defer></script>
```

실행 시점을 왜 조절해야하느냐?!?!?

### ✏️웹 브라우저의 동작
먼저 웹 브라우저가 어떻게 동작하는지 알아야합니다!
<img scr="https://velog.velcdn.com/images/3436rngus/post/53d67c7d-8b68-4160-8cbd-4f7182764c6e/image.png" alt="">

브라우저는 서버로 부터 HTML, CSS, Javascript를 응답받고 해석합니다.  
 - HTML과 CSS파일은 렌더링 엔진에서 파싱 -> DOM 트리 + CSSOM 트리 = 렌더 트리
 - Javascript는 자바스크립트 엔진에서 처리   


 이 과정에서 브라우저는 HTML 파일을 위에서부터 아래로 한 줄씩 해석하면서 DOM 트리를 만들어나갑니다. 그러던 중 script태그를 만나면 자바스크립트 코드를 실행하기 위해 DOM 생성 프로세스를 중지하고 자바스크립트 파일을 로드하고 파싱하여 실행합니다. Javascript의 실행이 완료되면 그제서야 다시 DOM 생성을 재개합니다.  
 <img src="https://wormwlrm.github.io/static/98fa3272b42769edf1bb9e3fc70407e8/da893/3.png" alt="">

 이로 인해 문제가 발생하게 되는데요,

 만약 js파일의 사이즈가 어마어마하게 크다면?
 만약 인터넷도 무지무지 느리다면?

사용자가 콘텐츠를 보는데까지 시간이 오래 걸릴 뿐만 아니라  javascript를 로드하고 실행할 때까지 DOM 생성이 중지되기 때문에 DOM의 엘리먼트에 접근하지 못하게 되는 등 로직에 문제가 생길 수 있습니다.  

위와 같은 문제를 피하고자 이렇게 생각합니다!
"그럼 DOM을 모두 읽은 후에 script태그를 만나게 하면 되지 않나?!?!?!?"    

```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div>안녕하세요</div>
            <div>어쩌고 저쩌고</div>
            <script src="main.js"></script>
        </body>
    </html>
```
그래서 <body> 태그가 끝나기 직전에 script 태그를 작성하기도 합니다.  
하.지.만. 완벽한 해결책이 아닙니다. 
사용자가 콘텐츠를 빨리 볼 수는 있지만, js를 이용해 데이터를 받아오거나 인터렉션을 구현해놓았다면 당연히 제대로 동작하지 못하겠지요...😥  

### 해결책 async와 defer

해결책은?!    
바로 async와 defer 속성입니다.
DOM 생성 과정을 막지 않도록 브라우저가 script 파일을 병렬로 로드 합니다. 

#### async
```html
    <script async src="main.js"></script>
```
 <img src="https://wormwlrm.github.io/static/4b70dc585a1eae2aff8d56e4bfa44ef0/2b984/5.png" alt="">  
 defer 속성도 script를 병렬로 로드합니다. async와는 다르게 로드가 완료된 후 즉시 실행하는 것이 아닌 모든 DOM이 생성된 후에 실행됩니다.
 👍 병렬 로드로 script를 로드하는 시간 절약됨
 👎 실행을 위해 DOM 생성을 멈춤

 #### defer
```html
    <script defer src="main.js"></script>
```
 <img src="https://wormwlrm.github.io/static/cb15314ad68cf7b5d34cd2f3386fabab/5e1f2/4.png" alt="">  
 async 속성은 script를 로드하는 것만 병렬로 실행하고,  
 로딩을 마치면 그 때 DOM 생성을 멈추고 실행하게 됩니다. 
 👍 시간 절약은 물론이고, DOM 생성을 방해하지 않아 오류 최소화

 #### 실행순서의 차이  
 script의 로드와 실행에 차이가 있는 async와 defer!  
 또 다른 차이는 실행순서입니다.  

 ```html
    <script async src="main1.js"></script><!-- 로드 5초 -->
    <script async src="main2.js"></script><!-- 로드 2초 -->
    <script async src="main3.js"></script><!-- 로드 1초 -->
```  
async는 먼저 로드된 script가 먼저 실행됩니다. script의 실행 순서를 조정할 수 없기 때문에, 만약 script끼리 서로 의존성이 있다면 제대로(의도대로) 동작하지 않을 수 있습니다.  


 ```html
    <script defer src="main1.js"></script><!-- 로드 5초 -->
    <script defer src="main2.js"></script><!-- 로드 2초 -->
    <script defer src="main3.js"></script><!-- 로드 3초 -->
```  
반면, defer는 로드가 빨리 되는 script라도, 실행은 항상 선언한 순서대로 되기 때문에 script끼리 의존성이 있는 경우도 문제 없이 동작하게 됩니다.  


따라서 async 속성은 DOM에 직접 접근하지 않거나, 의존성 없는 script들을 독립적으로 실행해야 할 때 효과적이며,  
defer 속성은 DOM의 모든 엘리먼트에 접근할 수 있고, 실행 순서도 보장되기 때문에 가장 유용하고 안전하게 사용할 수 있습니다.