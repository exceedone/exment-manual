# (고급 사용자용) 세션·캐시의 드라이버 변경
세션(로그인 상태 등)과 캐시(잠시 보관해 두는 데이터)의 저장 위치를 바꾸는 설정입니다.  
기본으로는 Web 서버 위의 파일에 저장합니다. 다음과 같은 때에 저장 위치를 바꿉니다.

- Redis나 memcached를 써서 빠르게 하고 싶다
- 이중화(서버를 여러 대로 하는 것)를 위해 Web 서버가 아닌 곳에 저장하고 싶다

## 설정 방법

### Redis
세션 관리를 Redis로 할 때의 절차입니다.  
Redis 서버 쪽 절차와 Web 서버 쪽 절차가 있습니다.  
※AWS Redis 등 외부 서비스를 쓸 때는 Redis 서버 쪽 절차는 필요 없습니다. Web 서버 쪽만 설정하십시오.

#### Redis 서버 쪽
> CentOS에서 설정할 때의 절차입니다.

**(1) 다음 명령을 실행합니다.**

~~~
yum -y install epel-release
yum install -y redis
systemctl enable redis
~~~

**(2) 다음 명령을 실행해서 Redis의 설정을 바꿉니다.**

~~~
vi /etc/redis.conf

####bind 부분을 아래와 같이 변경
#bind 127.0.0.1
bind 0.0.0.0
~~~

**(3) 방화벽 설정에서, 접속하는 쪽의 IP 주소에서 오는 Redis 접속만 허용합니다.**

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=6379/tcp
firewall-cmd --zone=from_webserver --add-service=redis
firewall-cmd --reload
~~~

**(4) 서비스를 시작합니다.**

~~~
systemctl start redis.service
~~~

#### Web 서버 쪽
**(1) 다음 명령을 프로젝트의 루트 폴더에서 실행합니다.**

~~~
composer require predis/predis
~~~

**(2) .env 파일을 열고 다음 설정값을 추가·변경합니다.**

~~~
CACHE_STORE=redis #캐시의 저장 위치를 바꾸는 경우. redis로 바꿔 씀(Exment v7.0.0 이후로 새로 설치한 경우)
CACHE_DRIVER=redis #캐시의 저장 위치를 바꾸는 경우. redis로 바꿔 씀(Exment v6.x 이전에서 업데이트한 경우)
SESSION_DRIVER=redis #세션의 저장 위치를 바꾸는 경우. redis로 바꿔 씀
REDIS_CLIENT=predis #위에서 설치한 "predis"를 써서 Redis에 접속한다
REDIS_HOST=127.0.0.1 #redis의 호스트 이름
REDIS_PASSWORD=XXXXXX #redis의 비밀번호. 설정한 경우에만 적음
REDIS_PORT=6379 #redis의 포트 번호. 6379가 아닌 경우에만 적음
~~~

- 캐시 저장 위치의 설정 이름은 "config/cache.php"의 "default"에 적혀 있는 이름을 씁니다.

| 사이트 | 설정 이름 |
| ---- | ---- |
| Exment v7.0.0 이후로 새로 설치한 경우 | "CACHE_STORE" |
| v6.x 이전에서 업데이트한 경우("config/cache.php"가 v6.x 그대로) | "CACHE_DRIVER" |

- "REDIS_CLIENT=predis"를 적지 않으면 PHP의 확장 기능 "phpredis"로 접속하려고 하므로 "Class "Redis" not found" 오류가 납니다.


[←추가 설정 목록으로 돌아가기](/ko/quickstart_more)
