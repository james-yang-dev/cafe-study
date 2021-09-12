# 리액트 스터디

리액트 스터디를 위해서 간단한 페이지 개발을 해본다.

## Development

### Yarn

npm 말고 yarn을 사용한다.  
yarn이 없는경우 최신버전을 설치할 것.

최초 설치시 yarn 명령어만 실행한다.

```bash
yarn
```

### Branch

복잡한 브랜치 전략은 사용하지 않는다.  
마스터 브랜치는 절대적으로 손대지 않는다.  
각각의 이름으로 설정된 브랜치를 베이스로 삼아 추가 피쳐들을 개발한다.  
베이스 브랜치에 머지 할때는 PullRequest를 이용한다.

개발 이력을 살펴보기 위해서 rebase나 squash merge는 사용하지 않는다.

```bash
예) 민철 - mincheol(베이스브랜치) <- mincheol/featureName(개발브랜치)
```

## 프로젝트 구조

각 폴더별 필요한경우 index.js를 선언하여 해당 폴더에서 export하는 모든 내역을 모아서 export 한다.

### Store

리코일에서 사용되는 Atom, Selector 가 모여있다  
대부분 상태의 초기값이나 공용 값들도 여기에 정리되어 있음

### Pages

문서의 최상단 구조인 페이지의 모음

### Features

페이지의 조각들의 모음  
각 도메인(페이지) 단위로 모임

### Components

페이지에 종속되지 않는 하위 컴포넌트들의 모임

### Layout

레이아웃 컴포넌트가 위치함

### Util

필요한 공통 유틸은 이곳에 구현한다

## 추가 내용

[설계 문서](https://docs.google.com/presentation/d/1GhFzlG8YF4Qxc13AjrAH9knGt7ZzEjRX0CVpv8NyuGE/edit?usp=sharing)

### 리코일

[Recoil](https://recoiljs.org/ko/docs/introduction/motivation)  
리코일을 사용하여 상태관리의 피로도를 최소화 시킴  
사용법이 매우 간단하여 튜토리얼을 살펴보고 샘플로 구현해둔 내역도 같이 확인하자  

```javascript
feature/order/MenuList
feature/de4tail/OrderList
feature/de4tail/OrderDetail
```

### 이모션

[Emotion/Styled](https://emotion.sh/docs/styled)  
이모션은 CSS-in-JS에서 가장 널리 사용되는 라이브러리임  
이 프로젝트에선 CSS나 SCSS파일들을 사용하지 않는다  
필요한 스타일은 해당 컴포넌트 내에서 styled를 이용하여 적용한다

사용법은 조금 어려울 수 있지만, 감만 익힌다는 생각으로 간단하게 구현하자  
애초에 스터디 목적이 스타일보다는 개발 개념에 대해 익히는것임을 잊지 말자
