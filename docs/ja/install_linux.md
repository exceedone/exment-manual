# Linuxによる環境構築
本ページでは、LinuxでExmentを構築する手順を記載します。  
Webサーバーのインストールをはじめとして、完全に新規にインストールを行う手順となります。

## 環境
本ページでは、以下の内容で構築を行っております。  
- Red Hat Enterprise Linux release 8.6
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

## 注意点

- ご利用の環境やバージョンなどにより、本手順では正常に設定できない場合がございます。ご了承ください。

- 本手順では、ExmentをLinuxで動作させるための手順のみの記載となります。  
SSHやデータベース作成、Linuxコマンドなど、一般的なIT系のナレッジについては記載致しておりません。ご了承ください。  

- **本手順では、管理者アカウントで実行している前提です。管理者アカウントでないユーザーが実行する場合、"sudo"を頭に付与してください。**

- インストール時にエラーが発生した場合、[トラブルシューティング](/ja/troubleshooting)をご参照ください。


## Linuxによるインストール手順

### MySQL(任意)
任意の設定内容になります。MySQLサーバーを別に構築すると想定し、MySQLをインストールする場合の手順です。  
※AWS RDSサービスを使用する場合など、外部サービスを使用する場合は、MySQLサーバー側の手順は不要です。  
※[こちら](/ja/install_mysql)に移動しました。

### Redis(任意)
※[こちら](/ja/additional_session_cache_driver)に移動しました。

### Webサーバー
- 事前準備として現在のパッケージのアップグレード、ならびに必要ライブラリのインストールを行います。  

~~~
dnf -y upgrade
dnf install -y wget firewalld unzip git
~~~


- Remiレポジトリの構成パッケージ、及びそれを使用するために必要なEPELをインストールします。

~~~
dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm  
dnf install -y https://rpms.remirepo.net/enterprise/remi-release-8.rpm
~~~

- phpパッケージのアクティブなリポジトリを切り替えます。

~~~
dnf module reset php -y
dnf module enable php:remi-8.2 -y
~~~

- 現在使用中＆使用可能なPHPパッケージのリストを確認します。  
remi-8.2に[e]がついていればＯＫです。

~~~
dnf module list php
~~~

- phpと関連ライブラリをインストールします。

~~~
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
~~~

- PHPのバージョンが8.2になっていることを確認します。  

~~~
php -v
~~~

- Apache起動設定を行います。

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- ファイアウォール設定を行います。  
※ご希望のセキュリティ設定に合わせ、設定内容を変更してください。

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- 必要に合わせ、SELinuxを無効化します。  
※ご希望のセキュリティ設定に合わせ、設定内容を変更してください。

~~~
vi /etc/selinux/config
# SELINUX=disabledに修正

setenforce 0
service httpd restart
~~~

- composerをインストールします。  

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- php.iniに、必要な記述・編集を行います。  
特に、[PHP設定値変更]（/ja/additional_php_ini）で、メモリ使用量の変更・タイムアウト時間変更などを行う場合は、こちらの設定を変更してください。

~~~
vi /etc/php.ini
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

- (推奨)ログインユーザーを、apacheグループに追加します。この設定を行うことで、ログインユーザーが、自由にexmentフォルダ内のファイルを編集することができます。SSH再接続後、グループは反映されます。  
※以下、ログインユーザーが「ec2-user」の場合

~~~
usermod -aG apache ec2-user
~~~

- **(MySQLを同サーバーにインストールしない場合のみ)**  
MySQLを同サーバーにインストールしない場合でも、mysqlコマンドを実行できるように、mysqlクライアントをインストールする必要があります。  
※MySQLを同サーバーにインストールする場合は、この手順を飛ばしてください。

~~~
rpm -ivh http://dev.mysql.com/get/mysql80-community-release-el7-11.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# こちらを実施時して、mysql-community-clientが存在するかを確認します
dnf search mysql-community-client
# 上記コマンドで「Error: Unable to find a match: mysql-community-client」のような存在しない旨のメッセージが出た場合は、先に下記のコマンドを実施してください
dnf -y module disable mysql

# mysql-community-clientインストール
dnf -y install mysql-community-client
~~~


- Exmentをサーバーに配置します。最新のExmentファイルをダウンロードし、展開します。  
※こちらはかんたんインストールの手順です。手動インストールの場合、[こちら](/ja/quickstart_manual)を参考に配置してください。

~~~
cd /var/www
wget https://exment.net/downloads/ja/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- ファイルの許可設定を行います。以下のコマンドを実行します。

~~~
# 最低限の権限を追加する
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# 以下のコマンドを実行し、フォルダのユーザー・グループ権限を付与する。1もしくは2を実施する  
# ※権限が不足している場合などは、sudoを付与するなど、強い権限で実行をお願いします
# 1. かんたんインストールの場合
php artisan exment:setup-dir --easy=1
# 2. 手動インストールの場合
php artisan exment:setup-dir
~~~

- 手元のPCのブラウザで、作成したWebサーバーのIPアドレスを入力し、Exmentの初期インストールを完了させます。

- ※かんたんインストールでインストールした場合で、初期インストールが完了しましたら、以下のコマンドを実行し、インストール時のみ必要な権限を元に戻します。

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

