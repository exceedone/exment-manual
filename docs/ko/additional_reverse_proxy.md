# 리버스 프록시를 쓰는 경우의 설정
Exment 서버 앞에 리버스 프록시(Web 요청을 먼저 받아서 Web 서버로 넘기는 서버)를 두었을 때의 설정입니다.  
Exment 쪽 설정과 리버스 프록시 서버 쪽 설정, 2가지를 합니다.

> 이 절차는 v3.7.2부터 일부를 고쳤습니다.

## 시작하기 전에
클라우드 서비스의 로드 밸런서 등, Web 요청을 받는 서버(서비스. 이하 리버스 프록시 서버)와 Web 서버가 따로 있는 경우가 있습니다.  
특히 다음과 같이 설정하는 경우가 있습니다.  

- 인터넷에서 리버스 프록시 서버까지의 통신 : HTTPS 통신
- 리버스 프록시 서버에서 Web 서버까지의 통신 : HTTP 통신

![리버스 프록시](../img/quickstart/reverse_proxy1.png)


이런 구성으로 할 때 필요한 리버스 프록시 서버와 Exment의 추가 설정을 아래에 적습니다.  



### 설정 절차 - Exment

- .env 파일을 고칩니다.

~~~
# (이미 있는 값에 덧붙임) 리버스 프록시 서버까지의 URL. "admin"은 필요 없음
APP_URL=https://XXXX.com 

# 인터넷⇔리버스 프록시 서버를 HTTPS, 리버스 프록시 서버⇔Web 서버의 통신을 HTTP로 하는 경우에 새로 추가한다
ADMIN_HTTPS=true

# 위의 "APP_URL" 값을 URL 생성에 사용한다
ADMIN_USE_APP_URL=true

# Proxy를 허용할 리버스 프록시 서버의 IP 주소. IP 주소가 여러 개일 수 있으면 쉼표로 구분
# ※IP가 정해져 있지 않은 경우나, 존 설정으로 리버스 프록시 서버 외에는 접속이 없는 경우 등은 "*"로 지정할 수도 있음
ADMIN_TRUST_PROXY_IPS=172.0.1.1,172.0.1.2
#ADMIN_TRUST_PROXY_IPS=*

# AWS ELB인 경우 아래 값을 추가한다
ADMIN_TRUST_PROXY_HEADERS=HEADER_X_FORWARDED_AWS_ELB
~~~

- [SAML 인증](/ko/login_saml)을 쓰고 있을 때는 "옵션 설정"에서 "프록시 사용"을 YES로 하십시오.
![리버스 프록시](../img/quickstart/reverse_proxy2.png)


### 설정 절차 - 리버스 프록시 서버

- 리버스 프록시 서버(로드 밸런서, Nginx 등)에서 Web 서버로 전달할 때 다음 헤더를 붙여야 합니다.  
헤더가 붙어 있는지 확인하십시오.  
※이것들은 리버스 프록시 서버까지의 접속 정보를 전하는 헤더입니다. Web 서버 쪽에서 읽어서 씁니다.  
    - X-Forwarded-Host : 리버스 프록시 서버의 호스트 이름
    - X-Forwarded-For : 클라이언트의 IP 주소
    - X-Forwarded-Proto : http 또는 https
    - X-Forwarded-Port : 리버스 프록시 서버까지의 포트

- 예: nginx의 경우

```
    location / {
        proxy_set_header X-Forwarded-Host localhost;
        proxy_set_header X-Forwarded-For XXXX;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Port 10443;
    }
```

- ※확인을 위해 요청의 값과 헤더의 값을 출력하고 싶을 때는 루트 폴더의 ".env"에 다음 줄을 더합니다. storage/logs/laravel.log에 나옵니다.

```
EXMENT_DEBUG_MODE_REQUEST=1
```


[←추가 설정 목록으로 돌아가기](/ko/quickstart_more)
