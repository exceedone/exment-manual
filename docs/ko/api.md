# API 설정
다른 시스템이나 프로그램에서 API(프로그램끼리 주고받기 위한 입구)로 Exment의 데이터를 읽고 쓸 수 있습니다.
이 페이지에서는 API를 사용할 수 있게 하는 설정과 인증(누구로서 실행하는지를 확인하는 것) 방법을 설명합니다.

API를 사용하기까지의 순서는 다음과 같습니다.

1. 시스템 설정에서 "API 사용"을 YES로 합니다([시스템 설정 변경](/ko/api?id=시스템-설정-변경)).
2. 3가지 인증 방식 중 하나를 골라 API 애플리케이션을 등록합니다([API 인증 방법](/ko/api?id=API-인증-방법)).
3. 액세스 토큰(API를 호출할 때 붙이는, 기한이 있는 암호)을 받습니다.
4. 액세스 토큰을 붙여서 API를 실행합니다([API 실행 방법](/ko/api?id=API-실행-방법)).

인증은 Exment의 계정을 사용하는 OAuth라는 방식입니다.  
Exment에서는 [laravel/passport](https://github.com/laravel/passport)를 사용한 인증을 하고 있습니다.  
참고: [Laravel 12.x Laravel Passport](https://laravel.com/docs/12.x/passport)  
그래서 인증은 laravel/passport에 의존한 방식이 되지만, 이 매뉴얼에서는 3가지 인증 방식을 소개합니다.

※사용자가 직접 키를 만들어 쓰는 "API 키"(v7.2.1 이상)는 [API 키](/ko/api_key)를 참조하십시오. 이 페이지의 "API Key(API 키 방식)"와는 다른 기능입니다.

## 시스템 설정 변경
Exment에서 API를 사용하려면 메뉴 "관리자 설정 > 시스템 설정"에서 "API 사용"을 YES로 바꿔 주십시오.

> ※URL은 "/admin"이 붙지 않는 표준 설정(v7.2.1 이상에서 새로 설치한 사이트)의 경우입니다. `.env` 의 `ADMIN_ROUTE_PREFIX` 에 값이 있는 경우(이전 버전에서 설치한 사이트는 "admin")에는 사이트 URL 뒤에 그 값을 붙여 주십시오(예: `http(s)://(Exment의 URL)/admin/oauth/token`). 자세한 내용은 [URL에 포함된 "admin"의 변경·삭제](/ko/additional_prefix)를 참조하십시오.

## API 인증 방법
인증 방식은 3가지입니다. 사용 방법에 맞는 것을 골라 주십시오.

| 인증 방식 | 알맞은 사용 방법 |
| --- | --- |
| 1. 화면 로그인 방식 | 웹에서 API를 실행하는 경우 |
| 2. 비밀번호 방식 | 웹 화면을 호출하기 어려운 클라이언트 앱 |
| 3. API 키 방식 | 배치 실행 |

1. **OAuth 2.0, Authorization Code Flow(화면 로그인 방식)**  
사용자가 브라우저에서 로그인하고 앱의 이용을 승인하면 API를 사용할 수 있게 되는 방식입니다. 웹에서 API를 실행하는 경우에 추천합니다.

1. **Password Grant Token(비밀번호 방식)**  
인증 요청에 로그인 ID·비밀번호를 포함하면 API를 사용할 수 있게 되는 방식입니다. 웹 화면을 호출하기 어려운 클라이언트 앱에 추천합니다.

1. **API Key(API 키 방식)**  
API 애플리케이션을 만들 때 API 키를 만듭니다. 그 뒤 인증 요청에 API 키를 포함하면 API를 사용할 수 있게 되는 방식입니다. 배치 실행에 추천합니다.


### 1. OAuth 2.0, Authorization Code Flow(화면 로그인 방식)
새로 만드는 웹 서비스(예: 회계 시스템)에서 사용자가 Exment에 로그인하여 API를 사용할 수 있게 되는 방식입니다. 다음 순서로 진행됩니다.

- 인증할 때 웹 브라우저에 Exment의 ID·비밀번호를 입력하는 화면이 표시됩니다.  

- 사용자가 ID·비밀번호를 입력하면 앱을 승인하는 메시지가 표시됩니다.    

![API 인증 화면](../img/api/authorize1.png)  

- 사용자가 승인하면 웹 서비스로 돌아가고(콜백), 코드가 반환됩니다.

※이 매뉴얼에서는 Exment와는 다른 웹 서비스를 Laravel로 구축한 경우의 예를 적습니다.  
다른 언어나 프레임워크로도 구축할 수 있습니다.  

#### 설정 방법

##### Exment 페이지 안의 설정
- 시스템 관리자가 아래 URL을 입력합니다.  
http(s)://(Exment의 URL)/api_setting  
※위의 "시스템 설정 변경"을 하면 열 수 있게 됩니다.

- v7.1.0 이상에서는 왼쪽 메뉴의 "관리자 설정" → "API 설정"에서도 열 수 있습니다("API 사용"이 YES일 때).
- v7.0 이전에서는 "API 설정"이 기본 설정에서는 메뉴에 표시되지 않습니다. 메뉴에 추가하는 경우에는 "관리자 설정" > "메뉴" 페이지를 열고, 메뉴 종류 "시스템 메뉴"를 선택합니다. 대상에 "API 설정"이 표시되므로 선택하여 저장해 주십시오.


![API 인증 화면](../img/api/api_setting1.png)  

- API 설정 화면이 표시되므로 [새로 만들기]를 클릭합니다.  

- 필요한 사항을 입력합니다.  

    **인증 방식**  
	"화면 로그인 방식"을 선택합니다.  

	**애플리케이션 이름**  
	임의의 이름을 적어 주십시오.  

	**리디렉션 URL**  
	사용자가 화면에서 인증을 마쳤을 때 리디렉션할 URL을 적어 주십시오.  

![API 인증 화면](../img/api/api_setting2.png)  


- 저장이 끝나면 인증에 필요한 Client ID와 Client Secret이 표시되므로 복사합니다.  
※Client Secret은 눈 아이콘을 클릭하면 표시됩니다.  

![API 인증 화면](../img/api/api_setting3.png)  

##### 직접 개발하는 웹 서비스 쪽의 구현
- 웹 서비스 쪽에서 Exment 인증 화면을 호출하기 위한 엔드포인트를 만듭니다.

~~~
http(s)://(Exment의 URL)/oauth/authorize  GET  
response_type: code
client_id: (복사한 Client ID)
redirect_uri: (입력한 callback URL)
scope: (접근하기 위한 스코프. 목록은 아래에 기재. 여러 개인 경우에는 공백으로 구분)

예: http://localhost/oauth/authorize?response_type=code&client_id=aaaaaaaa-aaaa-aaaa-aaaaaaaa&redirect_uri=http://localhost/callback&scope=me value_read
~~~

- 예:
~~~ php
// 웹 서비스 쪽의 구현
Route::get('/redirect', function () {
    $query = http_build_query([
        'client_id' => '(복사한 Client ID)',
        'redirect_uri' => '(입력한 callback URL)',
        'response_type' => 'code',
        'scope' => 'me',
    ]);

    return redirect('(Exment의 URL)/oauth/authorize?'.$query);
}
~~~

- Exment 인증이 끝난 뒤에 액세스 토큰을 받기 위한 엔드포인트를 웹 서비스 쪽에서 만듭니다.

~~~
http(s)://(Exment의 URL)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "(복사한 Client ID)",
    "client_secret": "(복사한 Client Secret)",
    "redirect_uri": "(입력한 callback URL)",
    "code": "(리디렉션된 URL에서 얻은 code)"
}
~~~

- 예:
~~~ php
// 웹 서비스 쪽의 구현. 엔드포인트는 입력한 callback URL
Route::get('/callback', function (Request $request) {
    $http = new GuzzleHttp\Client;

    $response = $http->post('(Exment의 URL)/oauth/token', [
        'form_params' => [
            'grant_type' => 'authorization_code',
            'client_id' => '(복사한 Client ID)',
            'client_secret' => '(복사한 Client Secret)',
            'redirect_uri' => '(입력한 callback URL)',
            'code' => $request->code,
        ],
    ]);

    $json = json_decode((string) $response->getBody(), true);
});
~~~

- 이렇게 하면 응답 값으로 access_token, refresh_token, expires_in 속성을 포함한 json이 반환됩니다.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

이 액세스 토큰을 사용하여 API를 실행합니다.


### 2. Password Grant Token(비밀번호 방식)
인증 요청에 로그인 ID·비밀번호를 포함하면 API를 사용할 수 있게 되는 방식입니다.

- 사용자가 화면에서 ID·비밀번호를 입력할 필요가 없으므로 배치 처리 등에서도 실행할 수 있습니다.  

- 사용자의 ID·비밀번호를 인증 요청에 포함해야 합니다.  

- SSO 중에서는 LDAP을 지원합니다. OAuth와 SAML 인증은 지원하지 않습니다.

※이 매뉴얼에서는 Exment와는 다른 웹 서비스를 Laravel로 구축한 경우의 예를 적습니다.  
다른 언어나 프레임워크로도 구축할 수 있습니다.  

#### 설정 방법

##### Exment 페이지 안의 설정
- 시스템 관리자가 아래 URL을 입력합니다.  
http(s)://(Exment의 URL)/api_setting  
※위의 "시스템 설정 변경"을 하면 열 수 있게 됩니다.

- v7.1.0 이상에서는 왼쪽 메뉴의 "관리자 설정" → "API 설정"에서도 열 수 있습니다("API 사용"이 YES일 때).
- v7.0 이전에서는 "API 설정"이 기본 설정에서는 메뉴에 표시되지 않습니다. 메뉴에 추가하는 경우에는 "관리자 설정" > "메뉴" 페이지를 열고, 메뉴 종류 "시스템 메뉴"를 선택합니다. 대상에 "API 설정"이 표시되므로 선택하여 저장해 주십시오.

![API 인증 화면](../img/api/api_setting1.png)  

- API 설정 화면이 표시되므로 [새로 만들기]를 클릭합니다.  

- 필요한 사항을 입력합니다.  

    **인증 방식**  
	"비밀번호 방식"을 선택합니다.  

	**애플리케이션 이름**  
	임의의 이름을 적어 주십시오.

![API 인증 화면](../img/api/api_setting4.png)  


- 저장이 끝나면 인증에 필요한 Client ID와 Client Secret이 표시되므로 복사합니다.  
※Client Secret은 눈 아이콘을 클릭하면 표시됩니다.  

![API 인증 화면](../img/api/api_setting5.png)  


##### 직접 개발하는 프로그램 쪽의 구현
- 액세스 토큰을 받기 위한 요청을 호출하는 쪽에서 만듭니다.

~~~
http(s)://(Exment의 URL)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(복사한 Client ID)",
    "client_secret": "(복사한 Client Secret)",
    "username": "(로그인할 사용자 ID 또는 메일 주소)",
    "password": "(로그인할 사용자 비밀번호)",
    "scope": "(접근할 스코프. 목록은 아래에 기재. 여러 개인 경우에는 공백으로 구분)"
}
~~~

- 이렇게 하면 응답 값으로 access_token, refresh_token, expires_in 속성을 포함한 json이 반환됩니다.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

이 액세스 토큰을 사용하여 API를 실행합니다.


##### 직접 개발하는 프로그램 쪽의 구현(LDAP 인증의 경우)
- LDAP 인증의 경우, 아래와 같이 POST를 해 주십시오.

~~~
http(s)://(Exment의 URL)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(복사한 Client ID)",
    "client_secret": "(복사한 Client Secret)",
	"login_type": "ldap",
	"provider_name": "(로그인 설정 화면에서 입력한 "LDAP 이름(영숫자)")",
    "username": "(로그인할 사용자 ID 또는 메일 주소)",
    "password": "(로그인할 사용자 비밀번호)",
    "scope": "(접근할 스코프. 목록은 아래에 기재. 여러 개인 경우에는 공백으로 구분)"
}
~~~

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

