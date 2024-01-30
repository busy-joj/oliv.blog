---
slug: "/react-vite-path"
title: "Vite 환경에서 path 경로 alias 설정하기"
date: "2024-01-09"
series: "Project. 코테PT💪"
category: "React"
tags: ["project", "vite", "Javascript", "React"]
---

프로젝트를 시작하고 작업을 하다보니,  
import시 경로가 점점 지저분해지고 있었다.

```javascript
import { DEFAULT_MONTH_LABELS } from "../assets/constants"
import { getAllActivities } from "../../utils/contribution"
```

아차!! 잊고 있었다. 빨리 MVP라도 만들고 싶은 마음에 경로 설정을 빼먹은 듯 하다!  
프로젝트가 더 커지고 복잡해지기 전에 발견해서 다행이니 후딱 수정해보자!💥

### 🛠️ vite.config.js 수정

```javascript
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path" //추가

export default defineConfig({
    plugins: [react()],
    // resolve 부분 추가
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "src") },
            {
                find: "@components",
                replacement: path.resolve(__dirname, "src/components"),
            },
        ],
    },
})
```

<span class="point">resolve.alias</span>에 객체나 { find, replacement, customResolver } 페어 배열이 전달된다.  
find에는 별칭을, replacement에는 절대 경로를 주입한다.  
[참고 문서](https://github.com/rollup/plugins/tree/master/packages/alias#entries)에 작성법이 아주 잘 나와있어서 간단하게 해결할 수 있었다.

### 🛠️ vite-tsconfig-paths 플러그인

해결완료했지만, 찾아보니 플러그인도 있어서 같이 적어본다.  
**🚨TS를 위한 플러그인이니 개발환경을 잘 고려해서 사용하자!!🚨**

1. 설치

```javascript
npm i vite-tsconfig-paths
```

2. vite.config.js 수정

```javascript
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
})
```

3. tsconfig.json 수정

```javascript
{
  "compilerOptions": {
    "baseUrl": "./src",
  },
}
```

위와 같이 수정하여 사용하면 된다!!

### 마치며🎉

초기 설정하는 것을 습관들이자 그렇게 다짐했으면서도 하루라도 빨리 구현해서 사용 후기를 들어보고 싶어서 덜렁거렸다...  
개발자답게... 설정 하나로 효율적이고 깔끔한 코드를 짜자!! 또 다짐해본다!!
