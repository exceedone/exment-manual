# AWSによる環境構築-シングル構成
本ページでは、Amazon Linux2でExmentを構築する手順を記載します。  
Webサーバーのインストールをはじめとして、完全に新規にインストールを行う手順となります。  
また、本手順では**シンプルなWebサーバー1台構成としております。**  
※冗長化したAWS構成の環境構築方法は、[こちら](/ja/install_aws)をご確認ください。

## 環境
本ページでは、以下の内容で構築を行っております。  
- Amazon Linux 2
- Apache 2.4.53
- PHP 7.4.29
- MySQL 5.7.25


## 注意点

- ご利用の環境やバージョンなどにより、本手順では正常に設定できない場合がございます。ご了承ください。

- 本手順では、ExmentをLinuxで動作させるための手順のみの記載となります。  
SSHやデータベース作成、Linuxコマンドなど、一般的なIT系のナレッジについては記載致しておりません。ご了承ください。  

- インストール時にエラーが発生した場合、[トラブルシューティング](/ja/troubleshooting)をご参照ください。


## Linuxによるインストール手順

### MySQL(任意)
任意の設定内容になります。MySQLサーバーを別に構築すると想定し、MySQLをインストールする場合の手順です。  
※AWS RDSサービスを使用する場合など、外部サービスを使用する場合は、MySQLサーバー側の手順は不要です。  
※[こちら](/ja/install_mysql)に移動しました。

### Redis(任意)
※[こちら](/ja/additional_session_cache_driver)に移動しました。


### Webサーバー

- 以下のコマンドを実行し、パッケージ更新、必要ソフトウェアのインストールなどを行います。

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php7.4
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64
~~~

- 以下のコマンドを実行し、Apacheを起動、自動起動設定します。

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- swap領域を作成します。

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- composerをインストールします。
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- httpd.confを修正します。

~~~
sudo vi /etc/httpd/conf/httpd.conf

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
sudo systemctl restart httpd
~~~

- ファイルの許可設定を行います。以下のコマンドを実行します。

~~~
# ec2-userユーザーを、apacheグループに追加する
sudo usermod -a -G apache ec2-user
~~~

- Exmentをサーバーに配置します。最新のExmentファイルをダウンロードし、展開します。  
※こちらはかんたんインストールの手順です。手動インストールの場合、[こちら](/ja/quickstart_manual)を参考に配置してください。

~~~
cd /var/www
sudo wget https://exment.net/downloads/ja/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- ファイルの許可設定を行います。以下のコマンドを実行します。

~~~
# 最低限の権限を追加する
sudo chmod 0775 /var/www/exment
sudo chown -R ec2-user:apache /var/www/exment

# 以下のコマンドを実行し、フォルダの権限を付与する。1もしくは2を実施する
# 1. かんたんインストールの場合
sudo php artisan exment:setup-dir --easy=1
# 2. 手動インストールの場合
sudo php artisan exment:setup-dir
~~~


#### Webサーバー 設定変更時
- Exmentアップデート後や、PHPファイルを更新した場合、設定値を変更した場合は、以下のコマンドを実行してください。

~~~
sudo systemctl restart php-fpm
~~~

