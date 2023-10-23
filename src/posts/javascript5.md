---
slug: "/js-reduce"
title: "reduce 메소드 사용법(feat. reduceRight)"
date: "2023-10-23"
category: "Javascript"
tags: ["Javascript", "reduce", "reduceRight"]
---

<img src="../images/assets/js.png" alt=""/>

생각보다 매우 유용한 reduce  
사용법을 정리해보자!!

### reduce

```javascript
reduce(callbackFn)
reduce(callbackFn, initialValue)

// callbackFn = 배열의 각 요소에 대해 실행할 함수
// initialValue = 초기값
```

기본 문법은 위와 같고, 구체적인 사용 방법은 다음과 같다.

```javascript
reduce((누적값, 현잿값, 인덱스, 요소) => {
    return 결과
}, 초깃값)
```

reduce은 이전값이 아닌 누진값을 사용한다. 그렇기 때문에 다양하게 활용될 수 있나보다!ㅎㅎ

#### 덧셈 with reduce

우선 덧셈에서 reduce를 사용하는지 예시를 보자.

```javascript
const arr = [1, 2, 3, 4];

const initialValue = 0;
const sumWithInitial = arr.reduce(
  (accumulator, currentValue) => {accumulator + currentValue}, // callbackFn
  initialValue //초기값 );

console.log(sumWithInitial);
// 10 출력
```

변수로 지정해둔 초기값(initialValue)인 0부터 시작하고, 누적되며 계산된다.
만약 초기값이 지정되지 않은 경우엔 arr[0]가 초기값이 된다.
초기값 지정 여부를 꼭 염두하고 사용하시면 더욱 활용하기 좋을 듯 하다!

#### 배열 with reduce

reduce의 가장 흔한 사용법이 덧셈과 곱셈이지만,
map이나 filter를 대신해서 reduce로 구현할 수 있다.

```javascript
let user = [
    { name: "가", age: 50 },
    { name: "나", age: 32 },
    { name: "다", age: 15 },
    { name: "라", age: 11 },
    { name: "마", age: 27 },
]

let result = user.reduce((prev, cur) => {
    if (cur.age > 19) {
        prev.push(cur.name)
    }
    return prev
}, [])

// ['가', '나', '마'] 출력
```

초기값을 빈 배열로 만들고, 배열 값을 push하면서 누진값을 만들어나간다.
다양하게 사용할 수 있으니, 여러가지로 응용해보면 되겠다😊

### reduceRight

reduceRight는 reduce와 동작은 같지만 오른쪽에서 왼쪽으로 순회한다.
빠르게 예시로 보자면!

```javascript
result = [1, 2, 3].reduceRight((acc, cur, i) => {
    console.log(acc, cur, i)
    //  0, 3, 2
    //  3, 2, 1
    //  5, 1, 0
    return acc + cur
}, 0)

result // 6
```

누진값, 현재값, 초기값 등 모든 사용이 동일하지만
진행반향이 다르다는 것을 알 수 있다!!

이렇게 알아두면 유용한 reduce 정리완료!
