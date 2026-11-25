# (고급 사용자용, 베타 버전) Azure Web Apps로 환경 구축
<span class="red bold">※이 페이지는 Exment v7.0.0보다 앞의 버전(Laravel6, PHP7.4)을 전제로 한 오래된 절차입니다. Exment v7.0.0(PHP8.2 이상, Laravel12)에서는 이 절차 그대로는 설치할 수 없습니다. 설치 절차는 [수동 설치](/ko/quickstart_manual)를 확인하십시오.</span>  
이 페이지에는 Azure Web Apps로 Exment를 구축하는 절차를 적습니다.  
Azure Web Apps와 MySQL을 만들어서 실행하기 위한 절차입니다.

## 주의점

- 사용하는 환경이나 버전 등에 따라 이 절차로는 올바르게 설정할 수 없는 경우가 있습니다. 양해해 주십시오.

- 이 절차에는 Exment를 Azure Web Apps에서 움직이기 위한 절차만 적었습니다.  
Azure Web Apps의 일반적인 IT 지식은 적지 않았습니다. 양해해 주십시오.  

## 절차

### MySQL 만들기
- Azure 포털에서 MySQL을 만듭니다.



### Azure Web Apps
- Azure 포털에서 Azure Web Apps를 만듭니다.  
그다음 Azure의 리소스에 접속합니다.
(이미지 필요)


- 왼쪽 메뉴에서 "확장" → "Composer"를 골라 composer를 설치합니다.

- 왼쪽 메뉴에서 "고급 도구"를 고르고 "이동"을 고릅니다.

- Kudu의 GUI에서 아래 경로로 이동합니다.
D:\home\site

- 아래 명령을 실행합니다.

```
composer create-project laravel/laravel  --prefer-dist . "6.*" 
composer require exceedone/exment
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
```



### VPC
VPC를 아래 설정으로 만듭니다.

- 이름 : 임의 (예 : exment-vpc)
- IPv4 CIDR 블록 : XXX.XXX.0.0/16 (예 : 172.32.0.0/16)
- IPv6 CIDR 블록 : 없음
- 테넌시 : 기본값
- DNS 확인, DNS 호스트 이름이 비활성화되어 있는 경우 각각 "활성화"로 변경

### 서브넷
서브넷을 아래 설정으로 만듭니다.

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
- 만든 뒤, 앞에서 만든 VPC에 연결(attach)

### 라우팅 테이블
- 앞에서 만든 VPC에 라우팅 테이블이 자동으로 만들어져 있습니다.  
Name을 편집할 수 있습니다. (예 : exment-rt)

- 그 라우팅 테이블을 고르고, 페이지 아래 탭의 "라우팅"에서 아래 내용을 추가합니다.
    - 대상(목적지) : 0.0.0.0/0
    - 대상(타깃) : Internet Gateway(위에서 만든 인터넷 게이트웨이)

- 페이지 아래 탭의 "서브넷 연결"에서 퍼블릭 서브넷 A, 퍼블릭 서브넷 B를 추가합니다.


### 보안 그룹
보안 그룹을 아래 설정으로 만듭니다.

#### 보안 그룹-SSH
- 이름 : 임의 (예 : exment-sg-ssh)
- 설명 : 임의 (예 : exment-sg-ssh)
- VPC : 위에서 만든 VPC

■만든 뒤, 인바운드 규칙 추가
- 유형 : SSH
- 포트 : 22
- 소스 : SSH 접속을 하는 IP 주소
- VPC : 위에서 만든 VPC

#### 보안 그룹-SSH 프라이빗
- 이름 : 임의 (예 : exment-sg-ssh-private)
- 설명 : 임의 (예 : exment-sg-ssh-private)
- VPC : 위에서 만든 VPC

■만든 뒤, 인바운드 규칙 추가
- 유형 : SSH
- 포트 : 22
- 소스 :  ("보안 그룹-SSH"의 그룹 ID)
- VPC : 위에서 만든 VPC

#### 보안 그룹-Web
- 이름 : 임의 (예 : exment-sg-web)
- 설명 : 임의 (예 : exment-sg-web)

■만든 뒤, 인바운드 규칙 추가
- 유형 : HTTP
- 포트 : 80
- 소스 : 0.0.0.0/0, ::/0

