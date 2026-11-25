# 설치할 때 오류가 발생하면
서버 환경이나 버전에 따라, 설치할 때 등에 오류가 날 수 있습니다.  
이 페이지에서는 오류별로 조치 방법을 정리했습니다.  

## 명령 "php artisan exment:install" 실행 시 오류가 발생한 경우
명령 "php artisan exment:install"을 실행했을 때, 다음과 같은 오류가 날 수 있습니다.

~~~
 Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access
 violation: 1071 Specified key was too long; max key length is 767 bytes (SQL: alter table `users` add unique `users_email_unique`(`email`))
~~~

- 원인: MySQL 버전이 5.7.7 미만일 때 발생합니다.
- 조치: MySQL 버전을 8.0 이상으로 업데이트하십시오.

## 처음 설치한 후 관리 화면에 접속할 때 "SQLSTATE[HY000][202] Permission denied" 오류가 발생한다
Apache에서 MySQL에 접속할 때, SELinux(Linux의 보안 기능)의 설정이 필요할 수 있습니다.  
이 오류가 나면 다음 명령을 실행하십시오.

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


## 임대 서버에서 "composer require" 등의 명령을 실행할 때 "Killed"라고 표시된다
메모리에 부하가 걸렸을 때 가끔 일어납니다(항상 일어나는 것은 아닙니다).  
이 표시가 나오면, 명령 앞에 "nice -n 20"을 붙여서 composer를 실행하십시오. 우선순위를 낮추어 명령을 실행합니다.

~~~
nice -n 20 composer .....
~~~

※ 이 방법으로 실행해도 다시 "Killed"라고 표시될 수 있습니다. 양해해 주십시오.
