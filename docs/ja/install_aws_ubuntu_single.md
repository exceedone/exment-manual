# Ubuntu AWSによる環境構築-シングル構成
本ページでは、Ubuntu ServerでExmentを構築する手順を記載します。  
Webサーバーのインストールをはじめとして、完全に新規にインストールを行う手順となります。  
また、本手順では**シンプルなWebサーバー1台構成としております。**  
※冗長化したAWS構成の環境構築方法は、[こちら](/ja/install_aws)をご確認ください。

## 環境
本ページでは、以下の内容で構築を行っております。  
- Ubuntu Server 22.04
- Apache 2.4.53
- PHP 8.2.x
- MySQL 8.0.x


## 注意点

- ご利用の環境やバージョンなどにより、本手順では正常に設定できない場合がございます。ご了承ください。

- 本手順では、ExmentをLinuxで動作させるための手順のみの記載となります。  
SSHやデータベース作成、Linuxコマンドなど、一般的なIT系のナレッジについては記載致しておりません。ご了承ください。  

- インストール時にエラーが発生した場合、[トラブルシューティング](/ja/troubleshooting)をご参照ください。


## Linuxによるインストール手順

### MySQL(任意)
任意の設定内容になります。MySQLサーバーを別に構築すると想定し、MySQLをインストールする場合の手順です。  
※AWS RDSサービスを使用する場合など、外部サービスを使用する場合は、MySQLサーバー側の手順は不要です。  

- MySQL8.0をインストールし起動します。

~~~
sudo apt install mysql-server -y
sudo systemctl start mysql
~~~

- MySQLへログインします。

~~~
sudo mysql -u root
~~~
ログイン後、MySQLの新しいアカウントを作成します。
~~~
mysql> CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'NOpdsm53spirn';
~~~
このチュートリアルでMySQLシェル内にユーザーを追加する場合、ユーザーのホストをサーバーのIPアドレスではなく、localhostとして指定します 。localhostは「このコンピューター」を意味するホスト名で、MySQLはこの特定のホスト名を特別に扱います。 そのホストを持つユーザーがMySQLにログインすると、Unixソケットファイルを使用してローカルサーバーに接続しようとします。したがって、通常、サーバーにSSHで接続する場合、またはローカルmysqlクライアントを実行してローカルMySQLサーバーに接続する場合に、localhostが使用されます。  

~~~
mysql> GRANT ALL PRIVILEGES ON *.* TO 'newuser'@'localhost';
mysql> FLUSH PRIVILEGES;
~~~
新しいパスワードに変更することが出来たので、MySQLから出ます。

~~~
mysql> quit
~~~

- my.cnfを修正します。

~~~
sudo vi /etc/mysql/conf.d/mysql.cnf

# 以下の記述を、末尾に追加
local-infile=1
~~~

- MySQLを再起動します。

~~~
sudo systemctl restart mysql
~~~

### Redis(任意)
※[こちら](/ja/additional_session_cache_driver)に移動しました。


### Webサーバー

- 事前準備としてパッケージ更新を行います。

~~~
sudo apt update -y
~~~

- インストール済みのunitファイルを取得します。

~~~
sudo systemctl list-unit-files | grep php
~~~
※PHP8.2以外のバージョンが有効(enabled)になっている場合は無効化しておきましょう。 
~~~
sudo systemctl disable php7.4-fpm.service
sudo systemctl disable php8.1-fpm.service
~~~

- サーバー側にPHP8.2用のパッケージがあるかを確認します。

~~~
apt-cache search "php8.2"

# PHP8.2用のパッケージがない場合は、以下のコマンドを実行します。
sudo add-apt-repository ppa:ondrej/php
sudo apt update
~~~

- PHP 8.2と必要なライブラリをインストールします。
~~~
sudo apt install -y php8.2 php8.2-fpm php8.2-gd php8.2-dom php8.2-bcmath php8.2-mbstring php8.2-xml php8.2-zip php8.2-curl php8.2-mysql
~~~
- PHPのバージョンが8.2になっていることを確認します。
~~~
php -v
~~~

