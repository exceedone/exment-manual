# URL에 포함되는 "admin"의 변경·삭제
Exment 화면의 URL 앞에 붙는 값("/admin" 등)은 `.env`의 `ADMIN_ROUTE_PREFIX`로 정합니다.

- **v7.2.1 이후에 새로 설치한 사이트**: 기본으로는 아무것도 붙지 않습니다. 예: http://localhost
- **이전 버전으로 설치한 사이트**: "admin"이 붙어 있습니다(`ADMIN_ROUTE_PREFIX=admin`, 또는 설정이 없어 이전 기본값 그대로). 예: http://localhost/admin . 업데이트해도 바뀌지 않습니다.

이 매뉴얼의 URL은 아무것도 붙지 않는 기본 설정으로 적었습니다. "admin" 등이 붙어 있는 사이트에서는 사이트의 URL 뒤에 그 값을 더해서 읽으십시오(예: `(Exment의 URL)/auth/login` → `(Exment의 URL)/admin/auth/login`).

새로 설치할 때는 설정(setup)의 마지막 화면에 있는 "**URL 앞에 붙는 값**"으로 정할 수 있습니다(비워 두면 붙이지 않습니다. "admin"이라고 넣으면 이전 버전과 같습니다). 나중에 바꿀 때는 다음 절차로 `.env`를 고칩니다.

### 변경 절차

- Exment의 루트 디렉터리에서 ".env" 파일을 엽니다.
- 아래 값 중 하나를 적습니다.

~~~
### 1. 아무것도 붙이지 않는다(v7.2.1 이후의 기본)
ADMIN_ROUTE_PREFIX=
# http://localhost 가 Exment의 URL이 된다

### 2. "admin"을 붙인다(이전 버전의 사이트와 같음)
ADMIN_ROUTE_PREFIX=admin
# http://localhost/admin 이 Exment의 URL이 된다

### 3. 다른 이름으로 한다
ADMIN_ROUTE_PREFIX=admin184628
# http://localhost/admin184628 이 Exment의 URL이 된다
~~~

- "admin"이 붙어 있던 사이트를 아무것도 붙이지 않는 설정으로 바꾸면, 이전 URL(`/admin/...`)을 열었을 때 같은 페이지(`/...`)로 이동합니다(GET일 때만. v7.2.1 이후). 북마크나 메일에 적힌 링크도 열 수 있습니다.
- "admin"을 붙이면 "admin"이 붙지 않은 URL([http://localhost](http://localhost))에는 Exment와는 다른 페이지(사용 중인 프레임워크의 기본 페이지)가 나옵니다. 여기에 로그인이 필요 없는 일반 이용자용 사이트를 만들 수도 있습니다([이용자용 사이트](/ko/public_site)).
![Prefix 변경](../img/quickstart/route_prefix1.png)

### 변경·삭제했을 때의 URL
"admin"을 변경·삭제하면 화면의 URL뿐 아니라 **API나 로그인 콜백 등 Exment의 모든 URL**이 바뀝니다.  
다른 시스템에 등록하는 URL(API의 인증·실행, SSO의 콜백 URL, LINE의 Webhook URL, 플러그인의 URL 등)도 함께 바꾸십시오. 이전 `/admin/...`에서 이동하는 것은 화면을 열 때(GET)뿐이므로, API나 Webhook의 URL은 바꾸십시오.

| 용도 | 아무것도 붙이지 않는다(v7.2.1 이후의 기본) | "admin"(이전 버전의 사이트) | "admin184628"로 바꾼 경우 |
| ---- | ---- | ---- | ---- |
| 로그인 화면 | (Exment의 URL)/auth/login | (Exment의 URL)/admin/auth/login | (Exment의 URL)/admin184628/auth/login |
| API의 토큰 받기 | (Exment의 URL)/oauth/token | (Exment의 URL)/admin/oauth/token | (Exment의 URL)/admin184628/oauth/token |
| API의 실행 | (Exment의 URL)/api/data/(테이블 이름) | (Exment의 URL)/admin/api/data/(테이블 이름) | (Exment의 URL)/admin184628/api/data/(테이블 이름) |
| API 앱 설정 | (Exment의 URL)/api_setting | (Exment의 URL)/admin/api_setting | (Exment의 URL)/admin184628/api_setting |
| SSO(OAuth)의 콜백 | (Exment의 URL)/auth/login/(provider 이름)/callback | (Exment의 URL)/admin/auth/login/(provider 이름)/callback | (Exment의 URL)/admin184628/auth/login/(provider 이름)/callback |
| 플러그인(페이지) | (Exment의 URL)/plugins/(URL) | (Exment의 URL)/admin/plugins/(URL) | (Exment의 URL)/admin184628/plugins/(URL) |


[←추가 설정 목록으로 돌아가기](/ko/quickstart_more)