이 액세스 토큰을 사용하여 API를 실행합니다.



### 3. API Key(API 키 방식)
API 애플리케이션을 만들 때 API 키를 만듭니다. 그 뒤 인증 요청에 API 키를 포함하면 API를 사용할 수 있게 되는 방식입니다.

- 사용자가 화면에서 ID·비밀번호를 입력할 필요가 없습니다.  
비밀번호를 실행하는 쪽에 설정할 필요도 없습니다. 배치 처리 등을 개발하는 경우에도 비밀번호를 넣어 두지 않아도 되므로 보안 위험을 낮출 수 있습니다.

- **이 설정으로 API 애플리케이션을 등록한 경우, REST API는 API 애플리케이션을 만든 사용자로서 실행됩니다.**  

※이 매뉴얼에서는 Exment와는 다른 웹 서비스를 Laravel로 구축한 경우의 예를 적습니다.  
다른 언어나 프레임워크로도 구축할 수 있습니다.  

#### (보충)API Key로 설정하는 경우에 권장하는 사용자·역할 그룹 설정

이 설정으로 API 애플리케이션을 등록한 경우, REST API는 API 애플리케이션을 만든 사용자로서 실행됩니다.  
그래서 시스템 관리자가 API 애플리케이션을 등록하는 것은 그다지 권장하지 않습니다.  
아래와 같은 순서로 사용자·역할 그룹을 설정할 것을 추천합니다.  

