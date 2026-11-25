# (상급자용, 베타 버전) AWS에 의한 환경 구축 - 이중화 구성
AWS의 Amazon Linux2에 Exment를 설치하는 절차입니다.  
웹 서버의 설치부터 시작해서, 아무것도 없는 상태에서 만듭니다.  
이 절차는 **웹 서버를 이중화한(여러 대로 한) 구성**입니다.  
※단순한 1대 구성은 [AWS에 의한 환경 구축 - 단일 구성](/ko/install_aws_single)을 보십시오.

큰 흐름은 다음과 같습니다.

1. 네트워크를 만든다(VPC·서브넷·인터넷 게이트웨이·라우팅 테이블·보안 그룹)
2. 저장 위치를 만든다(AWS S3·MySQL·Redis)
3. EC2를 만들고 웹 서버 A에 Exment를 설치한다
4. 웹 서버 A의 AMI에서 웹 서버 B를 만든다
5. 로드 밸런서(Amazon Elastic Load Balancing)를 만든다

## 환경
이 페이지의 절차는 다음 구성으로 만들었습니다.
- VPC
- 서브넷
    - 퍼블릭 A
    - 퍼블릭 B
- 라우팅 테이블
- 인터넷 게이트웨이
- 보안 그룹
- Amazon S3
- Amazon RDS
    - MySQL 8.4.x
- Amazon ElastiCache
    - Redis 5.0.5
- Amazon Linux2-A
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 8.2.x
- Amazon Linux2-B
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 8.2.x
- Amazon Linux2-배스천
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
- Amazon Elastic Load Balancing
    - Application Load Balancer


## 주의점

- 쓰고 있는 환경이나 버전에 따라서는 이 절차대로 설정할 수 없는 경우가 있습니다. 양해해 주십시오.

- 이 페이지에는 Exment를 Linux에서 움직이기 위한 절차만 적혀 있습니다.  
AWS·SSH·데이터베이스 만들기·Linux 명령 등 일반적인 IT 지식은 적혀 있지 않습니다. 양해해 주십시오.

- **이 절차는 관리자 계정으로 실행하는 것을 전제로 합니다. 관리자 계정이 아닌 사용자가 실행할 때는 명령 앞에 "sudo"를 붙이십시오**.

- 설치에서 오류가 났을 때는 [문제 해결](/ko/troubleshooting)을 보십시오.

