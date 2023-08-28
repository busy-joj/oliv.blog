---
slug: "/css-in-js"
title: "CSS Preprocessors 및 CSS-in-JS (Emotion) 사용 이유 및 CSS Framework (Tailwind CSS)"
date: "2023-08-18"
category: "css"
tags: ["css", "css-in-JS", "css Framework", "Tailwind"]
---

<img scr="https://file.okky.kr/images/1686652707201.gif" alt="">
CSS는 규모가 커질수록 코드가 복잡해지고 양이 한도 끝도 없이 많아지며 그로인해 구조를 파악하기 어려워지고,

선택자도 중복해서 사용하게 되는 등의 불편함이 유지보수를 불편하게 합니다.

어떤 기술의 발전은 이전 기술의 불편함을 해결하기 위해 생겨나는 것 처럼
css 전처리기도 위와 같은 css의 불편함을 해결하고 효율을 올리기 위해 탄생되었습니다.

## CSS 전처리기(Preprocessor)

CSS 전처리기는 css 문법과 굉장히 유사하지만 mixin, 중첩, 상속, 조건문 등의 문법을 가지고
CSS보다 많은 기능을 사용하여 편리하게 css를 생성하도록 하는 프로그램입니다.  
CSS 전처리기 문법으로 작성된 파일을 컴파일러를 사용하여 CSS로 컴파일한 후 웹에서 사용하게 됩니다.
<img scr="https://kdydesign.github.io/2019/05/12/css-preprocessor/css-preprocessor-cover.png" alt="">

### CSS 전처리기 종류

CSS 전처리기의 종류는 다양하지만 약간의 문법만 다를뿐 개념 자체는 같습니다.

-   Sass/Scss
-   Less
-   stylus
-   PostCSS

### CSS 전처리기 장점

1. 재사용성

-   공통 요소 또는 반복적인 항목을 변수로 대체할 수 있습니다.

```css
/** 변수 선언 **/
$color-black: #000000;
$color-white: #ffffff;
h1 {
    /** 변수 호출 **/
    color: $color-black;
    background-color: #color-white;
}
```

-   @mixin은 반복적으로 재사용할 CSS 스타일 그룹 선언을 정의하는 함수와 비슷한 동작을 하는 문법입니다.

```css
/** minxin 정의**/
@mixin border-line($width, $style) {
    border: $width $style #000;
}

/** minxin 호출**/
.border-box1 {
    @include border-line(2px, solid);
}
```

2. 유지관리

-   중첩, 상속은 상위 선택자의 반복 사용을 피할 수 있고, 상위 선택자와 하위 선택자의 소속 여부를 한눈에 볼 수 있습니다.

```css
/** css **/
.main {
    width: 100%;
}
.main .btn {
    background-color: #000;
}
.main .btn:hover {
    background-color: #fff;
}

/** scss **/
.main {
    width: 100%;
    .btn {
        background-color: #000;
        &:hover {
            background-color: #fff;
        }
    }
}
```

3. 동적관리 가능

-   조건문, 반복문 등을 통해서 동적으로 CSS관리가 가능해집니다.

```css
/** if문 **/
$width: 500px;
div {
    width: if($width > 300px, $width, null); /** compile결과 width: 555px; **/
}

/* for문 1부터 3번 반복 */
@for $i from 1 through 3 {
    .through:nth-child(#{$i}) {
        width: 20px * $i;
    }
}
.main {
    width: 100%;
}
.main .btn {
    background-color: #000;
}
.main .btn:hover {
    background-color: #fff;
}

/** scss **/
.main {
    width: 100%;
    .btn {
        background-color: #000;
        &:hover {
            background-color: #fff;
        }
    }
}
```

### CSS 전처리기 단점

컴파일 시간 소요된다는 점이 가장 큰 단점인 듯 합니다.

## CSS-in-JS

<img scr="https://so-so.dev/static/989e1455f1294d821c2ca97575c82859/00d43/what-is-css-in-js.png" alt="">
CSS-in-JS는 JavaScript코드에서 CSS를 작성하는 방식을 말합니다.

최근에는 웹 어플리케이션을 재활용이 가능하도록 여러개의 컴포넌트로 분리하고,  
각 컴포넌트에 HTML, CSS, javascript를 작성하는 형태로 개발하고 있고,  
이 때 CSS-in-JS 방식을 사용하여, CSS를 손쉽게 javascript에 삽입할수 있습니다.

### CSS-in-JS 라이브러리 종류

1. Styled Components

```javascript
    import styled from 'styled-components';

    const Text = styled.div`
    color: white,
    background: black
    `

    <Text>Hello CSS-in-JS</Text>
```