- [역할 그룹 설정](/ko/role_group)을 새로 만듭니다.
    - "API 애플리케이션 관리" 권한을 추가합니다.
	- API로 실행하고 싶은 테이블에 대해 권한을 추가합니다.

- API로 실행할 사용자를 추가합니다.
    - 역할 그룹은 위에서 만든 역할 그룹을 선택합니다.

- 위에서 만든 사용자로 로그인하고, API 설정 화면을 표시하여 API 애플리케이션을 등록해 주십시오.


#### 설정 방법

##### Exment 페이지 안의 설정
- 시스템 관리자가 아래 URL을 입력합니다.  
http(s)://(Exment의 URL)/api_setting  
※위의 "시스템 설정 변경"을 하면 열 수 있게 됩니다.

- v7.1.0 이상에서는 왼쪽 메뉴의 "관리자 설정" → "API 설정"에서도 열 수 있습니다("API 사용"이 YES일 때).
- v7.0 이전에서는 "API 설정"이 기본 설정에서는 메뉴에 표시되지 않습니다. 메뉴에 추가하는 경우에는 "관리자 설정" > "메뉴" 페이지를 열고, 메뉴 종류 "시스템 메뉴"를 선택합니다. 대상에 "API 설정"이 표시되므로 선택하여 저장해 주십시오.

