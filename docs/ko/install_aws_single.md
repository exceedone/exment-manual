# AWS로 환경 구축 - 단일 구성
AWS의 Amazon Linux2에 Exment를 설치하는 절차입니다.  
Web 서버의 설치부터 시작해서, 아무것도 없는 상태에서 만듭니다.  
이 절차는 **단순한, Web 서버 1대의 구성**입니다.  
※이중화한(Web 서버를 여러 대로 한) AWS 구성은 [AWS로 환경 구축 - 이중화 구성](/ko/install_aws)을 참조하십시오.

## 환경
이 페이지의 절차는 다음 환경에서 만들었습니다.
- Amazon Linux 2
- Apache 2.4.53
- PHP 8.2.x
- MySQL 8.4.x


## 주의점

- 사용하는 환경이나 버전에 따라서는 이 절차대로 설정할 수 없는 경우가 있습니다. 양해해 주십시오.

- 이 페이지에는 Exment를 Linux에서 움직이기 위한 절차만 적었습니다.  
SSH·데이터베이스 만들기·Linux 명령 등 일반적인 IT 지식은 적지 않았습니다. 양해해 주십시오.

- 설치에서 오류가 났을 때는 [문제 해결](/ko/troubleshooting)을 참조하십시오.


## Linux에서의 설치 절차

### MySQL(선택)
필요한 분만 하십시오. MySQL 서버를 따로 만들 때 MySQL을 설치하는 절차입니다.  
※AWS RDS 등 외부 서비스를 쓸 때는 MySQL 서버 쪽 절차는 필요 없습니다.  
※절차는 [MySQL 설치 절차](/ko/install_mysql) 페이지로 옮겼습니다.

### Redis(선택)
※절차는 [세션·캐시의 드라이버 변경](/ko/additional_session_cache_driver) 페이지로 옮겼습니다.


### Web 서버

- 먼저 패키지를 최신으로 합니다.

~~~
sudo yum -y update
~~~

- 설치할 수 있는 PHP의 버전을 확인합니다.  
※PHP8.2 이외의 버전이 활성화(enabled)되어 있을 때는 비활성화해 두십시오.

~~~
sudo amazon-linux-extras | grep php
~~~

- "php8.2"가 있는 것을 확인했으면 설치합니다.

~~~
sudo amazon-linux-extras install -y php8.2
~~~

- 그 밖에 필요한 라이브러리를 설치합니다.

~~~
sudo yum install -y httpd git
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

- php.ini를 필요에 맞게 고칩니다.  
특히 [PHP 설정값 변경](/ko/additional_php_ini)에 있는 메모리 사용량 변경·타임아웃 시간 변경 등을 할 때는 이 파일을 고치십시오.

~~~
sudo vi /etc/php.ini
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

- **(MySQL을 같은 서버에 설치하지 않는 경우에만)**  
MySQL을 같은 서버에 설치하지 않을 때도 mysql 명령을 실행할 수 있도록 mysql 클라이언트를 설치해야 합니다.  
※MySQL을 같은 서버에 설치할 때는 이 절차를 건너뛰십시오.

~~~
sudo rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el7-2.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# 이것을 실행해서 mysql-community-client가 있는지 확인합니다
sudo yum search mysql-community-client
# 위 명령에서 "Error: Unable to find a match: mysql-community-client"처럼 없다는 메시지가 나온 경우에는 먼저 아래 명령을 실행하십시오
sudo yum -y module disable mysql

# mysql-community-client 설치
sudo yum -y install mysql-community-client
~~~

- Exment를 서버에 둡니다. 최신 Exment 파일을 다운로드해서 압축을 풉니다.  
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
sudo setfacl -m u:apache:rwx -R /var/www/exment

# 아래 명령을 실행해서 폴더의 권한을 준다. 1 또는 2를 실행한다
# 1. 간편 설치의 경우
sudo php artisan exment:setup-dir --easy=1
# 2. 수동 설치의 경우
sudo php artisan exment:setup-dir
~~~


#### Web 서버 설정을 바꿀 때
- Exment를 업데이트했을 때, PHP 파일을 업데이트했을 때, 설정값을 바꿨을 때는 다음 명령을 실행하십시오.

~~~
sudo systemctl restart php-fpm
~~~



## PHP 버전을 올릴 때의 대응
PHP의 버전을 바꿀 때는 다음 절차로 버전을 올리십시오.  
※버전을 올리는 작업 중에는 Exment에 접속할 수 없게 됩니다.  
※아래 예는 PHP8.0에서 PHP8.2로 업데이트하기 위한 절차입니다.  
※Amazon Linux 2의 Extras Library(amazon-linux-extras)를 써서 PHP를 설치한 것을 전제로 합니다.  
※환경이나 도입 시기, 버전이나 설치 방법에 따라 버전을 올리는 방법은 다를 수 있습니다.  

- amazon-linux-extras 패키지가 설치되어 있는지 확인합니다.

~~~
which amazon-linux-extras
# 설치되어 있지 않은 경우에는 아래 명령으로 설치하십시오.
# sudo yum install -y amazon-linux-extras
~~~

- PHP의 버전과 Extras Library의 토픽을 확인합니다.  
※다음 3가지를 확인하십시오. PHP의 버전이 8.0.X일 것. PHP8.0의 토픽이 enabled일 것. PHP8.2의 토픽이 있을 것.

~~~
php -v
amazon-linux-extras | grep php
~~~

- PHP8.0의 토픽을 비활성화합니다.  

~~~
sudo amazon-linux-extras disable php8.0
~~~

- PHP 폴더를 비웁니다.  

~~~
sudo yum -y remove php\*
~~~

- PHP8.2의 토픽을 활성화한 다음 설치합니다.

~~~
sudo amazon-linux-extras enable php8.2
sudo amazon-linux-extras install -y php8.2
~~~

- PHP의 확장 기능을 설치합니다.  

~~~
sudo yum -y install php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- PHP의 버전이 8.2.X로 되어 있는지, PHP8.0의 토픽이 disabled, PHP8.2의 토픽이 enabled로 되어 있는지 확인합니다.

~~~
php -v
amazon-linux-extras | grep php
~~~

- 아래 명령을 실행하십시오.

~~~
sudo systemctl restart php-fpm
sudo systemctl restart httpd
~~~
