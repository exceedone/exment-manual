# API에서 429 오류가 발생할 때
Exment의 API를 호출했을 때, 429 오류(429 Too Many Requests)가 날 수 있습니다.  
이 페이지에서는 그 이유와, 접속 횟수의 상한을 바꾸는 방법을 설명합니다.

- Exment에서는 API 접속 횟수를 사용자별(인증하지 않은 경우는 IP 주소별)로 1분당 60회까지로 제한합니다.
- 상한을 넘으면 429 Too Many Requests 오류가 됩니다.
- 이것은 Exment가 사용하는 프레임워크(Laravel)에서 대량의 요청에 제한을 걸고 있기 때문입니다.

### 설정 절차 
**(1)** 프로젝트 폴더에 있는 ".env" 파일을 엽니다.

**(2)** "EXMENT_API_MAX_RATE_LIMIT"에 1분당 접속 횟수의 상한을 적습니다. 기본값은 60입니다.  
※ 이미 같은 이름의 키가 있으면 그 값을 바꿔 적으십시오.

예: 1분에 120회까지 허용하는 경우

~~~
EXMENT_API_MAX_RATE_LIMIT=120
~~~

**(3)** 설정 캐시를 사용하고 있으면 "php artisan config:cache"를 다시 실행하십시오.

> 설정값의 자세한 내용은 [Exment 설정값 목록](/ko/config)을 확인하십시오.

### 주의점
- **직접 만든 throttle을 적어 둔 경우**: "app/Http/Kernel.php"나 "bootstrap/app.php"에서 api 미들웨어 그룹에 횟수를 직접 지정한 자체 throttle("throttle:60,1" 등)을 설정해 두면, 그쪽이 우선되어 "EXMENT_API_MAX_RATE_LIMIT"는 사용되지 않습니다. "EXMENT_API_MAX_RATE_LIMIT"로 설정하려면 자체 throttle의 기술을 삭제하십시오.
- **v7.0.0 이후**: api 미들웨어 그룹에 throttle 설정이 없으면, Exment가 자동으로 "throttle:api"를 추가합니다. 그래서 "app/Http/Kernel.php"의 throttle 기술을 주석 처리해도 제한은 해제되지 않습니다. 제한을 완화하려면 "EXMENT_API_MAX_RATE_LIMIT"에 큰 값을 설정하십시오.
- **v6.x 이전**: "app/Http/Kernel.php"의 api 미들웨어 그룹에 적혀 있는 "\Illuminate\Routing\Middleware\ThrottleRequests::class.':api'"(Laravel 10의 기본 기술)에 의해 제한이 이루어집니다. Exment가 "throttle:api"를 자동으로 추가하지 않으므로, 이 기술을 주석 처리하면 제한을 해제할 수 있습니다.
- "EXMENT_API_MAX_RATE_LIMIT"는 Exment v6.2.4 이후에서 사용할 수 있습니다.

[←추가 설정 목록으로 돌아가기](/ko/quickstart_more)