![API 인증 화면](../img/api/api_setting1.png)  

- API 설정 화면이 표시되므로 [새로 만들기]를 클릭합니다.  

- 필요한 사항을 입력합니다.  

    **인증 방식**  
	"API 키 방식"을 선택합니다.  

	**애플리케이션 이름**  
	임의의 이름을 적어 주십시오.

![API 인증 화면](../img/api/api_setting4.png)  


- 저장이 끝나면 인증에 필요한 Client ID와 Client Secret, API 키가 표시되므로 복사합니다.  
※Client Secret, API 키는 눈 아이콘을 클릭하면 표시됩니다.  

![API 인증 화면](../ja/img/api/api_setting6.png)  


##### 직접 개발하는 프로그램 쪽의 구현
- 액세스 토큰을 받기 위한 요청을 호출하는 쪽에서 만듭니다.

~~~
http(s)://(Exment의 URL)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "api_key",
    "client_id": "(복사한 Client ID)",
    "client_secret": "(복사한 Client Secret)",
    "api_key": "(복사한 API 키)",
    "scope": "(접근할 스코프. 목록은 아래에 기재. 여러 개인 경우에는 공백으로 구분)"
}
~~~

- 이렇게 하면 응답 값으로 access_token, refresh_token, expires_in 속성을 포함한 json이 반환됩니다.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

이 액세스 토큰을 사용하여 API를 실행합니다.


## API 실행 방법
API를 실행하려면 요청 헤더에 아래를 추가합니다.  
  
~~~
Content-Type: application/json  
Authorization: Bearer (받은 액세스 토큰)  
~~~

예:
~~~  
http://localhost/api/data/user GET
헤더 값:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~

결과:
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

> ※URL은 "/admin"이 붙지 않는 표준 설정(v7.2.1 이상에서 새로 설치한 사이트)의 경우입니다. `.env` 의 `ADMIN_ROUTE_PREFIX` 에 값이 있는 경우(이전 버전에서 설치한 사이트는 "admin")에는 사이트 URL 뒤에 그 값을 붙여 주십시오(예: `http(s)://(Exment의 URL)/admin/oauth/token`). 자세한 내용은 [URL에 포함된 "admin"의 변경·삭제](/ko/additional_prefix)를 참조하십시오.

## 토큰 갱신
액세스 토큰은 일정한 시간이 지나면 유효 기간이 끝나 사용할 수 없게 됩니다.  
그 경우에는 리프레시 토큰(액세스 토큰을 다시 받기 위한 값)을 사용하여 다시 한 번 액세스 토큰을 받을 수 있습니다.  
아래 내용으로 HTTP POST를 실행해 주십시오.    

