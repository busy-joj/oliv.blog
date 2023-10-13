---
slug: "/intersection-observer"
title: "스크롤 애니메이션 new IntersectionObserver()"
date: "2023-09-28"
category: "Javascript"
tags: ["Javascript", "scroll", "animation"]
---

웹페이지에 스크롤시 동작하는 애니메이션을 scroll event를 사용하지 않고 구현해자!!  
오늘의 주인공 new IntersectionObserver()

### new IntersectionObserver()

Intersection observer는 요소가 뷰포트에 보이는지 구별하는 기능한다.  
이를 이용하여 스크롤시 요소가 뷰포트에 보이게 되었을 때 애니메이션이 실행되게 하면 된다!

Intersection observer 비동기적으로 실행되기 때문에,
렌더링 성능이나 이벤트 연속 호출 같은 문제 없이 사용할 수 있고,
또한 브라우저별 오차를 걱정하지 않아도 되기 때문에 아주 유용하다.

예시를 보자!!

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZEjmzwN" data-user="jojv" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/jojv/pen/ZEjmzwN">
  Untitled</a> by Younjung Jeong (<a href="https://codepen.io/jojv">@jojv</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### new IntersectionObserver() 의 4가지 메소드

-   observe() : 요소를 관찰한다.
-   unobserve() : 요소의 관찰을 중지한다. 단, IntersectionObserver가 관찰하고 있는 대상 요소를 인수로 지정해야 한다.
-   disconnect() : IntersectionObserver가 관찰하고 있는 모든 요소의 관찰을 중지한다.
-   takeRecords() : IntersectionObserverEntry 객체의 배열을 반환한다.(일반적인 상황에서 잘 사용하지 않는다^^;;)

scroll event를 사용하기 힘든 상황에서 좋은 대안책이 될 IntersectionObserver!

다양하게 활용 가능 하겠다.

### 마치며🎉

이번에 명확하게 이해한 IntersectionObserver()를 이용해서  
무한 스크롤 기능 구현해보아야겠다!!
