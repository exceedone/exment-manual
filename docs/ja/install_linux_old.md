# Linuxによる環境構築（CentOS7）
本ページでは、LinuxでExmentを構築する手順を記載します。  
Webサーバーのインストールをはじめとして、完全に新規にインストールを行う手順となります。

## 環境
本ページでは、以下の内容で構築を行っております。  
- CentOS 7.9.2009 64bit (**現在、8系で下記の手順でエラーが出ることを確認しております。**下記の手順でインストールする場合、7系でインストールしてください。)
- Apache 2.4.6
- PHP 8.1.7
- MySQL 5.7.38

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
- yumのアップデート、ならびに必要ライブラリのインストールを行います。  

~~~
sudo yum -y update
sudo yum install -y wget firewalld unzip git
~~~

- epelを更新し、Remiレポジトリの構成パッケージをインストールします。  
rpm」**に該当するrpmを指定してください。

~~~
sudo yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
~~~

- yum-utilsパッケージをインストールします。

~~~
sudo yum install -y yum-utils
~~~

- PHP8.1のパッケージのみを有効にします。

~~~
sudo yum-config-manager --disable 'remi-php*'
sudo yum-config-manager --enable remi-php81
~~~

- 使用可能なレポジトリを確認します。「remi-php81」が表示されればOKです。

~~~
sudo yum repolist
~~~

- PHP8.1と拡張機能のインストールを行います。  

~~~
sudo yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- PHPのバージョンが8.1になっていることを確認します。  

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


## PHPバージョンアップ時の対応
PHPのバージョンを変更する場合、以下の手順でバージョンアップを行ってください。  
※バージョンアップ作業中は、Exmentにアクセスできなくなります。  
※下記の手順例は、PHP7.4からPHP8.1へアップデートするための手順です。  
※epelとremiリポジトリを用いて、PHPのインストールを行っている前提です。  
※環境や導入時期、バージョンやインストール方法によって、バージョンアップ方法は異なる場合があります。  

- 最初にバックアップを行います。以下のコマンドはphp.ini、及びインストール済のパッケージや拡張モジュールのメモを取るだけの最低限のバックアップ例です。ご自身の環境に応じて追加、省略してください。  

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
yum remove php-*
yum remove php74-php*
yum remove php74-runtime
~~~

- epelとremiのリポジトリ、及びyumユーティリティをインストールします。  
※すでにインストール済の場合は「Nothing to do」と表示されますが、問題ありません。   

~~~
sudo yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
sudo yum -y install yum-utils
~~~

- PHP8.1のパッケージのみを有効にします。  

~~~
sudo yum-config-manager --disable 'remi-php*'
sudo yum-config-manager --enable remi-php81
~~~

- 使用可能なリポジトリを確認します。「remi-php81」が表示されればOKです。  

~~~
sudo yum repolist
~~~

- PHP8.1と拡張機能のインストールを行います。  

~~~
sudo yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- PHPのバージョンが8.1になっていることを確認します。  

~~~
php -v
~~~