~~~
http(s)://(Exment의 URL)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "refresh_token",
    "client_id": "(복사한 Client ID)",
    "client_secret": "(복사한 Client Secret)",
    "refresh_token": "(받은 리프레시 토큰)"
}
~~~

결과:
~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~


## (참고)인증, 토큰 취득, API 실행을 화면에서 하기
프로그램을 쓰기 전에 인증부터 API 실행까지를 브라우저와 도구로 시험해 보는 순서입니다.  
액세스 토큰을 받기까지의 흐름을 파악하는 데 사용해 주십시오.    

- API 설정에서 "화면 로그인 방식"으로 앱을 만듭니다.

- 아래 URL에 접속합니다.  
http(s)://(Exment의 URL)/oauth/authorize?client_id=(복사한 Client ID)&redirect_uri=(입력한 callback URL)&response_type=code&scope=me  
  
예:  
http://localhost/oauth/authorize?client_id=1af52b10-BBBB-CCCC-XXXX-YYYYYYYY&redirect_uri=http%3a%2f%2flocalhost%2fauth%2fcallback&response_type=code&scope=me  


- 이렇게 하면 앱 인증을 위한 간단한 화면이 표시됩니다.  

![API 인증 화면](../img/api/authorize1.png)  

"승인"을 클릭합니다.  

- URL 칸에 "code=xxxxx"라는 쿼리가 추가되어 있습니다.  
이 코드를 복사합니다.    
예:  auth/callback?code=def5020012c32121912561705255XXXXXXXX  

- POST 통신을 할 수 있는 도구를 사용하여 아래 HTTP 통신을 실행합니다.  
  
~~~
http(s)://(Exment의 URL)/oauth/token  POST  
grant_type: authorization_code
client_id: (복사한 Client ID)
client_secret: (복사한 Client Secret)
redirect_uri: (입력한 callback URL)
code: (받은 code 값)  
~~~
  
예:  
~~~
http://localhost/oauth/token POST
grant_type: authorization_code
client_id: 1af52b10-BBBB-CCCC-XXXX-YYYYYYYY
client_secret: PKh1u3xxxx
redirect_uri: http://localhost/auth/callback
code: def5020012c32121912561705255XXXXXXXX  
~~~
  
- 정상적으로 끝나면 아래와 같은 응답이 반환됩니다.  
![API 인증 화면](../img/api/authorize2.png)  
이 응답의 json 값에서 access_token을 얻습니다.  

- 이 액세스 토큰을 API의 헤더에 추가하여 API를 실행합니다.  
  
예:  
~~~
http://localhost/api/data/user GET
헤더 값:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~
  
결과:  
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## 스코프 목록
스코프는 그 앱에 "API로 어디까지 하게 할지"를 정하는 값입니다.  
토큰을 받을 때 지정한 스코프의 범위까지 API를 실행할 수 있습니다.  
**※스코프 설정과 관계없이, API로 접근할 수 있는 것은 로그인 사용자가 가진 역할·권한의 정보뿐입니다.**  
예를 들어 권한이 없는 테이블의 정보는 가져올 수 없고, 권한이 없는 사용자 정의 데이터의 업데이트는 할 수 없습니다.    


| 매개변수 이름 | 설명 |
| ---- | ---- |
| me | 로그인 사용자의 정보를 가져올 수 있습니다. |
| system_read | 시스템 정보를 가져올 수 있습니다. (현재 사용 안 함. 예약어로 기재) |
| system_write | 시스템 정보를 가져오기·새로 추가·업데이트·삭제할 수 있습니다.(현재 사용 안 함. 예약어로 기재) |
| table_read | 사용자 정의 테이블의 설정 정보를 가져올 수 있습니다. |
| table_write | 사용자 정의 테이블의 설정 정보를 가져오기·새로 추가·업데이트·삭제할 수 있습니다.(현재 사용 안 함. 예약어로 기재) |
| view_read | 사용자 정의 뷰의 설정 정보를 가져올 수 있습니다. |
| value_read | 사용자 정의 데이터의 정보를 가져올 수 있습니다. |
| value_write | 사용자 정의 데이터의 정보를 가져오기·새로 추가·업데이트·삭제할 수 있습니다. |
| notify_read | 알림의 정보를 가져올 수 있습니다. |
| notify_write | 알림을 새로 추가할 수 있습니다. |
| workflow_read | 워크플로의 정보를 가져올 수 있습니다. |
| workflow_execute | 워크플로를 실행할 수 있습니다. |
| log | 작업 로그를 가져올 수 있습니다. |
| plugin | 플러그인으로 추가된 API를 이용할 수 있습니다. 자세한 내용은 [여기](/ko/plugin_quickstart_api) |