#### 보안 그룹-MySQL
- 이름 : 임의 (예 : exment-sg-mysql)
- 설명 : 임의 (예 : exment-sg-mysql)

■만든 뒤, 인바운드 규칙 추가
- 유형 : MYSQL/Aurora
- 포트 : 3306
- 소스 : ("보안 그룹-Web"의 그룹 ID)

#### 보안 그룹-Redis
- 이름 : 임의 (예 : exment-sg-redis)
- 설명 : 임의 (예 : exment-sg-redis)

■만든 뒤, 인바운드 규칙 추가
- 유형 : 사용자 지정 TCP 규칙
- 포트 : 6379
- 소스 : ("보안 그룹-Web"의 그룹 ID)


### AWS S3
- AWS S3의 버킷 만들기, IAM 만들기를 합니다.  
※참고: [아주 간단! Laravel에서 S3를 쓰는 절차](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f)(일본어)  
위 URL의 "S3용 IAM 만들기" "Bucket 만들기"를 하십시오  
※버킷은 "첨부 파일용" "백업 파일용" "플러그인용" "템플릿용"의 4종류를 만드십시오


### MySQL
> 이 매뉴얼에는 Amazon RDS를 사용한 MySQL의 생성 설정을 적었지만, 인스턴스를 따로 만들어 MySQL을 설치하고 각 Web 서버에서 접속하는 방법으로도 구축할 수 있습니다.

- 엔진 : MySQL
- 버전 : 5.7.26
- 인스턴스 식별자 : 임의 (예 : exment-db)
- DB 인스턴스 클래스 : 임의 (예 : db.t2.micro)
- 사용자 이름, 비밀번호 : 각자 설정
- Virtual Private Cloud : 앞에서 만든 VPC
- 추가 연결 설정
    - VPC 보안 그룹 : 보안 그룹-MySQL
    - 가용 영역 : 지정 없음


### Redis
> 이 매뉴얼에는 ElastiCache를 사용한 Redis의 생성 설정을 적었지만, 인스턴스를 따로 만들어 Redis를 설치하고 각 Web 서버에서 접속하는 방법으로도 구축할 수 있습니다.

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
EC2 인스턴스를 2종류 만듭니다. (배스천 서버, Web 서버 1대. 2번째 Web 서버는 나중에 복제합니다)

#### 배스천 서버
- AMI : Amazon Linux 2 AMI x86
- 인스턴스 크기 : 임의 (예 : t2.nano)
- 인스턴스 수 : 1
- 네트워크 : 앞에서 만든 VPC
- 서브넷 : 임의
- 퍼블릭 IP 자동 할당 : 활성화
- 태그 : 키-Name, 값-임의 (예 : exment-step)
- 보안 그룹 : 보안 그룹-SSH

#### Web 서버
- AMI : Amazon Linux 2 AMI x86
- 인스턴스 크기 : 임의 (예 : t2.micro)
- 인스턴스 수 : 1
- 네트워크 : 앞에서 만든 VPC
- 서브넷 : 퍼블릭 서브넷 A
- 퍼블릭 IP 자동 할당 : 활성화
- 태그 : 키-Name, 값-임의 (예 : exment-web1)
- 보안 그룹 : 보안 그룹-SSH 프라이빗, 보안 그룹-Web


### Web 서버-A

#### Web 서버-A에 접속
- SSH로 **배스천 서버**에 접속합니다.

- EC2 인스턴스에 접속하는 데 필요한 key(여기서는 "exment_key.pem"이라고 합니다)를 배스천 서버로 전송합니다.

- 아래 명령을 실행해서 SSH 키의 권한을 바꿉니다.

~~~
chmod 700 exment_key.pem
~~~

- 아래 명령을 실행해서 Web 서버 A에 SSH 접속을 합니다.

~~~
ssh -i ~/exment_key.pem ec2-user@(Web 서버 A의 프라이빗 IP 주소)
~~~

#### Web 서버 설정

- 아래 명령을 실행해서 패키지 업데이트, 필요한 소프트웨어의 설치 등을 합니다.

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php7.4
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64
~~~

