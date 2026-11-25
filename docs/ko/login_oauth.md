# 싱글 사인온(OAuth)
OAuth를 사용한 싱글 사인온(SSO)의 설정 방법입니다. Google이나 Microsoft 등의 계정으로 Exment에 로그인할 수 있게 됩니다.  
Exment에서는 [로그인 설정](/ko/login_setting)에서 싱글 사인온을 추가할 수 있습니다. 추가하면 Exment 전용 로그인 비밀번호를 관리하지 않아도 공급자(Google 등 로그인을 담당하는 서비스)의 ID와 비밀번호로 로그인할 수 있습니다.

설정은 다음 2가지를 순서대로 진행합니다.

1. **서버와 공급자 준비**(공급자 쪽에 애플리케이션을 만들고, 필요하면 라이브러리를 설치한다) … "서버·각 공급자 설정"
2. **화면에서 설정**(로그인 설정 화면에서 공급자를 추가한다) … "화면에서 설정"

1의 절차는 사용하는 공급자에 따라 달라집니다.

| 사용하는 공급자 | 볼 곳 |
|---|---|
| Google, Facebook, Twitter, GitHub, LinkedIn, Bitbucket | (1) Socialite가 표준으로 제공하는 공급자의 경우 |
| Office365, Microsoft Graph | (2) Exment 확장으로 제공하는 공급자의 경우 |
| 그 밖의 것 | (3) 직접 공급자를 준비하는 경우 |

