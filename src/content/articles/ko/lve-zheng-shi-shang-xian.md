---
title: LVE 정식 공개, 쓰레기 0day만 수록하는 쓰레기 사이트
description: 보기엔 무시무시하지만 실제로는 아무 쓸모 없는 쓰레기 취약점을 제출할 곳이 없어 잠 못 이룬 적 있는가? 오늘, 그것이 왔다.
pubDate: 2026-11-28
tags:
  - 사이버 보안
  - LVE
lang: ko
---

관리자로 로그인한 뒤에야 동작하는 관리자 페이지 XSS를 감사해 본 적 있는가?  
관리자 권한이 필요하고, 앞단에는 WAF까지 가로막고 있는 SQL 블라인드 인젝션을 감사해 본 적 있는가?  
AI로 훑어 보기엔 심각해 보이지만 실제로는 전혀 쓸모없는 쓰레기 취약점을 잔뜩 뽑아 본 적 있는가?  
그런 취약점을 제출할 곳이 없어 잠자리가 뒤숭숭했던 적은 없는가?  
그리고 온갖 Self-XSS와, 봐서는 그럴듯하지만 빠져들수록 허탕인 토끼굴(rabbit hole)들……

오늘, 그것이 왔다! xxx2shell — 어떤 버그를 쉘로 연결하는 그런 글이 넘치는 시대에, 우리는 현실에서 조금 벗어난 제품이 필요하다!

**LVE가 정식 공개되었다. 쓰레기 0day만 수록하는 쓰레기 사이트다.**

## 접속 주소

<a href="https://lveform.vercel.app/" target="_blank" rel="noopener noreferrer"><code>lveform.vercel.app</code></a>

## 사이트의 유래

서기 2023년, 한 신비한 인물이 CVE에 이렇게 제보했다. DVWA 소스 코드에 SQL 인젝션이 있다. 그렇다, 취약점을 잔뜩 넣어 두고 연습용으로 쓰는 그 훈련장 DVWA 말이다. 그리하여 CVE-2023-39848이 화려하게 등장했고, 한동안 바람이 일더니, 이내 거절되었다. (그를 추모하자.)

이런 일은 드물지 않다.

스캐너가 “하드코딩된 비밀키”로 온통 붉게 물들인다. 열어 보면 공식 문서의 예제다. 보고서에는 “임의 코드 실행”이라고 적혀 있다. 전제는 이미 관리자 권한을 갖고 있어야 한다는 것이다. 어떤 CVE는 9.8점을 받았고, 프로젝트 유지보수자가 긴 글로 공개 반박했다. “이건 취약점이 아니다.”

이런 것들은 취약점처럼 보인다. 찾아내면 발견처럼 느껴지기도 한다. 제출해 보면 돌아오는 말은 “의도된 동작”뿐이다.

그래서 우리는 LVE(Lame Vulnerabilities and Exposures, 한심한 취약점 수록 센터)를 만들었다. CVE는 고위험 취약점을 수록하고, LVE는 한심한 취약점을 수록한다.

## 무엇을 수록하는가

LVE는 “취약점처럼 보이지만 실제로는 해가 없는” 공개 발견만 수록한다. 각 기록에는 정식 번호(LVE-YYYY-NNNN)가 붙고, 영향받는 제품과 버전, 위치, 설명, 그리고 가장 중요한 항목인 “왜 무해한가”가 적힌다.

오픈소스 프레임워크의 기본 비밀번호와 문서 예제, 이미 관리자가 된 다음에야 “칠 수 있는” 발견, CVE로 등록되었다가 벤더나 유지보수자가 공개적으로 부인한 사례가 여기 해당한다. 실제로 위험한 문제는 정식 경로로 벤더에 보고하라. 여기는 그곳이 아니다.

## DS 한심 지수

CVSS가 높을수록 위험하고, DS가 높을수록 한심하다. 전제 조건, 실제 영향, 기본 상태에서의 악용 가능성, 공개되어 있거나 설계가 그러한지, 벤더의 태도, 오탐 정도 — 이 여섯 가지로 1점부터 10점까지 매긴다. 등급은 경미, 중간, 심각, 터무니없음 네 단계다. 만점 10점은 처음부터 끝까지 한심한 취약점이다.

## 첫 수록분

첫 37건은 모두 공개 오픈소스 프로젝트에 대한 실제 감사에서 나왔다. Flask, Django, Rails, Spring Boot, Jenkins, Keycloak, Strapi, Superset, Redis, WordPress 공식 이미지 등을 다루며, 각 건은 특정 커밋에 고정되어 있어 링크를 누르면 소스 코드로 바로 이동한다. CVE로 등록되었다가 공식 측이 공개 부인한 고전 사례도 수록되어 있다. PostgreSQL(CVE-2019-9193), curl(CVE-2020-19909), CPython(CVE-2023-36632)이 그렇다.

## 투고 방법

GitHub에서 템플릿에 맞춰 Issue를 열면 된다. 필수 항목은 제품, 위치, 무엇처럼 보이는지, 왜 무해한지, 그리고 동의 체크 하나뿐이다. 여섯 가지 점수는 비워 두어도 되며, 유지보수자가 이슈를 닫을 때 매긴다. 유지보수자가 이슈를 닫으면 LVE 번호가 부여되고 사이트에 게시되며, 제출자의 GitHub 사용자 이름이 명예의 전당에 오른다.

투고 주소: <a href="https://github.com/Gh0xE9/lve_website/issues/new?template=lve-submission.yml" target="_blank" rel="noopener noreferrer">GitHub Issue 템플릿</a>

소스 저장소: <a href="https://github.com/Gh0xE9/lve_website" target="_blank" rel="noopener noreferrer"><code>github.com/Gh0xE9/lve_website</code></a>

사이트는 중국어와 영어 인터페이스를 제공한다.

## 면책 성명

이 사이트는 공개 정보만 수록하며, 어떠한 익스플로잇 코드도 제공하지 않는다. LVE는 오락 목적의 수록 사이트이며, CVE, CNVD, NVD와 소속 관계가 없다. 실제로 위험한 문제는 정식 경로로 벤더에 보고하라.

당신이 찾아낸 한심한 취약점에도, 이제 둘 곳이 있다.

방문: <a href="https://lveform.vercel.app/" target="_blank" rel="noopener noreferrer"><code>lveform.vercel.app</code></a>  
투고: <a href="https://github.com/Gh0xE9/lve_website/issues/new?template=lve-submission.yml" target="_blank" rel="noopener noreferrer">GitHub Issue 템플릿</a>