- PHP-FPMを使用して、Apache を構成します。

~~~
sudo apt install -y apache2 libapache2-mod-fcgid
sudo a2enmod proxy_fcgi setenvif
sudo a2enconf php8.2-fpm
sudo a2enmod rewrite
sudo systemctl restart apache2
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
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
php -r "unlink('composer-setup.php');"
~~~

- php.iniに、必要な記述・編集を行います。  
特に、[PHP設定値変更](/ja/additional_php_ini)で、メモリ使用量の変更・タイムアウト時間変更などを行う場合は、こちらの設定を変更してください。

~~~
sudo vi /etc/php/8.2/cli/php.ini
~~~

PHPを再起動します。
~~~
sudo systemctl restart php8.2-fpm
~~~

- 000-default.confを修正します。

~~~
sudo rm /etc/apache2/sites-available/000-default.conf
sudo vi /etc/apache2/sites-available/000-default.conf

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
sudo systemctl restart apache2
~~~

- ファイルの許可設定を行います。以下のコマンドを実行します。

~~~
# ubuntuユーザーを、www-dataグループに追加する
sudo usermod -a -G www-data ubuntu
~~~

- **(MySQLを同サーバーにインストールしない場合のみ)**  
MySQLを同サーバーにインストールしない場合でも、mysqlコマンドを実行できるように、mysqlクライアントをインストールする必要があります。  
※MySQLを同サーバーにインストールする場合は、この手順を飛ばしてください。

~~~
sudo apt install mysql-client -y
~~~

- Exmentをサーバーに配置します。最新のExmentファイルをダウンロードし、展開します。  
※こちらはかんたんインストールの手順です。手動インストールの場合、[こちら](/ja/quickstart_manual)を参考に配置してください。

~~~
cd /var/www
sudo wget https://exment.net/downloads/ja/exment.zip
sudo apt-get install unzip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- ファイルの許可設定を行います。以下のコマンドを実行します。

~~~
# 最低限の権限を追加する
sudo chmod -R 0775 /var/www/exment
sudo chown -R www-data:www-data /var/www/exment

# 以下のコマンドを実行し、フォルダの権限を付与する。1もしくは2を実施する
# 1. かんたんインストールの場合
sudo php artisan exment:setup-dir --easy=1
# 2. 手動インストールの場合
sudo php artisan exment:setup-dir
~~~


#### Webサーバー 設定変更時
- Exmentアップデート後や、PHPファイルを更新した場合、設定値を変更した場合は、以下のコマンドを実行してください。

~~~
sudo systemctl restart php8.2-fpm
~~~



## PHPバージョンアップ時の対応
PHPのバージョンを変更する場合、以下の手順でバージョンアップを行ってください。  
※バージョンアップ作業中は、Exmentにアクセスできなくなります。  
※下記の例は、PHP8.0からPHP8.2へアップデートするための手順です。 
- phpをアンインストールします
~~~
sudo apt-get --purge remove php7*
sudo apt-get --purge remove php8*
~~~
- インストール済みのunitファイルを取得します。

~~~
sudo systemctl list-unit-files | grep php
~~~
※PHP8.2以外のバージョンが有効(enabled)になっている場合は無効化しておきましょう。 
~~~
sudo systemctl disable php7.4-fpm.service
sudo systemctl disable php8.1-fpm.service
~~~

- サーバー側にPHP8.2用のパッケージがあるかを確認します。

~~~
apt-cache search "php8.2"

# PHP8.2用のパッケージがない場合は、以下のコマンドを実行します。
sudo add-apt-repository ppa:ondrej/php
sudo apt update
~~~

- PHP 8.2と必要なライブラリをインストールします。
~~~
sudo apt install -y php8.2 php8.2-fpm php8.2-gd php8.2-dom php8.2-bcmath php8.2-mbstring php8.2-xml php8.2-zip php8.2-curl php8.2-mysql
~~~
- PHPのバージョンが8.2になっていることを確認します。
~~~
php -v
~~~