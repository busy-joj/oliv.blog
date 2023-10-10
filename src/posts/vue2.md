---
slug: "/vue-provider"
title: "prop drilling을 예방하는 Provider Pattern"
date: "2022-06-29"
category: "Vue"
tags: ["Vue", "provide", "inject"]
---

### Provider Pattern

<img src="https://busy-joj.github.io/public/img/props.png" alt="">

위 그림과 같이 부모 컴포넌트에서 자식 컴포넌트로 정보를 전달해 줄 때 props를 사용한다.  
그러나 props는 직계 자식에게로만 전달가능하기 때문에,  
자식의 자식의 자식의 자식의 자식…………에게 정보를 전달하기 위해서는 중간 매개체가 수없이 많이 생겨나고 이는 효율적이지 못하다.  
이럴 때 사용할 수 있는 것이 provide와 inject이다.

<img src="https://busy-joj.github.io/public/img/provide.png" alt="">

provide를 작성하고 자식의 자식의 자식의 자식의 자식,  
몇 번째 자식이든 원하는 자식 컴포넌트에 inject를 작성하여 정보를 바로 전달하여 준다.

```javascript
    // 최상위 컴포넌트 = App.vue
    <template>
        <Parent :msg="message" />
    </template>

    <script>
        import Parent from '~/components/Parent'
        export default {
        components: {
            Parent
        },
        data (){
            return {
            message : 'Hello world!'
            }
        }
        }
    </script>
```

```javascript
    // 부모 컴포넌트 = Parent.vue
    <template>
        <Child :msg="msg" />
    </template>

    <script>
        import Child from '~/components/Child'
        export default {
        components: {
            Child
        },
        props:{
            msg : {
            type: String,
            default : ''
            }
        }
        }
    </script>
```

```javascript
    // 자식 컴포넌트 = Child.vue
    <template>
        <div>

        </div>
    </template>

    <script>
        export default {
        props:{
            msg : {
            type: String,
            default : ''
            }
        }
        }
    </script>
```

위의 예제는 App.vue라는 최상위 컴포넌트에 있는 message라는 정보를 Child.vue에 전달하는 것이 목표이지만,  
props만을 이용했기 때문에, 중간 매개체로 Prarent.vue 파일을 사용하였다.  
이는 사실상 Prarent.vue파일은 단지 props를 전달하기 위해 존재하는 파일이라는 의미로 매우 비효율적이다.  
개선을 위해 provide와 inject를 써보자!

### provide와 inject, 사용해보자!

```javascript
    // 최상위 컴포넌트 = App.vue
    <template>
        <!-- Parent에 제공하는 props가 필요없으니 삭제 -->
        <Parent />
    </template>

    <script>
        import Parent from '~/components/Parent'
        export default {
        components: {
            Parent
        },
        data (){
            return {
            message : 'Hello world!'
            }
        },
        //provide!!!!!!!!!
        provide(){
            return {
            msg : this.message
            }
        }
        }
    </script>
```

```javascript
    // 부모 컴포넌트 = Parent.vue
    <template>
        <!-- Child 제공하는 props가 필요없으니 삭제 -->
        <Child />
    </template>

    <script>
    import Child from '~/components/Child'
    export default {
        components: {
            Child
        }
    //props 제공이 필요없으니 삭제
    }
    </script>
```

```javascript
    // 자식  컴포넌트 = Child.vue
    <template>
        <div>

        </div>
    </template>

    <script>
    export default {
    //props 제공이 필요없으니 삭제
        //inject!!!
        inject : ['msg']
    }
    </script>
```

### 주의사항 (feat.반응성)

provide, inject는 반응성을 제공하지 않는다. 반응성을 유지하려면 추가 작업이 필요하다. 확인해보자!

```javascript
    // 최상위 컴포넌트 = App.vue
    <template>
        <button @click="message = 'Good!!'"> Click!! <button>
        <h1></h1>
        <Parent />
    </template>

    <script>
    import Parent from '~/components/Parent'
    // 객체분해구조로 vue 패키지에서 computed 가져오기
    import { computed } from 'vue'
    export default {
        components: {
            Parent
        },
        data (){
            return {
            message : 'Hello world!'
            }
        },
        provide(){
            return {
            // msg : this.message
            //computed 함수 실행
            msg : computed(() => this.message)
            }
        }
    }
    </script>
```

```javascript
    // 자식 컴포넌트 = Child.vue
    <template>
        <div>

        </div>
    </template>

    <script>
        export default {
        // msg는 계산된 객체 데이터이기 때문에, 얻고자하는 속성을 명시해줘야함
        inject : ['msg']
        }
    </script>
```

### 마치며🎉

오늘 잘 배워뒀으니 까먹지 말고, 꼭 반응성에 유의하며 사용하자!