- 이 절차는 [AWS 자습서](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html#setting-file-permissions-2)(영어)를 바탕으로 만들었습니다.

## 절차

### VPC
VPC를 다음 설정으로 만듭니다.

- 이름 : 임의 (예 : exment-vpc)
- IPv4 CIDR 블록 : XXX.XXX.0.0/16 (예 : 172.32.0.0/16)
- IPv6 CIDR 블록 : 없음
- 테넌시 : 기본값
- DNS 확인, DNS 호스트 이름이 꺼져 있는 경우, 각각 "활성화"로 변경

### 서브넷
서브넷을 다음 설정으로 만듭니다.

#### 퍼블릭 서브넷 A
- 이름 : 임의 (예 : exment-subnet-public1)
- VPC : 위에서 만든 VPC
- 가용 영역 : ap-northeast-1a
- IPv4 CIDR 블록 : XXX.XXX.1.0/24 (예 : 172.32.1.0/24)

#### 퍼블릭 서브넷 B
- 이름 : 임의 (예 : exment-subnet-public2)
- VPC : 위에서 만든 VPC
- 가용 영역 : ap-northeast-1c
- IPv4 CIDR 블록 : XXX.XXX.2.0/24 (예 : 172.32.2.0/24)


### 인터넷 게이트웨이
- 이름 : 임의 (예 : exment-igw)
- 만든 다음, 앞에서 만든 VPC에 연결

### 라우팅 테이블
- 앞에서 만든 VPC에 라우팅 테이블이 자동으로 만들어져 있습니다.  
Name은 편집할 수 있습니다. (예 : exment-rt)

- 그 라우팅 테이블을 고르고, 페이지 아래 탭의 "라우팅"에서 다음 내용을 추가합니다.
    - 대상 : 0.0.0.0/0
    - 대상(타깃) : Internet Gateway(위에서 만든 인터넷 게이트웨이)

- 페이지 아래 탭의 "서브넷 연결"에서 퍼블릭 서브넷 A, 퍼블릭 서브넷 B를 추가합니다.


### 보안 그룹
보안 그룹을 다음 설정으로 만듭니다.

#### 보안 그룹-SSH
- 이름 : 임의 (예 : exment-sg-ssh)
- 설명 : 임의 (예 : exment-sg-ssh)
- VPC : 위에서 만든 VPC

■만든 다음, 인바운드 규칙 추가
- 유형 : SSH
- 포트 : 22
- 소스 : SSH 접속을 하는 IP 주소
- VPC : 위에서 만든 VPC

#### 보안 그룹-SSH 프라이빗
- 이름 : 임의 (예 : exment-sg-ssh-private)
- 설명 : 임의 (예 : exment-sg-ssh-private)
- VPC : 위에서 만든 VPC

■만든 다음, 인바운드 규칙 추가
- 유형 : SSH
- 포트 : 22
- 소스 :  ("보안 그룹-SSH"의 그룹 ID)
- VPC : 위에서 만든 VPC

#### 보안 그룹-Web
- 이름 : 임의 (예 : exment-sg-web)
- 설명 : 임의 (예 : exment-sg-web)

■만든 다음, 인바운드 규칙 추가
- 유형 : HTTP
- 포트 : 80
- 소스 : 0.0.0.0/0, ::/0

#### 보안 그룹-MySQL
- 이름 : 임의 (예 : exment-sg-mysql)
- 설명 : 임의 (예 : exment-sg-mysql)

■만든 다음, 인바운드 규칙 추가
- 유형 : MYSQL/Aurora
- 포트 : 3306
- 소스 : ("보안 그룹-Web"의 그룹 ID)

#### 보안 그룹-Redis
- 이름 : 임의 (예 : exment-sg-redis)
- 설명 : 임의 (예 : exment-sg-redis)

■만든 다음, 인바운드 규칙 추가
- 유형 : 사용자 지정 TCP 규칙
- 포트 : 6379
- 소스 : ("보안 그룹-Web"의 그룹 ID)


### AWS S3
- AWS S3의 버킷과 IAM을 만듭니다.  
※참고: [아주 쉽다! Laravel에서 S3를 쓰는 절차](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f)(일본어)  
위 URL의 "S3용 IAM 만들기" "Bucket 만들기"를 하십시오.  
※버킷은 "첨부 파일용" "백업 파일용" "플러그인용" "템플릿용"의 4종류를 만드십시오.


### MySQL
> 여기서는 Amazon RDS로 MySQL을 만들 때의 설정을 적었습니다. 인스턴스를 따로 만들어 MySQL을 설치하고, 각 웹 서버에서 접속하는 방법으로도 만들 수 있습니다.  
MySQL을 서버에 설치하는 방법은 [MySQL 설치 절차](/ko/install_mysql)를 보십시오.

- 엔진 : MySQL
- 버전 : 8.0.x
- 인스턴스 식별자 : 임의 (예 : exment-db)
- DB 인스턴스 클래스 : 임의 (예 : db.t2.micro)
- 사용자 이름, 비밀번호 : 각자 설정
- Virtual Private Cloud : 앞에서 만든 VPC
- 추가 연결 설정
    - VPC 보안 그룹 : 보안 그룹-MySQL
    - 가용 영역 : 지정 없음


### Redis
> 여기서는 ElastiCache로 Redis를 만들 때의 설정을 적었습니다. 인스턴스를 따로 만들어 Redis를 설치하고, 각 웹 서버에서 접속하는 방법으로도 만들 수 있습니다.  
※Redis를 서버에 설치하는 방법은 [세션·캐시의 드라이버 변경](/ko/additional_session_cache_driver) 페이지로 옮겼습니다.

- 클러스터 엔진 : Redis
- 이름 : 임의 (예 : exment-redis)
- 엔진 버전 호환성 : 5.0.5
- 포트 : 6379
- 노드 유형 : 임의 (예 : cache.t2.micro)
- 서브넷 그룹 : 새로 만들기
    - 이름 : 임의 (예 : exment-redis-subnet)
    - VPC : 앞에서 만든 VPC
    - 서브넷 : 모든 정보를 입력
- 보안 그룹 : 보안 그룹-Redis


### EC2
EC2 인스턴스를 2종류 만듭니다. (배스천 서버와 웹 서버 1대. 2대째 웹 서버는 나중에 복제합니다)  
배스천 서버는 웹 서버에 SSH로 접속할 때 먼저 접속하는 서버입니다.

#### 배스천 서버
- AMI : Amazon Linux 2 AMI x86
- 인스턴스 크기 : 임의 (예 : t2.nano)
- 인스턴스 수 : 1
- 네트워크 : 앞에서 만든 VPC
- 서브넷 : 임의
- 퍼블릭 IP 자동 할당 : 활성화
- 태그 : 키-Name, 값-임의 (예 : exment-step)
- 보안 그룹 : 보안 그룹-SSH

#### 웹 서버
- AMI : Amazon Linux 2 AMI x86
- 인스턴스 크기 : 임의 (예 : t2.micro)
- 인스턴스 수 : 1
- 네트워크 : 앞에서 만든 VPC
- 서브넷 : 퍼블릭 서브넷 A
- 퍼블릭 IP 자동 할당 : 활성화
- 태그 : 키-Name, 값-임의 (예 : exment-web1)
- 보안 그룹 : 보안 그룹-SSH 프라이빗, 보안 그룹-Web


### 웹 서버-A

#### 웹 서버-A에 접속
- SSH로 **배스천 서버**에 접속합니다.

- EC2 인스턴스에 접속하는 데 필요한 key(여기서는 "exment_key.pem"이라고 합니다)를 배스천 서버로 보냅니다.

- 다음 명령을 실행해서 SSH 키의 권한을 바꿉니다.

~~~
chmod 700 exment_key.pem
~~~

- 다음 명령을 실행해서 웹 서버 A에 SSH로 접속합니다.

~~~
ssh -i ~/exment_key.pem ec2-user@(웹 서버 A의 프라이빗 IP 주소)
~~~

#### 웹 서버 설정

- 다음 명령을 실행해서 패키지를 최신으로 하고, 필요한 소프트웨어를 설치합니다.

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php8.2
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- 다음 명령을 실행해서 Apache를 시작하고, 자동으로 시작하도록 설정합니다.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- swap 영역(메모리가 모자랄 때 쓰는 디스크의 영역)을 만듭니다.

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- composer를 설치합니다.
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- httpd.conf를 고칩니다.

~~~
sudo vi /etc/httpd/conf/httpd.conf

# 아래 내용을 끝에 추가

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
~~~

- apache를 다시 시작합니다.
~~~
sudo systemctl restart httpd
~~~

- 파일의 권한 설정을 합니다. 아래 명령을 실행합니다.

~~~
# ec2-user 사용자를 apache 그룹에 추가한다
sudo usermod -a -G apache ec2-user
~~~

- Exment를 서버에 둡니다. 최신 Exment 파일을 내려받아 압축을 풉니다.  
※이것은 간편 설치의 절차입니다. 수동 설치일 때는 [수동 설치](/ko/quickstart_manual) 페이지를 보고 두십시오.

~~~
cd /var/www
sudo wget https://exment.net/downloads/en/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- 파일의 권한 설정을 합니다. 아래 명령을 실행합니다.

~~~
# 최소한의 권한을 추가한다
sudo chmod 0775 /var/www/exment
sudo chown -R ec2-user:apache /var/www/exment

# 아래 명령을 실행해서 폴더의 권한을 준다. 1 또는 2를 실시한다
# 1. 간편 설치의 경우
sudo php artisan exment:setup-dir --easy=1
# 2. 수동 설치의 경우
sudo php artisan exment:setup-dir
~~~

- Redis와 AWS S3에 접속하기 위해 다음 명령을 실행합니다.

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- .env 파일을 고칩니다.

~~~

# 이미 있는 설정값의 변경
CACHE_STORE=redis #캐시의 저장 위치를 변경하는 경우. redis로 바꿔 쓴다
SESSION_DRIVER=redis #세션의 저장 위치를 변경하는 경우. redis로 바꿔 쓴다
REDIS_CLIENT=predis #위에서 설치한 "predis"를 써서 Redis에 접속한다
REDIS_HOST=127.0.0.1 #redis의 호스트 이름
REDIS_PASSWORD=XXXXXX #redis의 비밀번호. 설정한 경우에만 적는다
REDIS_PORT=6379 #redis의 포트 번호. 6379가 아닌 경우에만 적는다


# 새로 설정값 추가
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID=(S3 액세스 키)
AWS_SECRET_ACCESS_KEY=(S3 시크릿 액세스 키)
AWS_DEFAULT_REGION=(S3 리전. 예: ap-northeast-1)
AWS_BUCKET_EXMENT=(첨부 파일에서 쓰는 AWS S3의 버킷)
AWS_BUCKET_BACKUP=(백업에서 쓰는 AWS S3의 버킷)
AWS_BUCKET_TEMPLATE=(템플릿에서 쓰는 AWS S3의 버킷)
AWS_BUCKET_PLUGIN=(플러그인에서 쓰는 AWS S3의 버킷)

# 로드 밸런서를 HTTPS, ELB와 EC2의 통신을 HTTP로 하는 경우
ADMIN_HTTPS=true
~~~

- 가지고 있는 PC의 브라우저에서 만든 웹 서버의 IP 주소를 열고, Exment의 초기 설치를 끝냅니다.

- ※간편 설치로 설치했을 때는 초기 설치가 끝나면 다음 명령을 실행하십시오. 설치할 때만 필요한 권한을 원래대로 되돌립니다.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

#### 웹 서버 설정을 변경할 때
- Exment를 업데이트했을 때, PHP 파일을 업데이트했을 때, 설정값을 바꿨을 때는 다음 명령을 실행하십시오.

~~~
sudo systemctl restart php-fpm
~~~


#### 웹 서버의 AMI 설정

웹 서버를 이중화할 때 등을 위해 웹 서버의 AMI(서버의 이미지)를 만듭니다.

- AWS Console의 EC2 메뉴에서 "작업"→"이미지"→"이미지 생성"을 클릭합니다.

- 이미지 이름 등(예 : exment-ami)을 입력하고 이미지를 만듭니다.

- 몇 분이 지나면 왼쪽 메뉴의 "AMI"에 방금 만든 이미지가 생겨 있습니다.


#### AMI에서 웹 서버 B 만들기
- 왼쪽 메뉴의 "AMI"에서 위에서 만든 이미지를 고르고 "시작" 버튼을 클릭합니다.

다음 설정으로 웹 서버를 만듭니다.
  - 인스턴스 크기 : 임의 (예 : t2.micro)
  - 인스턴스 수 : 1
  - 네트워크 : 앞에서 만든 VPC
  - 서브넷 : 퍼블릭 서브넷 B
  - 퍼블릭 IP 자동 할당 : 활성화
  - 태그 : 키-Name, 값-임의 (예 : exment-web2)
  - 보안 그룹 : 보안 그룹-SSH 프라이빗, 보안 그룹-Web


### Amazon Elastic Load Balancing
- 로드 밸런서의 종류 : Application Load Balancer
- 이름 : 임의 (예 : exment-alb)
- 리스너 : HTTP 또는 HTTPS
- VPC : 만든 VPC
- 가용 영역 : 모두 선택
- 보안 그룹 : 보안 그룹-Web
- 대상 그룹 : 임의 (예 : exment-alb-tg)
- 대상 그룹 인스턴스 : 만든 웹 서버 2종류를 고르고 "등록됨"에 추가

설정이 끝나면 로드 밸런서의 DNS를 통해 웹 서버에 접속할 수 있게 됩니다.


### 기타
Amazon Elastic Load Balancing에서 리버스 프록시 설정으로 되어 있을 때는 다음 페이지의 절차를 보고 설정하십시오.  
[리버스 프록시를 쓰는 경우의 설정](/ko/additional_reverse_proxy)


## PHP 버전을 올릴 때의 대응
[AWS에 의한 환경 구축 - 단일 구성](/ko/install_aws_single)의 "PHP 버전을 올릴 때의 대응"으로 옮겼습니다.
