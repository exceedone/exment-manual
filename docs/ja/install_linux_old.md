# Linuxによる環境構築（CentOS7）
Linux のサーバーに、Exment を入れる手順です。  
Web サーバーのインストールから始めて、何もないところから作ります。

大きな流れは、次のとおりです。

1. （必要なら）MySQL・Redis を用意する
2. Web サーバーに、PHP・Apache・composer を入れる
3. Exment のファイルを置いて、権限を設定する
4. ブラウザーで、Exment の初期インストールを行う

## 環境
このページの手順は、次の環境で作っています。  
- CentOS 7.9.2009 64bit (**現在、8系で下記の手順でエラーが出ることを確認しております**。下記の手順でインストールする場合、7系でインストールしてください。)
- Apache 2.4.6
- PHP 8.0.21
- MySQL 5.7.38

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
- yum をアップデートして、必要なライブラリをインストールします。  

~~~
yum -y update
yum install -y wget firewalld unzip git
~~~

- epelを更新し、Remiレポジトリの構成パッケージをインストールします。  
rpm」**に該当するrpmを指定してください。

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
~~~

- yum-utilsパッケージをインストールします。

~~~
yum install -y yum-utils
~~~

- PHP8.0のパッケージのみを有効にします。

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- 使用可能なレポジトリを確認します。「remi-php80」が表示されればOKです。

~~~
yum repolist
~~~

- PHP8.0と拡張機能のインストールを行います。  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- PHPのバージョンが8.0になっていることを確認します。  

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
rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# こちらを実施時して、mysql-community-clientが存在するかを確認します
yum search mysql-community-client
# 上記コマンドで「Error: Unable to find a match: mysql-community-client」のような存在しない旨のメッセージが出た場合は、先に下記のコマンドを実施してください
yum -y module disable mysql

# mysql-community-clientインストール
yum -y install mysql-community-client
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


## PHPバージョンアップ時の対応
PHP のバージョンを変えるときは、次の手順でバージョンアップしてください。  
※バージョンアップ作業中は、Exmentにアクセスできなくなります。  
※下記の手順例は、PHP7.4からPHP8.0へアップデートするための手順です。  
※epelとremiリポジトリを用いて、PHPのインストールを行っている前提です。  
※環境や導入時期、バージョンやインストール方法によって、バージョンアップ方法は異なる場合があります。  

- はじめに、バックアップを取ります。下のコマンドは、php.ini と、インストール済みのパッケージ・拡張モジュールのメモを取るだけの、最低限の例です。お使いの環境に合わせて、足したり省いたりしてください。  

~~~
# バックアップフォルダを作成
cd ~
mkdir php-backup && cd php-backup
# インストール済のパッケージ情報を出力する
yum list installed |grep php > php74-installed.txt
# 拡張モジュールの情報を出力する
php -m > php74-modules.txt
# php.iniファイルをコピー（場所が下記と違う時は事前に「php -i | grep php.ini」で確認） 
cp /etc/opt/remi/php74/php.ini php74.ini
~~~


- PHP関連パッケージを削除します。  

~~~
yum remove php-* -y
yum remove php74-php* -y
yum remove php74-runtime -y
~~~

- epelとremiのリポジトリ、及びyumユーティリティをインストールします。  
※すでにインストール済の場合は「Nothing to do」と表示されますが、問題ありません。   

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
yum -y install yum-utils
~~~

- PHP8.0のパッケージのみを有効にします。  

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- 使用可能なリポジトリを確認します。「remi-php80」が表示されればOKです。  

~~~
yum repolist
~~~

- PHP8.0と拡張機能のインストールを行います。  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- PHPのバージョンが8.0になっていることを確認します。  

~~~
php -v
~~~
