# Linuxによる環境構築
本ページでは、LinuxでExmentを構築する手順を記載します。  
Webサーバーのインストールをはじめとして、完全に新規にインストールを行う手順となります。

## 環境
本ページでは、以下の内容で構築を行っております。  
- CentOS 7.6.1810 64bit (**現在、8系で下記の手順でエラーが出ることを確認しております。**下記の手順でインストールする場合、7系でインストールしてください。)
- Apache 2.4.6
- PHP 7.2.21
- MySQL 5.7.25

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
yum -y update
yum install -y wget firewalld unzip git
~~~


- epelを更新し、rpmをインストールします。  
※バージョンアップなどにより、以下のバージョンが存在しない場合があります。その場合、[こちら](https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/)のリンクから、**「epel-release-7-XX.noarch.rpm」**に該当するrpmを指定してください。

~~~
wget https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-12.noarch.rpm ~/
rpm -ivh ~/epel-release-7-12.noarch.rpm 
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

- 必要に合わせ、SELinuxを無効化します。  
※ご希望のセキュリティ設定に合わせ、設定内容を変更してください。

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

- phpinfoで、ここまでの作業が正常に実行できているかどうかの確認を行います。以下のコマンドを実行します。  

~~~
php --version

# PHPのバージョンが表示されれば成功
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

#以下の記述が含まれていれば、値を変更、もしくは追加
safe_mode=Off
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
chmod 0755 /var/www/exment
chown -R apache:apache /var/www/exment

# 以下のコマンドを実行し、フォルダの権限を付与する。1もしくは2を実施する
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