- 아래 명령을 실행해서 Apache를 시작하고 자동 시작을 설정합니다.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- swap 영역을 만듭니다.

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- php7.4로의 경로를 잡습니다. 명령으로 php7.4를 실행할 수 있게 됩니다.

~~~
sudo ln -s /usr/bin/php74 /usr/bin/php
~~~

- composer를 설치합니다.
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- httpd.conf를 수정합니다.

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

- Exment를 서버에 배치합니다. 최신 Exment 파일을 다운로드해서 압축을 풉니다.  
~~~
cd /var/www
sudo wget https://exment.net/downloads/en/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- 파일의 권한 설정을 합니다. 아래 명령을 실행합니다.

~~~
sudo usermod -a -G apache ec2-user
sudo chmod 2775 /var/www/exment && find /var/www/exment -type d -exec sudo chmod 2775 {} \;
find /var/www -type f -exec sudo chmod 0664 {} \;
sudo chown -R ec2-user:apache /var/www/exment
~~~

- MySQL에 접속해서 데이터베이스를 만듭니다.

~~~
mysql -u (MySQL의 사용자 이름) -p(비밀번호) -h (호스트 이름)
// MySQL 명령으로 실행
create database exment;
~~~

- Redis 접속과 AWS S3 접속을 하기 위해 아래 명령을 실행합니다.

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- .env 파일을 편집합니다.

~~~

# 이미 있는 설정값의 변경
CACHE_STORE=redis #캐시의 저장 위치를 바꾸는 경우. redis로 바꿔 씀
SESSION_DRIVER=redis #캐시의 저장 위치를 바꾸는 경우. redis로 바꿔 씀
REDIS_CLIENT=predis #위에서 설치한 "predis"를 써서 Redis에 접속한다
REDIS_HOST=127.0.0.1 #redis의 호스트 이름
REDIS_PASSWORD=XXXXXX #redis의 비밀번호. 설정한 경우에만 적음
REDIS_PORT=6379 #redis의 포트 번호. 6379가 아닌 경우에만 적음


# 새로 설정값 추가
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID=(S3 액세스 키)
AWS_SECRET_ACCESS_KEY=(S3 시크릿 액세스 키)
AWS_DEFAULT_REGION=(S3 리전. 예: ap-northeast-1)
AWS_BUCKET_EXMENT=(첨부 파일에 쓰는 AWS S3의 버킷)
AWS_BUCKET_BACKUP=(백업에 쓰는 AWS S3의 버킷)
AWS_BUCKET_TEMPLATE=(템플릿에 쓰는 AWS S3의 버킷)
AWS_BUCKET_PLUGIN=(플러그인에 쓰는 AWS S3의 버킷)

# 로드 밸런서를 HTTPS, ELB와 EC2의 통신을 HTTP로 하는 경우
ADMIN_HTTPS=true
~~~

- 내 PC의 브라우저에서, 만든 Web 서버의 IP 주소를 입력하고 Exment의 초기 설치를 끝냅니다.

#### Web 서버 설정을 바꿀 때
- Exment를 업데이트한 뒤나 PHP 파일을 업데이트한 경우, 설정값을 바꾼 경우에는 아래 명령을 실행하십시오.

~~~
sudo systemctl restart php-fpm
~~~


#### Web 서버의 AMI 설정

앞으로의 Web 서버 이중화 등을 위해 Web 서버의 AMI를 만듭니다.

- AWS Console의 EC2 메뉴에서 "작업"→"이미지"→"이미지 생성"을 클릭합니다.

- 이미지 이름 등(예 : exment-ami)을 입력하고 이미지를 만듭니다.

- 몇 분 뒤 왼쪽 메뉴의 "AMI"에 앞에서 설정한 이미지가 만들어져 있습니다.


#### AMI로 Web 서버 B 만들기
- 왼쪽 메뉴의 "AMI"에서 위에서 만든 이미지를 고르고 "시작" 버튼을 클릭합니다.

아래 설정으로 Web 서버를 만듭니다.
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
- 대상 그룹 인스턴스 : 만든 Web 서버 2종류를 고르고 "등록됨"에 추가

설정이 끝나면 로드 밸런서의 DNS를 거쳐 Web 서버에 접속할 수 있게 됩니다.