※여러 스코프를 지정하는 경우, 공백으로 구분하여 매개변수에 설정해 주십시오.  



## 오류 코드 목록(확인 중)
API 실행에서 오류가 발생하면 오류 코드가 반환됩니다.  
오류 코드와 HTTP 응답의 상태 코드 목록입니다.    

| Exment 오류 코드 | HTTP 상태 코드 | 설명 | 
| ---- | ---- | ---- |
| 101 | 403 | 그 엔드포인트·사용자 정의 테이블에 접근하기 위한 권한이 없습니다. 실행하는 사용자의 권한을 다시 확인해 주십시오. |
| 102 | 400 | 실행할 때의 쿼리 문자열이나 보낸 값에 문제가 있습니다. 값을 다시 확인해 주십시오. |
| 103 | 400 | 주로 데이터를 추가·업데이트할 때, 보낸 값의 유효성 검사(검증)에서 문제가 발생했습니다. 보낸 값을 다시 확인해 주십시오. |
| 104 | 403 | 설정에 의해 데이터의 새로 만들기·업데이트·삭제 등의 액션을 실행할 수 없는 경우에 발생합니다. |
| 105 | 403 | 삭제할 수 없는 데이터입니다. |
| 106 | 403 | API 인증 때의 스코프가 잘못되었습니다. 스코프의 값을 다시 확인해 주십시오. |
| 107 | 400 | id를 지정하여 특정 데이터를 가져오는 경우, 그 값이 존재하지 않습니다. id를 지정해 주십시오. |
| 108 | 401 | API 인증 때의 액세스 토큰이 잘못되었거나 유효 기간이 지났습니다. 액세스 토큰을 다시 확인해 주십시오. |
| 109 | 400 | 데이터를 새로 만들 때 또는 삭제할 때, 동시에 실행할 수 있는 건수(표준: 100건)를 넘는 요청을 한 경우에 발생합니다. |
| 110 | 403 | 이미 삭제된 데이터에 대해 데이터의 업데이트 등을 한 경우에 발생합니다. |
| 111 | 500 | 플러그인(API)을 실행할 때, 지정한 플러그인이 존재하지 않는 경우에 발생합니다. 플러그인 이름을 다시 확인해 주십시오. |
| 112 | 400 | 뷰를 대상으로 한 API에서 테이블과 뷰가 서로 다른 것이었던 경우에 발생합니다. |
| 113 | 400 | 뷰를 대상으로 한 API에서 지원되지 않는 뷰 종류를 지정한 경우에 발생합니다. |
| 201 | 403 | 워크플로의 상태에 의해 잠긴 데이터에 대해 데이터의 업데이트·삭제 등을 한 경우에 발생합니다. |
| 202 | 400 | "현재의 워크플로 실행 값" API를 실행할 때, 워크플로를 시작하지 않았던 경우에 발생합니다. |
| 203 | 400 | "특정 데이터에 대해 작업 사용자의 목록을 가져오기", "특정 데이터에 대해 실행할 수 있는 다음 액션의 목록을 가져오기" API를 실행할 때, 워크플로가 완료되어 있던 경우에 발생합니다. |
| 204 | 400 | "특정 데이터에 대해 워크플로를 실행" API를 실행할 때, 지정한 액션 ID가 실행 가능하지 않았던 경우에 발생합니다. |
| 205 | 400 | "특정 데이터에 대해 워크플로를 실행" API를 실행할 때, 다음 작업 사용자가 존재하지 않는 경우에 발생합니다. |
| 301 | 400 | IP 제한에 의해 API를 실행할 수 없습니다. |
| 401 | 403 | 공개 폼용 API에서 대상 테이블이 공개 폼에 포함되어 있지 않은 경우에 발생합니다. |
| 402 | 403 | "1건만 등록 가능"이 설정된 테이블에 대해 2번째 이후의 데이터를 새로 만들려고 한 경우에 발생합니다. |

## WebAPI 레퍼런스
API의 레퍼런스는 [API 레퍼런스](https://exment.net/reference/ja/webapi.html)(일본어)를 참조해 주십시오.
