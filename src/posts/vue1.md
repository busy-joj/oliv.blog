---
slug: "/vue-is"
title: "component와 is를 이용해 만드는 tab contents"
date: "2022-08-24"
category: "Vue"
tags: ["Vue", ":is"]
---

### component

component 태그는 Build-in Component로 동적 컴포넌트를 렌더링하기 위한 ‘메타 컴포넌트’이다.  
is prop의 값으로 렌더링할 실제 컴포넌트가 결정된다.

### :is

is는 Build-in 특수속성으로 동적 컴포넌트 바인딩으로 사용한다.

is의 값은 string 혹은 Component 이름이어야 하며,

-   문자열(string)인 경우 HTML 태그 이름 또는 컴포넌트로 등록된 이름일 수 있다.
-   컴포넌트의 정의에 직접 바인딩될 수도 있다.

### 예시코드

1. 등록된 이름으로 렌더링

```javascript
    <script>
        import Foo from './Foo.vue'
        import Bar from './Bar.vue'

        export default {
            components: { Foo, Bar },
            data() {
                return {
                view: 'Foo'
                }
            }
        }
    </script>

    <template>
        <component :is="view" />
    </template>
```

2. 정의에 따른 렌더링

```javascript
    <script setup>
        import Foo from './Foo.vue'
        import Bar from './Bar.vue'
    </script>

    <template>
        <component :is="Math.random() > 0.5 ? Foo : Bar" />
    </template>
```

3. HTML 엘리먼트 렌더링

```javascript
    <component :is="href ? 'a' : 'span'"></component>
```

### Tab content를 만들어보자!

```javascript
    <template>
        <BasicTab
          v-for="(tab, i) in tabs"
          :key="i"
          :tab="tab"
          @click="activeTab(tab,i)"
          :class="{active : tab.isActive}"
        >

        </BasicTab>
    </template>

    <template>
      <component :is="currentView"></component>
    </template>

    <script>
    import Foo from './Foo.vue'
    import Bar from './Bar.vue'

    export default {
        components: { Foo, Bar },
        data() {
            return {
            currentView: 'Foo'
            }
        },
        methods:{
            activeTab(tab, i){
                const seleted = i
                this.tabs.forEach((tab, i)=>{
                    if(i === seleted){
                        tab.isActive = true
                    }else{
                        tab.isActive = false
                    }
                })
                this.currentView = tab.content
            }
        }
    }
    </script>
```

### 마치며🎉

javascript로 틈만 나면 만들던 tab contents가 vue에서는 어찌나 어렵게 느껴지던지…
근데 component와 is를 익히고 나니 세~~~상 편하게 만들 수 있게 되었다…
역시 아는 것이 힘!!ㅎㅎ

### 출처

-   https://v3-docs.vuejs-korea.org/api/built-in-special-elements.html#component
