---
slug: "/js-loop"
title: "반복문(for, while)과 배열 메소드(forEach,map) 전격비교!"
date: "2023-06-12"
category: "Javascript"
tags: ["Javascript", "반복문"]
---

<img src="../images/assets/js.png" alt=""/>
  
<br/>
배열에 적용하여 사용할 수 있는 반복문 for, while

배열 메소드인 forEach, map

정리를 해보자!
<br>

### 반복문

정말 많이 사용하게 되는 반복문!

-   while 반복문

    ```javascript
    while (condition) {
        // 코드
        // '반복문 본문(body)'이라 불림
    }
    ```

    조건이 들어가는 부분인 condition이 true이면 반복문 본문의 코드가 실행된다.

    ```javascript
    let i = 0
    while (i < 5) {
        console.log(i) // 0, 1, 2, 3, 4 출력
        i++
    }

    let i = 5
    while (i) {
        // i가 0이 되면 조건이 false가 되면서 실행 중지
        console.log(i) // 1, 2, 3, 4, 5 출력
        i--
    }
    ```

    위와 같이 while을 사용할 수 있고, 조건과 i++; i--;를 이용해서 반복문의 방법을 정할 수 있다.

-   for 반복문

    ```javascript
    for (begin; condition; step) {
        // ... 반복문 본문 ...
    }
    ```

    for문은 다음과 같이 실행된다.

    begin 실행  
    -> (condition = true → body 실행한 후, step 실행)  
    -> (condition = true → body 실행한 후, step 실행)  
    -> (condition = true → body 실행한 후, step 실행)  
    -> (condition = true → body 실행한 후, step 실행)  
    <br>
    begin이 한 번 실행한 후, condition 확인 후 body, step을 반복 실행한다.

    ```javascript
    for (let i = 0; i < 5; i++) {
        console.log(i) // 0, 1, 2, 3, 4가 출력됩니다.
    }
    ```

반복문은 조건이 false가 되면 종료된다.  
그런데 break를 사용해서 언제든 원하는 때에 반복문을 빠져나올 수 있다.

### 배열 메소드

배열 메소드 중에서도 forEach와 map을 정리해보자.

for, while문과 다르게 배열 메소드인 forEach와 map은 break를 사용할 수 없다. 즉, 배열의 모든 요소를 순환하게 된다.

-   forEach()

    ```javascript
    array.forEach(callbackFn)
    array.forEach(callbackFn, thisArg)

    // callbackFn = 배열의 각 요소에 대해 실행할 함수
    // thisArg = this를 실행할 때 사용할 값
    ```

    ```javascript
    const numArr = [1, 2, 3, 4, 5]
    numArr.forEach(num => num ** 2)
    ```

    위와 같이 각각 요소를 순환하며 실행된다.

-   map()

    ```javascript
    map(callbackFn)
    map(callbackFn, thisArg)

    // callbackFn = 배열의 각 요소에 대해 실행할 함수
    // thisArg = this를 실행할 때 사용할 값
    ```

    ```javascript
    const numArr = [1, 2, 3, 4, 5]
    numArr.map(num => num ** 2)
    ```

    forEach와 마찬가지로 각 요소를 순환하며 실행한다.

    정리해보니 생김새와 사용법이 같아보이지만 forEach 와 map의 차이점이 있다.

    ```javascript
    const numArr = [1, 2, 3, 4, 5]

    // forEach
    numArr.forEach(num => num ** 2) // undefined

    //map
    numArr.map(num => num ** 2) // [1, 4, 9, 16, 25]
    ```

    forEach를 사용한 경우 원본 배열을 변경하지 않아 forEach의 반환값은 언제나 undefined가 되지만, map은 콜백 함수의 반환값으로 구성된 새로운 배열을 반환한다!!!!

따라서 forEach를 사용할 때는

```javascript
const numArr = [1, 2, 3, 4, 5]
const newNumArr = []

// forEach
numArr.forEach(num => newNumArr.push(num ** 2))
console.log(newNumArr) // [1, 4, 9, 16, 25]
```

위와 같이 새로운 배열을 선언하고, 그 배열 안에 결과를 넣어주는 작업이 필요하다다.

map보다 forEach가 복잡한 것 같지만, 기존 배열을 건드리면 안될 때 유용할 듯하다.

정리 끝!!
