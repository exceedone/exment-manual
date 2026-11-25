# 설치 절차(수동 설치)
Exment를 명령으로 하나씩 수동으로 설치하는 절차입니다.  
※이 페이지는 Exment v7.0.0 이후의 설치 절차입니다. Exment v6.x 이전(Laravel10.X, 관리 화면 라이브러리는 laravel-admin)에서는 Laravel의 버전이나 설치하는 패키지 등이 다릅니다. v6.x와 v7.0.0의 차이는 [업데이트 절차 v7.0.0](/update/v7_0_0)(영어)을 확인하십시오.  

## 설치의 흐름
1. **서버를 준비한다**(웹 서버와 데이터베이스)
2. **Laravel의 프로젝트를 만든다**
3. **`.env`를 바꾼다**(데이터베이스, 언어, 시간대 등)
4. **Exment를 설치한다**
5. **명령을 실행한다**
6. **초기 설정을 한다**

<span class="red bold">3의 `.env` 변경은 반드시 4의 앞에 하십시오.</span>

## 주의점
- 설치에서 오류가 나온 경우는 [문제 해결](/ko/troubleshooting)을 참조하십시오.
- ※현재 대단히 죄송하지만, 설치 절차나 서버 구축에 대한 개별 문의는 받지 않고 있습니다. 개별 대응을 원하는 경우는 유상 지원을 신청하십시오.　　

## 서버 구축
서버를 아직 만들지 않은 경우는 웹 서버와 데이터베이스 서버를 준비하십시오.  
만드는 방법은 [여기](/ko/server)를 확인하십시오.


## Exment 앱 설정
서버의 준비가 되면 Exment 앱의 설정을 합니다.

### Laravel 설치(프로젝트 만들기)
- 명령줄에서 다음 명령을 실행합니다.  
※만든 프로젝트의 폴더를 이 매뉴얼에서는 "루트 디렉터리"라고 부릅니다.  
※Exment는 현재 Laravel의 버전 12.X만 지원합니다. 그 밖의 버전으로는 설치하지 않도록 부탁드립니다.  

~~~
composer create-project "laravel/laravel=12.*" (프로젝트 이름)
cd (프로젝트 이름)
~~~


### .env 변경

".env"를 열고 아래의 내용을 추가·변경합니다.

- <span class="red bold">.env의 변경은 다음의 "Exment 설치" 앞에 하십시오.</span>Laravel12의 초기 설정에서는 데이터베이스가 "sqlite"로 되어 있습니다. 변경하기 전에 Exment를 설치하면 오류가 표시됩니다.
- <span class="red bold">특히 아래의 값을 확인하십시오.</span>

| 항목 | 설명 |
|---|---|
| DB_CONNECTION | 사용하는 데이터베이스가 MySQL인지, MariaDB인지, SQL Server인지에 따라 값이 다릅니다 |
| APP_TIMEZONE, APP_LOCALE | 언어와 시간대입니다. 설치하기 전에 값을 넣으십시오 |
| SESSION_DRIVER, CACHE_STORE, QUEUE_CONNECTION | 세션·캐시·큐의 설정입니다. 아래의 값으로 바꾸십시오(이유는 바로 아래를 보십시오) |

- Laravel12에서는 세션·캐시·큐의 초기값이 "database"로 되어 있습니다. 이대로 두면 설치하기 전에 화면을 열었을 때 오류가 나옵니다. 또한 메일 전송 등의 알림이 큐에 쌓인 채 실행되지 않습니다.
- v6.x 이전(Laravel10)과 같은 동작으로 하기 위해 아래의 값으로 바꾸십시오. 큐를 쓰는 경우는 [알림 처리의 지연 실행](/ko/additional_queue)을 참조하십시오.

~~~
# 아래는 필수 설정 항목 --------------------
#기본 설정
APP_URL=http://XXXX.com #그 사이트에 접속하는 URL. "admin"은 필요 없음

# 데이터베이스의 설정값 변경
# MySQL의 경우 아래의 설정값(기본값입니다)
DB_CONNECTION=mysql
# MariaDB의 경우 아래의 설정값으로 고칩니다
DB_CONNECTION=mariadb
# SQL Server의 경우 아래의 설정값으로 고칩니다
DB_CONNECTION=sqlsrv

DB_HOST=127.0.0.1 #데이터베이스의 호스트 이름
DB_PORT=3306 #데이터베이스의 포트 번호
DB_DATABASE=homestead #Exment용 데이터베이스 이름
DB_USERNAME=homestead #Exment용 데이터베이스의 사용자 이름
DB_PASSWORD=secret #Exment용 데이터베이스의 비밀번호

# 언어와 시간대의 설정(예는 일본어와 일본 시간). 복사·붙여넣기로 설정한다
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja

# 세션·캐시·큐의 설정. Laravel12의 초기값(database)에서 변경합니다
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync


# 아래는 임의 설정 항목 --------------------

# https 통신의 경우에 추가
ADMIN_HTTPS=true

# 비밀번호 해시화(bcrypt)의 계산 비용(라운드 수). 임의 설정이며 기본값은 12입니다.
# OWASP는 10 이상을 권장합니다. 기본값을 바꾸고 싶은 경우에만 설정하십시오.
# 다른 비용으로 해시화된 비밀번호는 사용자가 다음에 로그인했을 때 자동으로 다시 해시됩니다.
# https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
BCRYPT_ROUNDS=12
~~~


### Exment 설치
- 루트 디렉터리에서 다음 명령을 실행합니다.  
※관리 화면 라이브러리 "exceedone/exment-admin-core"는 Exment의 의존 라이브러리로 자동으로 설치됩니다. 따로 설치할 필요는 없습니다.

~~~
composer config --no-plugins allow-plugins.kylekatarnls/update-helper true
composer require exceedone/exment=^7.0 -W

# Exment의 버전을 지정하고 싶은 경우는 대신 아래를 실행. 예: v7.0.0
composer require exceedone/exment=7.0.0 -W
~~~


### 명령 실행
- 다음 명령을 실행합니다.

~~~
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
php artisan passport:keys
php artisan exment:install
~~~

## 설정 완료
설치가 끝나면 이어서 [초기 설정](/ko/first_setting)을 하십시오.  


## 그 밖의 추가 설정
여기까지의 작업으로 Exment를 쓰기 시작할 수 있습니다. 다만 일부 기능을 쓰려면 추가 설정이 필요한 경우가 있습니다.  
다음 링크를 확인하십시오.  
- [추가 설정](/ko/quickstart_more)



[←설치-개요로 돌아가기](/ko/quickstart)
