# 공식 플러그인
공식 플러그인은 Exceed One이 만들고, 테스트하고, 지원하는 Exment의 무료 플러그인입니다. 모두 소스 코드를 공개하고 있습니다([exceedone/exment-plugins](https://github.com/exceedone/exment-plugins), GPL-3.0).

| 플러그인 | 할 수 있는 것 |
| --- | --- |
| [프로젝트 관리](/ko/plugin_pm) | 프로젝트와 과제(티켓)·보드·간트 차트·Wiki·파일 |
| [IT 지원](/ko/plugin_it_support) | 헬프데스크. 메일·접수 폼·전화로 온 의뢰를 티켓으로 관리하고, 진행 상황을 고객과 로그인 없이 공유 |
| [Groupware](/ko/plugin_groupware) | 웹 메일과, 파일 공유의 Office 파일을 브라우저에서 열기·편집하기 |

## 설치 방법
### Exment v7.2.1 이상
공식 플러그인은 Exment와 함께 들어 있습니다. 시스템 관리자가 "관리자 설정" → "기능 관리"의 "[무료 공식 플러그인(Exment에 포함)](/ko/feature)" 칸에서 "사용(설치)"을 누르면 설치됩니다. 누르기 전까지는 설치도 읽어 들이기도 하지 않습니다.

- Exment 7.2.1에 포함된 것은 프로젝트 관리(ExmentPM) 1.7.15, IT 지원(ExmentITSupport) 1.0.9, Groupware(ExmentGroupware) 0.4.7입니다(패키지 exceedone/exment-plugins-release 7.2.14).
- 포함된 플러그인은 Exceed One의 서명을 확인한 뒤에 설치합니다.
- 새 버전이 있을 때는 알리기만 합니다. "이 버전으로 업데이트"로 업데이트하고, "이전 버전(○○)으로 되돌리기"로 되돌릴 수 있습니다.
- 보안 수정이 들어간 새 버전이 있을 때는 시스템 관리자에게 알립니다. 자세한 내용은 [기능 관리](/ko/feature)를 참조하십시오.
- Groupware는 설치했을 때 왼쪽 메뉴에 "메일"을 만듭니다.
- Exment를 업데이트하면 새 포함 버전이 오지만, 쓰고 있는 플러그인은 자동으로 바뀌지 않습니다([업데이트와 포함된 공식 플러그인](/ko/update?id=업데이트와-포함된-공식-플러그인)).

### 그보다 이전의 Exment
GitHub의 [Releases](https://github.com/exceedone/exment-plugins/releases)에서 zip을 다운로드하고, "관리자 설정" → "[플러그인](/ko/plugin)"에서 업로드합니다. 압축은 풀지 않습니다(녹색의 "Code → Download ZIP"은 사용하지 마십시오).

### Exment SaaS
Exment SaaS(`*.exments.com`)에서도 테넌트의 시스템 관리자가 "기능 관리"에서 "사용"을 누르면 설치와 초기 설정까지 자동으로 이루어집니다. 새 버전으로 올리는 것은 운영 측이며, 데이터 구조의 업데이트 등도 그때 함께 합니다.

## 관련 항목
- [플러그인](/ko/plugin)
- [기능 관리](/ko/feature)
