# Linux에 의한 환경 구축
Linux 서버에 Exment를 설치하는 절차입니다.  
웹 서버의 설치부터 시작해서, 아무것도 없는 상태에서 만듭니다.

큰 흐름은 다음과 같습니다.

1. (필요하면) MySQL·Redis를 준비한다
2. 웹 서버에 PHP·Apache·composer를 설치한다
3. Exment의 파일을 두고 권한을 설정한다
4. 브라우저에서 Exment의 초기 설치를 한다

## 환경
이 페이지의 절차는 다음 환경에서 만들었습니다.  
- CentOS Stream
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

## 주의점

- 쓰고 있는 환경이나 버전에 따라서는 이 절차대로 설정할 수 없는 경우가 있습니다. 양해해 주십시오.

- 이 페이지에는 Exment를 Linux에서 움직이기 위한 절차만 적혀 있습니다.  
SSH·데이터베이스 만들기·Linux 명령 등 일반적인 IT 지식은 적혀 있지 않습니다. 양해해 주십시오.  

- **이 절차는 관리자 계정으로 실행하는 것을 전제로 합니다. 관리자 계정이 아닌 사용자가 실행할 때는 명령 앞에 "sudo"를 붙이십시오**.

- 설치에서 오류가 났을 때는 [문제 해결](/ko/troubleshooting)을 보십시오.


## Linux에서의 설치 절차

### MySQL(선택)
필요한 분만 하십시오. MySQL 서버를 따로 만들 때 MySQL을 설치하는 절차입니다.  
※AWS RDS 등 외부 서비스를 쓸 때는 MySQL 서버 쪽 절차는 필요 없습니다.  
※절차는 [MySQL 설치 절차](/ko/install_mysql) 페이지로 옮겼습니다.

### Redis(선택)
※절차는 [세션·캐시의 드라이버 변경](/ko/additional_session_cache_driver) 페이지로 옮겼습니다.

### 웹 서버
- 먼저 지금의 패키지를 최신으로 하고, 필요한 라이브러리를 설치합니다.  

~~~
dnf -y upgrade
dnf install -y wget firewalld unzip git
~~~


- Remi 리포지토리의 구성 패키지와, 그것을 쓰는 데 필요한 EPEL을 설치합니다.

~~~
dnf install epel-release -y
dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm -y
dnf install dnf-utils -y
~~~

- php 패키지에서 쓰는 리포지토리를 바꿉니다.

~~~
dnf module reset php -y
dnf module enable php:remi-8.2 -y
~~~

- 지금 쓰고 있는 PHP 패키지와 쓸 수 있는 PHP 패키지의 목록을 확인합니다.  
remi-8.2에 [e]가 붙어 있으면 됩니다.

~~~
dnf module list php
~~~

- php와 관련 라이브러리를 설치합니다.

~~~
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
~~~

- PHP의 버전이 8.2로 되어 있는지 확인합니다.  

~~~
php -v
~~~

- Apache가 시작되도록 설정합니다.

~~~
dnf install httpd -y
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- 방화벽을 설정합니다.  
※필요한 보안에 맞춰 설정의 내용을 바꾸십시오.

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- 필요하면 SELinux를 끕니다.  
※필요한 보안에 맞춰 설정의 내용을 바꾸십시오.

~~~
vi /etc/selinux/config
# SELINUX=disabled로 수정

setenforce 0
service httpd restart
~~~

- composer를 설치합니다.  

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- php.ini를 필요에 맞춰 고칩니다.  
특히 [PHP 설정값 변경](/ko/additional_php_ini)에 있는 메모리 사용량의 변경·타임아웃 시간 변경 등을 할 때는 이 파일을 고치십시오.

~~~
vi /etc/php.ini
~~~

- httpd.conf를 고칩니다.

~~~
vi /etc/httpd/conf/httpd.conf

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
service httpd restart
~~~

- (권장) 로그인 사용자를 apache 그룹에 추가합니다. 이렇게 하면 로그인 사용자가 exment 폴더 안의 파일을 자유롭게 편집할 수 있습니다. 그룹은 SSH로 다시 접속한 다음에 반영됩니다.  
※아래는 로그인 사용자가 "ec2-user"인 경우입니다.

~~~
usermod -aG apache ec2-user
~~~

- **(MySQL을 같은 서버에 설치하지 않는 경우에만)**  
MySQL을 같은 서버에 설치하지 않을 때도 mysql 명령을 실행할 수 있도록 mysql 클라이언트를 설치해야 합니다.  
※MySQL을 같은 서버에 설치할 때는 이 절차를 건너뛰십시오.

~~~
rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el9-2.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
dnf clean packages
dnf update -y

# 이것을 실행해서 mysql-community-client가 있는지 확인합니다
dnf search mysql-community-client
# 위 명령에서 "Error: Unable to find a match: mysql-community-client"와 같이 없다는 메시지가 나온 경우에는 먼저 아래 명령을 실행하십시오
dnf -y module disable mysql

# mysql-community-client 설치
dnf -y install mysql-community-client
~~~


- Exment를 서버에 둡니다. 최신 Exment 파일을 내려받아 압축을 풉니다.  
※이것은 간편 설치의 절차입니다. 수동 설치일 때는 [수동 설치](/ko/quickstart_manual) 페이지를 보고 두십시오.

~~~
cd /var/www
wget https://exment.net/downloads/en/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- 파일의 권한을 설정합니다. 다음 명령을 실행합니다.

~~~
# 최소한의 권한을 추가한다
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# 아래 명령을 실행해서 폴더의 사용자·그룹 권한을 준다. 1 또는 2를 실시한다  
# ※권한이 모자라는 경우 등은 sudo를 붙이는 등 강한 권한으로 실행하십시오
# 1. 간편 설치의 경우
php artisan exment:setup-dir --easy=1
# 2. 수동 설치의 경우
php artisan exment:setup-dir
~~~

- 가지고 있는 PC의 브라우저에서 만든 웹 서버의 IP 주소를 열고, Exment의 초기 설치를 끝냅니다.

- ※간편 설치로 설치했을 때는 초기 설치가 끝나면 다음 명령을 실행하십시오. 설치할 때만 필요한 권한을 원래대로 되돌립니다.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

