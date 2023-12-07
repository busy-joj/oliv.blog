---
slug: "/js-Runtime"
title: "js 런타임 환경을 알아보자!"
date: "2023-11-21"
category: "Javascript"
tags: ["Javascript", "Runtime"]
---

<img src="../images/assets/js.png" alt=""/>
  
<br/>
Javascript 런타임 환경에 대해 명확히 정리해보자!
<br>

### 런타임 환경?

Runtime Environments!!  
정말 많이 들어봤지만 들을 때마다 왠지 모르게 거리감이 느껴지는...  
간단한 단어임에도 뭔가 스스로를 주늑들게 만드는 힘이 있는 단어랄까...ㅎㅎ  
암튼 런타임 환경이란 무엇일까?  
<br/>
<span class="point">런타임 환경은 프로그램이 실행되는 곳이다.<span> 이 환경은 프로그램이 접근할 수 있는 전역 객체를 결정하고, 실행 방법에도 영향을 준다.  
대표적인 javascript 런타임 환경으로는 크롬과 같은 브라우저 런타임 환경, 노드 런타임 환경이 있다.  
<br/>

### 브라우저의 런타임 환경

우리에게 매우 친근한 브라우저는 javascript 코드가 실행되는 가장 일반적인 환경이다.

```html
<html>
    <body>
        <h1>웹 사이트</h1>
        <script>
            window.alert("Hello")
        </script>
    </body>
</html>
```

위와 같이 작성한 HTML을 브라우저에서 로드시 <span class="tag-block">script</span>가 실행되어 <span class="tag-block">window.alert()</span>메소드가 동작하고, 브라우저에 팝업 상자가 나타난다. 브라우저 런타임 환경이기 때문이다.

브라우저에서 window객체가 전역객체이고, 수많은 웹 API와 document객체를 가지고 있다. 그렇기에 브라우저에서 실행되는 프로그램은 브라우저가 제공하는 데이터 및 기능에 대해서 접근할 수 있다.

전역공간에서 window가 아닌 this를 호출해도 this는 윈도우 객체를 가르키기 때문에 window 객체가 호출됨을 기억해두자!

### Node의 런타임 환경

Node.js는 브라우저없이 javascript 코드를 실행할 수 있다. Node의 런타임환경은 브라우저 런타임 환경이 아니기 때문에 <span class="tag-block">window.alert()</span>같은 메소드를 사용할 수 없다.  
대신 Node.js의 런타임 환경은 서버의 파일 시스템, 데이터베이스 및 네트워크에 대한 엑세스와 같은 것을 제공하고, 이는 window 객체가 아닌 global 객체이다.

<br/>
global 객체를 확인해보면, 아래와 같이 나온다.

```javascript
console.log(global)

// 출력결과
/* <ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 31.01824999973178,
      nodeStart: 1.1722079999744892,
      v8Start: 1.708416999783367,
      bootstrapComplete: 24.04904199996963,
      environment: 14.396042000036687,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1641960743299.417
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
} */
```

### 요약

런타임 환경은 프로그램이 실행되는 곳이고, Javascript 코드는 두가지의 런타임 환경 중 하나에서 실행된다.

    1. 브라우저 런타임 환경
        - window 객체를 제공한다.
        - 웹 API, document객체에 엑세스
    2. 노드 런타임 환경
        - global 객체를 제공한다.
        - 서버에 연결된 파일시스템, 데이터베이스 및 네트워크에 엑세스
