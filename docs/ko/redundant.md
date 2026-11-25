# (상급자용) 이중화
웹 서버를 2대 이상으로 하여 1대가 멈춰도 쓸 수 있게 하는 일(이중화)이 있습니다.  
이 페이지는 Exment를 이중화 구성으로 동작시킬 때의 절차입니다.

할 일은 다음 2가지입니다.

1. 웹 서버를 각각 준비하고 추가 라이브러리를 설치한다
2. `.env` 파일에서 파일을 두는 곳과 세션의 관리 방법을 바꾼다

## 시작하기 전에
이 페이지에서는 다음과 같은 구성을 구축합니다.  


### 이중화할 때 고려할 것
웹 서버가 1대(단일 구성)일 때와 달리, 다음 2가지를 생각해야 합니다.

- **업로드 파일을 웹 서버 이외의 곳에 둔다**  
화면에서 업로드한 파일을 웹 서버에 두면, 다른 1대의 웹 서버에서는 그 파일을 열 수 없습니다.  
그래서 웹 서버와는 다른 곳에 업로드합니다.  
이 페이지에서는 AWS의 S3에 업로드합니다.  

- **세션 관리 방법을 변경한다**  
Laravel의 표준에서는 세션(로그인 상태 등)을 웹 서버에 두는 파일로 관리합니다.  
이중화하면 다른 1대의 웹 서버에 접속했을 때 세션이 없으므로, 로그인 상태가 사라져 버립니다.  
그래서 세션의 관리 방법을 바꿉니다.  
이 페이지에서는 Redis를 씁니다.


## 구축 방법
### 웹 서버 구축
웹 서버를 각각 준비합니다.  
[일반 설치 방법](/ko/quickstart)으로 설치하면 되지만, 다음 2가지만 추가로 하십시오.

#### 추가 라이브러리 설치
composer로 다음 라이브러리를 웹 서버에 설치하십시오.

~~~
# S3
composer require league/flysystem-aws-s3-v3

# Redis
composer require predis/predis
~~~

#### .env 파일 수정
- .env 파일을 열고 다음 설정값을 추가·변경합니다.  

~~~
###파일 업로드 관리
EXMENT_DRIVER_EXMENT=s3 #Exment에서 파일을 업로드하는 곳. s3로 설정
AWS_ACCESS_KEY_ID=XXXXXX #AWS S3의 액세스 키
AWS_SECRET_ACCESS_KEY=XXXXXX #AWS S3의 시크릿 키
AWS_DEFAULT_REGION=ap-northeast-1 #AWS S3의 리전
AWS_BUCKET=XXXXXX #AWS S3의 버킷 이름

###세션 관리
SESSION_DRIVER=redis #redis로 바꿔 쓴다
REDIS_HOST=127.0.0.1 #redis의 호스트 이름
REDIS_PASSWORD=XXXXXX #redis의 비밀번호
REDIS_PORT=6379 #redis의 포트 번호
~~~
