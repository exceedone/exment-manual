# Linux로 환경 구축(CentOS7)
Linux 서버에 Exment를 설치하는 절차입니다.  
Web 서버의 설치부터 시작해서, 아무것도 없는 상태에서 만듭니다.

큰 흐름은 다음과 같습니다.

1. (필요하면) MySQL·Redis를 준비한다
2. Web 서버에 PHP·Apache·composer를 설치한다
3. Exment의 파일을 두고 권한을 설정한다
4. 브라우저에서 Exment의 초기 설치를 한다

## 환경
이 페이지의 절차는 다음 환경에서 만들었습니다.  
- CentOS 7.9.2009 64bit (**현재 8 계열에서는 아래 절차에서 오류가 나는 것을 확인했습니다**. 아래 절차로 설치하는 경우 7 계열에 설치하십시오.)
- Apache 2.4.6
- PHP 8.0.21
- MySQL 5.7.38

## 주의점

- 사용하는 환경이나 버전에 따라서는 이 절차대로 설정할 수 없는 경우가 있습니다. 양해해 주십시오.

- 이 페이지에는 Exment를 Linux에서 움직이기 위한 절차만 적었습니다.  
SSH·데이터베이스 만들기·Linux 명령 등 일반적인 IT 지식은 적지 않았습니다. 양해해 주십시오.  

- **이 절차는 관리자 계정으로 실행하는 것을 전제로 합니다. 관리자 계정이 아닌 사용자가 실행할 때는 명령 앞에 "sudo"를 붙이십시오**.

- 설치에서 오류가 났을 때는 [문제 해결](/ko/troubleshooting)을 참조하십시오.


## Linux에서의 설치 절차

### MySQL(선택)
필요한 분만 하십시오. MySQL 서버를 따로 만들 때 MySQL을 설치하는 절차입니다.  
※AWS RDS 등 외부 서비스를 쓸 때는 MySQL 서버 쪽 절차는 필요 없습니다.  
※절차는 [MySQL 설치 절차](/ko/install_mysql) 페이지로 옮겼습니다.

### Redis(선택)
※절차는 [세션·캐시의 드라이버 변경](/ko/additional_session_cache_driver) 페이지로 옮겼습니다.

### Web 서버
- yum을 업데이트하고 필요한 라이브러리를 설치합니다.  

~~~
yum -y update
yum install -y wget firewalld unzip git
~~~

- epel을 업데이트하고 Remi 리포지토리의 구성 패키지를 설치합니다.  

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
~~~

- yum-utils 패키지를 설치합니다.

~~~
yum install -y yum-utils
~~~

- PHP8.0의 패키지만 활성화합니다.

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- 쓸 수 있는 리포지토리를 확인합니다. "remi-php80"이 표시되면 됩니다.

~~~
yum repolist
~~~

- PHP8.0과 확장 기능을 설치합니다.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- PHP의 버전이 8.0으로 되어 있는지 확인합니다.  

~~~
php -v
~~~

- Apache가 시작되도록 설정합니다.

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- 방화벽을 설정합니다.  
※필요한 보안에 맞추어 설정의 내용을 바꾸십시오.

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- 필요하면 SELinux를 끕니다.  
※필요한 보안에 맞추어 설정의 내용을 바꾸십시오.

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

- php.ini를 필요에 맞게 고칩니다.  
특히 [PHP 설정값 변경](/ko/additional_php_ini)에 있는 메모리 사용량 변경·타임아웃 시간 변경 등을 할 때는 이 파일을 고치십시오.

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

- (권장) 로그인 사용자를 apache 그룹에 추가합니다. 이렇게 하면 로그인 사용자가 exment 폴더 안의 파일을 자유롭게 편집할 수 있습니다. 그룹은 SSH로 다시 접속한 뒤에 반영됩니다.  
※아래는 로그인 사용자가 "ec2-user"인 경우입니다.

~~~
usermod -aG apache ec2-user
~~~

- **(MySQL을 같은 서버에 설치하지 않는 경우에만)**  
MySQL을 같은 서버에 설치하지 않을 때도 mysql 명령을 실행할 수 있도록 mysql 클라이언트를 설치해야 합니다.  
※MySQL을 같은 서버에 설치할 때는 이 절차를 건너뛰십시오.

~~~
rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# 이것을 실행해서 mysql-community-client가 있는지 확인합니다
yum search mysql-community-client
# 위 명령에서 "Error: Unable to find a match: mysql-community-client"처럼 없다는 메시지가 나온 경우에는 먼저 아래 명령을 실행하십시오
yum -y module disable mysql

# mysql-community-client 설치
yum -y install mysql-community-client
~~~

- Exment를 서버에 둡니다. 최신 Exment 파일을 다운로드해서 압축을 풉니다.  
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

# 아래 명령을 실행해서 폴더의 사용자·그룹 권한을 준다. 1 또는 2를 실행한다  
# ※권한이 모자란 경우 등에는 sudo를 붙이는 등 강한 권한으로 실행하십시오
# 1. 간편 설치의 경우
php artisan exment:setup-dir --easy=1
# 2. 수동 설치의 경우
php artisan exment:setup-dir
~~~

- 내 PC의 브라우저에서, 만든 Web 서버의 IP 주소를 열고 Exment의 초기 설치를 끝냅니다.

- ※간편 설치로 설치했을 때는 초기 설치가 끝나면 다음 명령을 실행하십시오. 설치할 때만 필요한 권한을 원래대로 되돌립니다.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~


## PHP 버전을 올릴 때의 대응
PHP의 버전을 바꿀 때는 다음 절차로 버전을 올리십시오.  
※버전을 올리는 작업 중에는 Exment에 접속할 수 없게 됩니다.  
※아래 절차의 예는 PHP7.4에서 PHP8.0으로 업데이트하기 위한 절차입니다.  
※epel과 remi 리포지토리를 써서 PHP를 설치한 것을 전제로 합니다.  
※환경이나 도입 시기, 버전이나 설치 방법에 따라 버전을 올리는 방법은 다를 수 있습니다.  

- 먼저 백업을 받습니다. 아래 명령은 php.ini와, 설치된 패키지·확장 모듈의 메모를 남기기만 하는 최소한의 예입니다. 사용하는 환경에 맞추어 더하거나 빼십시오.  

~~~
# 백업 폴더를 만든다
cd ~
mkdir php-backup && cd php-backup
# 설치된 패키지 정보를 출력한다
yum list installed |grep php > php74-installed.txt
# 확장 모듈의 정보를 출력한다
php -m > php74-modules.txt
# php.ini 파일을 복사(위치가 아래와 다를 때는 미리 "php -i | grep php.ini"로 확인) 
cp /etc/opt/remi/php74/php.ini php74.ini
~~~


- PHP 관련 패키지를 삭제합니다.  

~~~
yum remove php-* -y
yum remove php74-php* -y
yum remove php74-runtime -y
~~~

- epel과 remi의 리포지토리 및 yum 유틸리티를 설치합니다.  
※이미 설치되어 있는 경우에는 "Nothing to do"라고 표시되지만 문제없습니다.   

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
yum -y install yum-utils
~~~

- PHP8.0의 패키지만 활성화합니다.  

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- 쓸 수 있는 리포지토리를 확인합니다. "remi-php80"이 표시되면 됩니다.  

~~~
yum repolist
~~~

- PHP8.0과 확장 기능을 설치합니다.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- PHP의 버전이 8.0으로 되어 있는지 확인합니다.  

~~~
php -v
~~~
