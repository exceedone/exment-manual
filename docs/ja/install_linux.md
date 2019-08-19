# Linuxによる環境構築
本ページでは、LinuxでExmentを構築する手順を記載します。  
Webサーバーのインストールをはじめとして、完全に新規にインストールを行う手順となります。

## 環境
本ページでは、以下の内容で構築を行っております。  
- CentOS 7.6.1810 64bit
- Apache 2.4.6
- PHP 7.2.21
- MySQL 5.7.25

## 注意点

- ご利用の環境やバージョンなどにより、本手順では正常に設定できない場合がございます。ご了承ください。

- 本手順では、ExmentをLinuxで動作させるための手順のみの記載となります。  
SSHやデータベース作成、Linuxコマンドなど、一般的なIT系のナレッジについては記載致しておりません。ご了承ください。  

- **本手順では、管理者アカウントで実行している前提です。管理者アカウントでないユーザーが実行する場合、"sudo"を頭に付与してください。**

- その他お問い合わせは、お気軽にこちらの[無料お問い合わせ](https://exment.net/inquiry)にてお願いいたします。

## Linuxによるインストール手順

### Webサーバー
- yumのアップデート、ならびに必要ライブラリのインストールを行います。  

~~~
yum -y update
yum install -y wget firewalld unzip
~~~


- epelを更新し、rpmをインストールします。

~~~
wget https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-11.noarch.rpm ~/
rpm -ivh ~/epel-release-7-11.noarch.rpm 
yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
~~~

- PHP7.2など、必要ライブラリをインストールします。

~~~
yum -y install --enablerepo=remi-php72 httpd openssl mod_ssl mysql php72 php72-php  php-mbstring php-mysqli php-dom php-gd.x86_64 php-zip
~~~

- Apache起動設定を行います。

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- ファイアウォール設定を行います。
~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- SELinuxを無効化します。

~~~
vi /etc/selinux/config
# SELINUX=disabledに修正

setenforce 0
service httpd restart
~~~

- php7.2へのパスを通します。コマンドで、php7.2を実行できるようになります。

~~~
ln -s /usr/bin/php72 /usr/bin/php
~~~

- phpinfoで、ここまでの作業が正常に実行できているかどうかの確認を行います。パス「/var/www/html/info.php」を新規作成し、以下の記述を追加します。

~~~
vi /var/www/html/info.php

# 以下の記述を追加
<?php
phpinfo();
~~~


- 以下のコマンドを実行します。正常にアクセスできていれば、結果が返却されます。
~~~
curl http://localhost/info.php
~~~

- テスト用のinfo.phpを削除します。
~~~
rm /var/www/html/info.php -f
~~~

- composerをインストールします。
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- php.iniに、必要な拡張機能の記述を追加します。

~~~
vi /etc/opt/remi/php72/php.ini

#以下の内容を、ファイルの末尾に追加
extension=mbstring.so
extension=dom.so
extension=xml.so
extension=gd.so
extension=simplexml.so
extension=xmlreader.so
extension=xmlwriter.so
extension=zip.so
extension=mysqlnd.so
extension=mysqli.so
extension=pdo.so
extension=pdo_mysql.so
extension_dir=/usr/lib64/php/modules/
~~~

- httpd.confを修正します。

~~~
vi /etc/httpd/conf/httpd.conf

# 以下の記述を、末尾に追加

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
~~~

- apacheを再起動します。
~~~
service httpd restart
~~~

- Exmentをサーバーに配置します。最新のExmentファイルをダウンロードし、展開します。  
~~~
cd /var/www
wget https://exment.net/downloads/ja/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- 所有者・パーミッション設定を行います。

~~~
chown apache:apache -R /var/www/exment
chmod 755 -R /var/www/exment/storage
chmod 755 -R /var/www/exment/bootstrap/cache
~~~

### MySQL
任意の設定内容になります。MySQLをインストールする場合の手順です。  
Webサーバー側の手順と、MySQLサーバー側の手順を記載します。  
※AWS RDSサービスを使用する場合など、外部サービスを使用する場合は、MySQLサーバー側の手順は不要です。

#### MySQLサーバー側
- MySQL5.7をインストールし起動します。
~~~
rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
yum -y install mysql-community-server
systemctl enable mysqld.service
systemctl start mysqld.service
~~~

- MySQLの初期パスワードを確認します。

~~~
cat /var/log/mysqld.log | grep password

#以下のようなログが出力されるので、パスワードを確認する
2016-09-01T13:09:03.337119Z 1 [Note] A temporary password is generated for root@localhost: uhsd!XXXXXX
~~~

- (任意)パスワードポリシーを無効化します。

~~~
vi /etc/my.cnf

#以下のvalidate-passwordを追加
[mysqld]
validate-password=OFF
~~~


- mysqlを再起動します。
~~~
systemctl restart mysqld.service
~~~

- mysqlの初期設定を行います。以下のコマンドを実行します。

~~~
mysql_secure_installation

Enter password for user root: (先ほどコピーしたパスワードを入力)

New password: (新しいパスワードを入力)
Re-enter new password: (新しいパスワードを入力)

Change the password for root? : y

Remove anonymous users? : y #匿名ユーザーアカウントを削除
Disallow root login remotely? : y # ローカルホスト以外からアクセス可能な root アカウントを削除
Remove test database and access to it? : y # test データベースの削除
Reload privilege tables now? : y #privilegeテーブルを再読込
~~~

- MySQLにログインします。

~~~
mysql -u root -p(パスワード)
~~~

- Exment用のデータベースと、ユーザーを作成します。  
※ここでは、データベース名を「exment_database」、ユーザーを「exment_user」とします。  
また、接続元のIPアドレスを「192.168.137.%」とします。

~~~
CREATE DATABASE exment_database;
CREATE USER 'exment_user'@'192.168.137.%' IDENTIFIED BY '(exment_user用のパスワード)';
GRANT ALL ON exment_database.* TO exment_user identified by '(exment_user用のパスワード)';
FLUSH PRIVILEGES;
~~~

- ファイアウォール設定で、接続元のIPアドレスからのMySQLアクセスのみ許可します。  
※ここでは、接続元のIPアドレスを「192.168.137.%」とします。

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=3306/tcp
firewall-cmd --zone=from_webserver --add-service=mysql
firewall-cmd --reload
~~~

### Redis
任意の設定内容になります。セッション管理をRedisで行う場合の手順です。  
Webサーバー側の手順と、Redisサーバー側の手順を記載します。  
※AWS Redisを使用する場合など、外部サービスを使用する場合は、Redisサーバー側の手順は不要です。

#### Redisサーバー側
- 以下のコマンドを実行します。

~~~
yum -y install epel-release
yum install -y redis
systemctl enable redis
~~~

- 以下のコマンドを実行し、Redisの設定を変更します。

~~~
vi /etc/redis.conf

####bindの記載を以下のように変更
#bind 127.0.0.1
bind 0.0.0.0
~~~

- ファイアウォール設定で、接続元のIPアドレスからのRedisアクセスのみ許可します。  

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=6379/tcp
firewall-cmd --zone=from_webserver --add-service=redis
firewall-cmd --reload
~~~

- サービスを開始します。

~~~
systemctl start redis.service
~~~

#### Webサーバー側
- 以下のコマンドを、プロジェクトのルートフォルダで実行します。

~~~
composer require predis/predis
~~~

- .envファイルを開き、以下の設定値を追加・変更します。  

~~~
CACHE_DRIVER=redis #redisに書き換え
SESSION_DRIVER=redis #redisに書き換え
REDIS_HOST=127.0.0.1 #redisのホスト名
REDIS_PASSWORD=XXXXXX #redisのパスワード、設定した場合のみ記述
REDIS_PORT=6379 #redisのポート番号、6379でない場合のみ記述
~~~
