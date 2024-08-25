# homelog-client

## HomeLog 배포 주소

[🏠 HomeLog](https://dev.homelog.online/)

- 프로덕션 배포는 비용 문제로 2024-08-16 이후 중단되었습니다.

## 1. 아키텍처
- 개발 환경에서의 아키텍처
  ![homelog-dev-architecture](https://i.imgur.com/cOZ3ljM.png)

## 2. 서비스 소개

🏠 **Home-log**는 집에 초대된 손님들이 방명록을 남기고, 집 주인이 방명록을 모아볼 수 있는 서비스입니다.
집에서 만든 소중한 추억들을 한 곳에 모아 남겨보세요!✨

## 3. 사용 기술 및 개발 환경

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## 4. 개발자

| 프로필 | 깃허브 | 역할 |
| --- | --- | --- |
| 고지명 | [jimyungkoh](https://github.com/jimyungkoh) | * 방명록(링크 생성, 작성, 상세) 페이지 <br/> * 공통 컴포넌트 설계 <br/> * CI/CD 파이프라인 및 통합 테스트 환경 구축 <br/> * 이미지 프로세싱 |
| 박상희 | [Sangddong](https://github.com/Sangddong) | 로그인 페이지, 홈 페이지, 프로필 수정 페이지 |

## 5. 브랜치 전략

### 브랜치 관리

- main : 프로덕션 배포 브랜치
- dev : 개발 환경용 브랜치
- feat : 개별 기능 개발용 브랜치
- hotfix : main 브랜치에서 발생한 버그를 수정하는 브랜치

### 브랜치 작성 규칙

- 브랜치 작성 규칙 : 태그/이슈번호\_변경사항-설명
- 소문자로만 작성하며, 개조식 구문으로 작성

### Commit Convention

|   태그   |             설명              |
| :------: | :---------------------------: |
|   feat   |       새로운 기능 추가        |
|   fix    |           버그 수정           |
| refactor |         코드 리팩토링         |
|   docs   |           문서 수정           |
|  chore   |         기타 변경사항         |
|   test   |          테스트 작성          |
|    ci    | CI 구성 파일 및 스크립트 변경 |

## 6. 주요 기능

- 사용자
  - 회원가입 및 로그인
  - 방명록 작성 가능
- 유저
  - 프로필 등록 및 수정 기능
  - 방명록 작성 링크 생성 기능
  - 방명록 삭제 기능

## 7. ERD

![db-erd](https://github.com/user-attachments/assets/dc7a3257-3550-4f5d-9769-d5ddd2ff1aca)
