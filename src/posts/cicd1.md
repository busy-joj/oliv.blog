---
slug: "/static-site-hosting"
title: "Vercel과 Netlify 정적 사이트 호스팅 전격 비교"
date: "2024-02-04"
series: "Project. 코테PT💪"
category: "CI/CD"
tags: ["project", "Varcel", "Netlify", "hosting"]
---

주요 기능 3가지 중 1순위였던 잔디UI가 구현되었다.  
혼자 작업하다보니 작업물을 공유하여 여러가지 피드백을 듣을 필요가 있다고 생각되었다. 공들여 작업한 내스키에게 발전이 필요할테니까!!

개인 프로젝트, 포트폴리오, 개발 블로그를 배포할 때  
AWS S3, Vercel, Netlify 다양하게 사용해서 배포했었다.  
주요 기능, 로그인, 회원가입(oauth), DB연결, 서버 배포 등...  
할 일이 태산이기에 프론트 배포는 간단하고 빠르게 배포하길 원했기에 AWS S3는 선택사항에서 제쳐두기로 했다!!

그렇다면 Vercel과 Netlify 중 무엇을 선택할까?  
둘 다 사용해본 결과 동일하게 너~~~무 쉽게 배포할 수 있어서 더 고민이 되었다(둘 중 하나가 조금이라도 사용하기 어려웠다면 이 글은... 작성하지 않았을 듯하다..ㅎㅎㅎ)  
그럼 무엇에 기준을 두고 선택해야할까...

### 👀 Jamstack?

Vercel과 Netlify은 Jamstack 호스팅 플랫폼이라고 한다.  
**Jamstack이란 무엇일까!?**  
Jamstack은 아키텍쳐 접근 방식으로 프론트엔드를 백엔드(데이터 및 비즈니스 로직) 분리하여 유연성, 확장성, 성능 및 유지 관리성을 향상시킨다.  
즉, 프론트엔드와 백엔드를 분리하여 프론트엔드는 사용자 인터페이스에 집중할 수 있도록 한다.

Jamstack에서 Jam은 각각 Javascript, API, Markup로 이 세가지 만으로 이루어진 웹 구성을 뜻한다.  
Jamstack 호스팅 플랫폼은 Jamstack 웹사이트 및 애플리케이션을 위한 PaaS(Platform-as-a-Service) 클라우드 기반 호스팅 솔루션이고, Vercel과 Netlify가 이에 해당한다!!

### 🥊Vercel vs Netlify

#### 1. Vercel

Vercel은 Next.js에서 제공하는 플랫폼이다. Vercel의 기능은 다음과 같다.

-   엣지 기능
-   웹사이트 분석
-   속도 통찰력
-   통합된 DDoS 보호
-   자동 SSL
-   이미지 최적화
-   글로벌 엣지 네트워크, 최적의 성능을 위한 빠른 엣지 서버
-   지속적인 통합 및 지속적인 배포
-   자동화된 테스트

#### 2. Netlify

Vercel과 마찬가지로 Netlify도 Jamstack 웹 사이트 구축, 배포 및 관리를 위한 강력하고 사용자 친화적인 PaaS를 제공한다. Netlify의 기능은 다음과 같다.

-   엔터프라이즈 팀 관리
-   엣지 기능
-   미리보기 배포
-   Netlify 엣지 CDN
-   Netlify Forms를 통한 양식 제출 관리
-   Netlify Identity를 통한 사용자 인증
-   적극적인 DDoS 완화
-   웹사이트 분석
-   분할 테스트
-   SSL 인증서

3. 공통점

    - CI/CD : Git 레포지토리와의 간편한 통합을 제공하고 자동적이고 지속적인 배포를 지원한다. 즉, 플랫폼이 자동으로 변경 사항을 웹 사이트에 구축하고 배포할 수 있음을 의미한다.
    - 콘텐츠 전달 네트워크 : 두 플랫폼 모두 CDN을 활용한다.

4. 차이점

    - Netlify는 인증 서비스(Netlify Identity)를 제공한다. 반면 Vercel은 인증 기능을 제공하지 않는다.
    - Netlify는 form 제출을 관리할 수 있는 간단하고 직관적인 인터페이스를 제공하며 이메일 주소로 알림을 보내거나 타사 서비스와 통합할 수 있다. 반면 Vercel에는 양식 처리 기능이 내장되어 있지 않다.
    - 그리고 가격!!!

### 선택의 시간

Vercel과 Netlify에 대해 알아보았다. 차이점이 선택에 기준이 되겠다.
나의 선택은?!?!?!? Vercel로 배포 결정!!

#### Vercel 선택 이유는?

사실 두 플랫폼이 큰 차이가 있지는 않다고 생각된다.  
Netlify가 제공하는 인증 서비스나 form 관련 서비스가 메리트있다는 생각이 들지 않았고,  
Vercel의 자동 SSL, 그리고 결정적으로 서버 구축 진행 상황에 따라 추후에 프로젝트를 Next.js로 마이그레이션 해야할 가능성이 크기 때문에 Vercel로 선택하게 되었다!

### 마치며🎉

프로젝트에 애정이 생기다보니 배포마저도 하나 하나 꼼꼼하게 따져보게 되는 것 같다😆
플랫폼 덕분에 빠르게 배포하고 후딱 다음 스탭으로!! 가즈아~~

### 출처

-   https://jamstack.org/
-   https://prismic.io/blog/vercel-vs-netlify