#### 주의점
- Exment에서는 [Socialite](https://github.com/laravel/socialite)로 싱글 사인온 처리를 구현하고 있습니다.
- **이 매뉴얼은 OAuth를 잘 아는 분을 위한 절차입니다. 각 공급자의 Client ID와 Client Secret을 만드는 방법 등은 각 자료를 참조하십시오.**
- <span class="red">v3.0.16 이하에서 Google 로그인이 되지 않는 분은 [이 절차](/patch/sso_google)(영어)로 대응하십시오.</span>

#### 참고 링크
- [오픈 소스 웹 데이터베이스 "Exment"에서 Google 계정을 이용한 SSO에 대응하기](https://qiita.com/hirossyi73/items/70dcc35305a96abace08)(일본어)


## 서버·각 공급자 설정
로그인 설정 화면에서 공급자를 추가하기 전에, 서버에서 명령을 실행하여 확장 기능을 설치해야 합니다.

### (1) Socialite가 표준으로 제공하는 공급자의 경우
- Socialite가 표준으로 제공하는 공급자는 다음과 같습니다. (괄호 안의 문자열은 나중에 service를 지정할 때 사용합니다)
    - Google (google)
    - Facebook (facebook)
    - Twitter (twitter)
    - GitHub (github)
    - LinkedIn (linkedin)
    - Bitbucket (bitbucket)

- 각 공급자에서 Exment용 애플리케이션을 만듭니다.  
※ callback URL은 다음과 같습니다.  
http(s)://(Exment의 URL)/auth/login/(socialite의 provider 이름)/callback  

    - 예1 GitHub의 경우: http(s)://(Exment의 URL)/auth/login/github/callback  
    - 예2 Facebook의 경우: http(s)://(Exment의 URL)/auth/login/facebook/callback  
    - 예3 Google의 경우: http(s)://(Exment의 URL)/auth/login/google/callback  

> ※ URL은 "/admin"이 붙지 않는 표준 설정(v7.2.1 이후에 새로 설치한 사이트)인 경우입니다. `.env`의 `ADMIN_ROUTE_PREFIX`에 값이 있는 경우(이전 버전에서 설치한 사이트는 "admin")에는 사이트 URL 뒤에 그 값을 더하십시오(예: `http(s)://(Exment의 URL)/admin/auth/login/google/callback`). 자세한 내용은 [URL에 포함된 "admin"의 변경·삭제](/ko/additional_prefix)를 보십시오.

- 다음 명령을 Exment의 루트 디렉터리에서 실행합니다.

~~~
composer require laravel/socialite=~5.1
~~~
※ Exment v7.0.0 이후에서는 "laravel/socialite"가 Exment의 의존 라이브러리로 자동 설치되므로 이 명령을 실행할 필요가 없습니다.

- [화면에서 설정](/ko/login_oauth?id=화면에서-설정)을 진행합니다.




### (2) Exment 확장으로 제공하는 공급자의 경우
- 일부 공급자는 Exment의 확장으로 제공합니다. (괄호 안의 문자열은 나중에 service를 지정할 때 사용합니다)
    - Office365, Microsoft Graph (graph)

- 각 공급자에서 Exment용 애플리케이션을 만듭니다.  
※ callback URL은 다음과 같습니다.  
http(s)://(Exment의 URL)/auth/login/(socialite의 provider 이름)/callback  

    - 예 Office365의 경우: http(s)://(Exment의 URL)/auth/login/graph/callback

- 다음 명령을 Exment의 루트 디렉터리에서 실행합니다.

~~~
composer require exceedone/microsoft-graph
~~~

- [화면에서 설정](/ko/login_oauth?id=화면에서-설정)을 진행합니다.


### (3) 직접 공급자를 준비하는 경우
(1)(2)에 없는 공급자의 경우에는 [Socialite Providers](https://socialiteproviders.github.io/)에서 비공식 공급자를 추가합니다.  
비공식 공급자에도 아바타(사용자의 이미지)를 가져오는 처리는 들어 있지 않습니다. 아바타를 가져오고 싶은 경우에는 처리를 추가합니다. (선택)  
  
※ 절차가 몇 가지 있습니다. 자세한 내용은 [독자 공급자 작성 방법](/ko/login_oauth?id=독자-공급자-작성-방법)을 확인하십시오.

- 절차가 끝나면 [화면에서 설정](/ko/login_oauth?id=화면에서-설정)을 진행합니다.



## 화면에서 설정
서버 설정이 끝나면 [로그인 설정 화면](/ko/login_setting)에서 공급자를 추가합니다.

1. 관리자 계정으로 시스템 설정 화면을 엽니다.  
페이지 오른쪽 위의 "로그인 설정" 버튼으로 로그인 설정 화면을 엽니다.  
![로그인 설정 화면](../ja/img/login/login_setting1.png)  

2. 신규 버튼을 눌러 로그인 설정을 만듭니다. 입력하는 항목은 아래와 같습니다.

### 공급자 유형
![로그인 설정 작성 화면](../ja/img/login/login_oauth1.png)  

- "서버·각 공급자 설정"에서 (1)의 공급자를 고른 경우에는 그 공급자 이름을 선택하십시오.  

- "서버·각 공급자 설정"에서 (2)(3)의 공급자를 고른 경우에는 "기타"를 선택하십시오.  
"기타"를 선택하면 표시되는 "공급자 이름(영숫자)"에는 Socialite에서 지정된 공급자 유형의 영숫자를 입력하십시오.  
예 Microsoft Graph의 경우: "graph"

![로그인 설정 작성 화면](../ja/img/login/login_oauth2.png)  


### 클라이언트 ID, 클라이언트 시크릿
공급자가 제공한 문자열을 입력하십시오.

### 범위(Scope)
로그인만 한다면 기본적으로 뚜렷한 용도는 없습니다. [액세스 토큰 가져오기](/ko/login_oauth?id=액세스-토큰-가져오기)에서 액세스 토큰을 가져오는 경우에는 설정하는 것을 권장합니다.

### 옵션 설정
선택한 공급자 유형에 맞는 옵션을 설정합니다.
(옵션 설정이 없는 공급자 유형을 선택한 경우에는 표시되지 않습니다.)

#### 공급자 유형이 "기타"인 경우
![옵션 설정](../img/login/login_setting10.png) 

##### 싱글 로그아웃
Exment에서 로그아웃할 때 SSO로 로그인한 공급자에서도 로그아웃합니다. <span class="red">※ 현재 Okta는 지원하지 않습니다.</span>

<!---
  OAuth와 Saml에 같은 내용을 적는다
-->
### 사용자 설정
로그인한 사용자를 어떻게 다룰지 설정합니다.

![사용자 설정](../ja/img/login/login_setting5.png)  

#### 계정 검색 열
SSO로 가져온 계정의 어느 열을 사용하여 Exment 계정을 찾을지 설정합니다.

#### 사용자 새로 만들기
- YES인 경우: 로그인한 사용자가 Exment에 없을 때, 로그인 정보를 사용하여 Exment 사용자를 새로 만듭니다.
- NO인 경우: 먼저 Exment에 사용자를 만들어 두어야 합니다. 로그인한 사용자가 Exment에 없을 때는 오류가 표시됩니다.

#### 역할 그룹 설정
YES인 경우, Exment 사용자를 새로 만들 때 역할 그룹에 연결할 수 있습니다.  

#### 사용자 정보 업데이트
YES인 경우, 다시 로그인했을 때 사용자 이름 등의 사용자 정보를 업데이트합니다.


- 데이터를 1번 이상 저장하면 "활성화" 버튼과 "로그인 테스트" 버튼이 표시됩니다.

- 사용 여부를 YES로 하면 로그인 화면에 SSO 인증용 버튼이 표시됩니다.  
※ 보통은 사용자 ID와 비밀번호를 입력하는 기본 로그인 폼도 함께 표시됩니다. [SSO 설정](/ko/system_setting)에서 이미지처럼 표시하지 않게 할 수도 있습니다.  
![SSO 로그인 화면](../img/quickstart/sso1.png)



### 로그인 버튼 설정
로그인 화면에 표시하는 로그인 버튼을 설정합니다.  
※ 이 설정을 하지 않아도, 위의 "(1) Socialite가 표준으로 제공하는 공급자의 경우"에 있는 공급자는 각각의 형식으로 표시됩니다.

![사용자 설정](../ja/img/login/login_setting6.png)  


### 활성화와 로그인 테스트
- 데이터를 1번 이상 저장하면 "활성화" 버튼과 "로그인 테스트" 버튼이 표시됩니다.

![사용자 설정](../ja/img/login/login_setting7.png)  

#### 활성화
- 활성화를 실행하면 로그인 화면에 SSO 인증용 버튼이 표시됩니다.  
![사용자 설정](../ja/img/login/login_setting8.png)  

#### 로그인 테스트
- "로그인 테스트" 버튼을 클릭하면 설정한 로그인 정보로 로그인을 테스트할 수 있습니다. 로그인 설정을 활성화하지 않았어도 테스트할 수 있습니다.  
**그때는 "테스트용 리디렉션 URL"에 표시된 URL을 공급자의 OAuth 인증 설정의 콜백 URL에 일시적으로 추가하거나, 그 URL로 변경하십시오.**

![사용자 설정](../ja/img/login/login_setting9.png)  


- "로그인" 버튼을 클릭하면 설정이 올바른지 테스트할 수 있습니다.  
결과는 "실행 결과" 항목에 표시됩니다.


### 액세스 토큰 가져오기

- 로그인한 뒤에 액세스 토큰과 리프레시 토큰을 가져오는 경우에는 다음 방법으로 가져오십시오.

~~~ php
use Exceedone\Exment\Services\Login\LoginService;

$access_token = LoginService::getAccessToken();
$refresh_token = LoginService::getRefreshToken();
~~~



## 독자 공급자 작성 방법
(3)의 절차를 진행하는 경우의 자세한 절차입니다. [Socialite Providers](https://socialiteproviders.github.io/)에서 지정된 패키지를 추가합니다.  
또한 아바타를 가져오기 위한 독자 공급자를 만듭니다. (선택)

| 절차 | 필요한지 여부 |
|---|---|
| 공급자 설정·추가 | 필수 |
| 아바타를 가져오기 위한 개발 | 선택 |
| 서비스 프로바이더 추가 | 필수 |
| 옵션 설정 추가 | 공급자에 따라 필수 |
| 화면 설정 실시 | 필수 |

### (필수) 공급자 설정·추가
- 각 공급자에서 Exment용 애플리케이션을 만듭니다.  
※ callback URL은 다음과 같습니다.  
http(s)://(Exment의 URL)/auth/login/(socialite의 provider 이름)/callback  

    - 예 Microsoft Graph의 경우: http(s)://(Exment의 URL)/auth/login/graph/callback

- 다음 명령을 Exment의 루트 디렉터리에서 실행합니다.

~~~
composer require laravel/socialite=~5.1
~~~
※ Exment v7.0.0 이후에서는 "laravel/socialite"가 Exment의 의존 라이브러리로 자동 설치되므로 이 명령을 실행할 필요가 없습니다.

- [Socialite Providers](https://socialiteproviders.github.io/)에서 지정된 패키지를 추가합니다.  

    - 예: Microsoft Graph의 경우

~~~
composer require socialiteproviders/microsoft-graph
~~~

### (선택) 아바타를 가져오기 위한 개발
※ 이 독자 공급자의 작성은 아바타를 가져오기 위한 선택 절차입니다. 아바타를 가져올 필요가 없으면 만들지 않아도 됩니다.

- 아바타를 가져오기 위해, 기존 공급자를 상속한 클래스 2개를 폴더 "app/Socialite"에 만듭니다. ※ 폴더 "app/Socialite"가 없으면 만드십시오.  
첫 번째는 MicrosoftGraphProvider.php입니다. 인터페이스 ProviderAvatar를 implements 하고 getAvatar를 구현합니다.  
getAvatar 메서드에는 아바타를 가져오기 위한 API 처리를 적으십시오. 가져오기 위한 URL이나 엔드포인트는 각 OAuth 공급자에서 확인하십시오.  
아래 예는 Microsoft Graph에서의 절차입니다.

~~~ php
<?php

namespace App\Socialite;

use Exceedone\Exment\Auth\ProviderAvatar;
use SocialiteProviders\Graph\Provider;

class MicrosoftGraphProvider extends Provider implements ProviderAvatar
{
    /**
     * Get avatar stream
     * @param mixed $token
     * @return string
     */
    public function getAvatar($token = null){
        try
        {
            $client = $this->getHttpClient();
            $response = $client->get('https://graph.microsoft.com/v1.0/me/photo/$value', [
                'headers' => [
                    'Authorization' => 'Bearer '.$token,
                    'Content-Type' => 'application/json;odata.metadata=minimal;odata.streaming=true'
                ],
                'http_errors' => false,
            ]);

            if($response->getStatusCode() == 404){
                return null;
            }

            return $response->getBody()->getContents();

        }
        catch (Exception $exception)
        {
            return null;
        }
        return null;
    }
}

~~~ 

- 두 번째는 GraphExtendSocialite.php입니다. 만든 MicrosoftGraphProvider를 지정합니다.

~~~ php
<?php

namespace App\Socialite;

use SocialiteProviders\Manager\SocialiteWasCalled;

class GraphExtendSocialite
{
    /**
     * Execute the provider.
     */
    public function handle(SocialiteWasCalled $socialiteWasCalled)
    {
        $socialiteWasCalled->extendSocialite(
            'graph', __NAMESPACE__.'\MicrosoftGraphProvider'
        );
    }
}

~~~ 

### (필수) 서비스 프로바이더 추가
- 파일 app/Providers/EventServiceProvider.php에 추가한 공급자를 적어 서비스 프로바이더를 추가합니다.  
※ 아바타를 가져오기 위한 독자 개발을 했는지에 따라 적는 내용이 달라집니다.  
또한 "@handle"에 적는 클래스 이름은 대부분 [Socialite Providers](https://socialiteproviders.github.io/)에서 추가한 공급자의 매뉴얼에 적혀 있습니다. 확인하십시오.

~~~ php

// 예: Microsoft Graph의 경우

protected $listen = [
    ///// 아바타를 가져오기 위해 독자 개발을 한 경우
    'App\Events\Event' => [
        'App\Listeners\EventListener',
    ],
    
    /// 추가
    \SocialiteProviders\Manager\SocialiteWasCalled::class => [
        '\App\Socialite\GraphExtendSocialite@handle', ///// 아바타를 가져오기 위해 독자 개발을 한 경우
        // 'SocialiteProviders\\Graph\\GraphExtendSocialite@handle', ///// 보통의 방법으로 가져오는 경우에는 이쪽의 주석을 해제하여 적는다
    ],
];

~~~
~~~php

// 예: EntraID의 경우

protected $listen = [
    // ... other listeners
    \SocialiteProviders\Manager\SocialiteWasCalled::class => [
        // ... other providers
        \SocialiteProviders\Microsoft\MicrosoftExtendSocialite::class.'@handle',
    ],
];

~~~

※ Exment v7.0.0 이후에 새로 설치한 경우(Laravel12로 만든 프로젝트)에는 "app/Providers/EventServiceProvider.php"가 없습니다. 그 경우에는 "app/Providers/AppServiceProvider.php"의 boot 메서드에 아래와 같이 적으십시오.

~~~php

// 예: EntraID의 경우

public function boot(): void
{
    \Illuminate\Support\Facades\Event::listen(
        \SocialiteProviders\Manager\SocialiteWasCalled::class,
        [\SocialiteProviders\Microsoft\MicrosoftExtendSocialite::class, 'handle']
    );
}

~~~


### (공급자에 따라 필수) 옵션 설정 추가
OAuth 로그인 공급자에 따라서는 추가 설정이 필요합니다.  

  
예: [OKTA](https://github.com/SocialiteProviders/Okta)의 경우
- config/services.php를 열고 다음 내용을 추가합니다.

``` php
'okta' => [    
  'base_url' => env('OKTA_BASE_URL'), 
],
```

- .env 파일을 열고 다음 내용을 추가합니다.

```
OKTA_BASE_URL='https://<OKTA의 도메인>'
```

> 원래 Socialite에서는 config/services.php의 "client_id", "client_secret", "redirect" 설정값을 필수로 하고 있으며, Exment의 OAuth 인증에서는 화면에서 설정한 값을 자동으로 넣어 주게 되어 있습니다.  
공급자 고유의 설정값을 입력하고 싶은 경우에는 config/services.php에 위와 같이 값을 추가하십시오.


### (필수) 화면 설정 실시

- 서버 쪽 설정이 모두 끝나면 [화면에서 설정](/ko/login_oauth?id=화면에서-설정)을 진행합니다.

  
  
[←로그인 설정으로 돌아가기](/ko/login_setting)