2. Emotion

```javascript
import { css } from "@emotion/react"

function MyComponent() {
    return (
        <div
            css={css({
                backgroundColor: "yellow",
            })}
            css={css`
                backgroundcolor: "yellow";
            `}></div>
    )
}
```

### CSS-in-JS 장점

1. CSS 모델을 문서 레벨이 아니라 컴포넌트 레벨로 추상화합니다.
2. JavaScript 환경을 최대한 활용하여 CSS를 향상시킵니다.
3. 생성된 CSS 규칙은 자동적으로 벤더 프리픽스가 붙어있으므로 생각할 필요가 없습니다.
    - 구형 브라우저를 지원하기 위한 벤더 프리픽스 : 코드의 양을 늘게 하고, 업데이트에 의해 불필요한 사용의 가능성이 있다.
4. 지역 스코프 스타일 - 각 파일마다 고유한 CSS 네임 스페이스를 부여해주기 때문에, 각 컴포넌트에 완전히 격리된 스타일을 적용할 수 있게 됩니다.

### CSS-in-JS 단점

1. 번들 크기가 커집니다.
    - 사이트를 방문하는 각 사용자는 CSS-in-JS 라이브러리용 자바스크립트를 다운로드해야 하고, 이로 인해 번들의 크기가 커질 수 밖에 없다고 합니다.
2. 런타임 오버헤드 가능성?

https://junghan92.medium.com/%EB%B2%88%EC%97%AD-%EC%9A%B0%EB%A6%AC%EA%B0%80-css-in-js%EC%99%80-%ED%97%A4%EC%96%B4%EC%A7%80%EB%8A%94-%EC%9D%B4%EC%9C%A0-a2e726d6ace6

## CSS 프레임워크

웹 UI를 빠르고 쉽게 만들 수 있고, 일관된 스타일을 유지할 수 있게 해주기 위해  
 미리 만들어진 컴포넌트와 스타일, 규칙 등을 제공해줍니다.

### CSS 프레임워크 라이브러리 종류

프레임워크 종류는 매우 많습니다. 대표적으로 BootStrap, Foundation, Tailwind CSS이 있습니다.

### Tailwind CSS!?

Tailwind는 최근 상당히 인기를 끌고 있는 CSS 프레임워크 입니다.  
Tailwind는 유틸리티 클래스로 이루어져있습니다.

-   유틸리티 클래스란?? - 단 한 가지 일만 하는 매우 적은 양의 CSS 코드를 담고 있는 클래스
    ```css
    .rounded {border-radius: 0.25rem;}

            .py-2 {padding-top: 0.5rem;padding-bottom: 0.5rem;}

            .font-bold {font-weight: 700;}
         ```
         ```html
            <button class="rounded py-2 font-bold">
                Primary
            </button>
         ```

    위 코드와 같이 유틸리티 클래스를 다양하게 조합하여 추가적인 CSS 코드 작성없이 스타일링이 가능합니다.

### Tailwind 장점

1. 유틸리티 클래스를 자유롭게 조합 빠르고 쉽게 스타일링
    - CSS 스타일링에 소비하는 시간과 노력 절약
    - 개발자들을 클래스 작명에 대한 스트레스로 부터 해방
2. 다른 CSS 프레임워크보다 향상된 유연성과 확장성을 제공

-   개성있는 웹사이트 만들기에 유리

### Tailwind 단점

1. 유틸리티 클래스를 과도하게 사용하는 것이 코드의 가독성 저하
2. 대규모 프로젝트에서는 오히려 유지 보수성을 저하

### 각 프로젝트 마다 적합한 도구인지 고려한 후 선정하여 사용하는 것이 중요하겠습니다!

## 출처

-   https://inpa.tistory.com/entry/SCSS-%F0%9F%92%8E-SassSCSS-%EB%9E%80-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%BB%B4%ED%8C%8C%EC%9D%BC
-   https://junghan92.medium.com/%EB%B2%88%EC%97%AD-%EC%9A%B0%EB%A6%AC%EA%B0%80-css-in-js%EC%99%80-%ED%97%A4%EC%96%B4%EC%A7%80%EB%8A%94-%EC%9D%B4%EC%9C%A0-a2e726d6ace6
-   https://www.daleseo.com/tailwind/
-   https://www.samsungsds.com/kr/insights/web_component.html
-   https://junghan92.medium.com/%EB%B2%88%EC%97%AD-%EC%9A%B0%EB%A6%AC%EA%B0%80-css-in-js%EC%99%80-%ED%97%A4%EC%96%B4%EC%A7%80%EB%8A%94-%EC%9D%B4%EC%9C%A0-a2e726d6ace6
