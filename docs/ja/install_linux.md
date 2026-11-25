# Linuxによる環境構築
Linux のサーバーに、Exment を入れる手順です。  
Web サーバーのインストールから始めて、何もないところから作ります。

大きな流れは、次のとおりです。

1. （必要なら）MySQL・Redis を用意する
2. Web サーバーに、PHP・Apache・composer を入れる
3. Exment のファイルを置いて、権限を設定する
4. ブラウザーで、Exment の初期インストールを行う

## 環境
このページの手順は、次の環境で作っています。  
- Red Hat Enterprise Linux release 8.6
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

## 注意点

- お使いの環境やバージョンによっては、この手順どおりに設定できないことがあります。ご了承ください。

- このページには、Exment を Linux で動かすための手順だけを書いています。  
SSH・データベースの作成・Linux のコマンドなど、一般的な IT の知識は書いていません。ご了承ください。  

- **この手順は、管理者アカウントで実行する前提です。管理者アカウントでないユーザーが実行するときは、コマンドの頭に "sudo" を付けてください**。

- インストールでエラーが出たときは、[トラブルシューティング](/ja/troubleshooting)をご覧ください。


## Linuxによるインストール手順

### MySQL(任意)
必要な方だけ行ってください。MySQL サーバーを別に作るときに、MySQL をインストールする手順です。  
※AWS RDS など、外部のサービスを使うときは、MySQL サーバー側の手順はいりません。  
※手順は、[MySQLインストール手順](/ja/install_mysql)のページに移動しました。

### Redis(任意)
※手順は、[セッション・キャッシュのドライバ変更](/ja/additional_session_cache_driver)のページに移動しました。

### Webサーバー
- はじめに、いまのパッケージを新しくして、必要なライブラリをインストールします。  

~~~
dnf -y upgrade
dnf install -y wget firewalld unzip git
~~~


- Remi レポジトリの構成パッケージと、それを使うために必要な EPEL をインストールします。

~~~
dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm  
dnf install -y https://rpms.remirepo.net/enterprise/remi-release-8.rpm
~~~

- php パッケージで使うリポジトリを切りかえます。

~~~
dnf module reset php -y
dnf module enable php:remi-8.2 -y
~~~

- いま使っている PHP パッケージと、使える PHP パッケージの一覧を確かめます。  
remi-8.2 に [e] がついていれば OK です。

~~~
dnf module list php
~~~

- php と、関連するライブラリをインストールします。

~~~
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
~~~

- PHP のバージョンが 8.2 になっていることを確かめます。  

~~~
php -v
~~~

- Apache が起動するように設定します。

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- ファイアウォールを設定します。  
※必要なセキュリティに合わせて、設定の内容を変えてください。

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- 必要なら、SELinux を無効にします。  
※必要なセキュリティに合わせて、設定の内容を変えてください。

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

- php.ini を、必要に合わせて直します。  
とくに、[PHP設定値変更](/ja/additional_php_ini)にある、メモリ使用量の変更・タイムアウト時間変更などを行うときは、このファイルを直してください。

~~~
vi /etc/php.ini
~~~

- httpd.conf を直します。

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

- apache を再起動します。

~~~
service httpd restart
~~~

- (推奨)ログインユーザーを、apache グループに追加します。こうすると、ログインユーザーが、exment フォルダの中のファイルを自由に編集できます。グループは、SSH でつなぎ直したあとに反映されます。  
※下は、ログインユーザーが「ec2-user」の場合です。

~~~
usermod -aG apache ec2-user
~~~

- **(MySQLを同サーバーにインストールしない場合のみ)**  
MySQL を同じサーバーにインストールしないときも、mysql コマンドを実行できるように、mysql クライアントをインストールする必要があります。  
※MySQL を同じサーバーにインストールするときは、この手順を飛ばしてください。

~~~
rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el8-2.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# こちらを実施時して、mysql-community-clientが存在するかを確認します
dnf search mysql-community-client
# 上記コマンドで「Error: Unable to find a match: mysql-community-client」のような存在しない旨のメッセージが出た場合は、先に下記のコマンドを実施してください
dnf -y module disable mysql

# mysql-community-clientインストール
dnf -y install mysql-community-client
~~~


- Exment をサーバーに置きます。最新の Exment のファイルをダウンロードして、展開します。  
※これは、かんたんインストールの手順です。手動インストールのときは、[手動インストール](/ja/quickstart_manual)のページを見て置いてください。

~~~
cd /var/www
wget https://exment.net/downloads/ja/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- ファイルの権限を設定します。次のコマンドを実行します。

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

- 手元の PC のブラウザーで、作った Web サーバーの IP アドレスを開き、Exment の初期インストールを終わらせます。

- ※かんたんインストールでインストールしたときは、初期インストールが終わったら、次のコマンドを実行してください。インストールのときだけ必要な権限を、元に戻します。

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

