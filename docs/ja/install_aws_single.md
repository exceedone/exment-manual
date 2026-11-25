# AWSによる環境構築-シングル構成
AWS の Amazon Linux2 に、Exment を入れる手順です。  
Web サーバーのインストールから始めて、何もないところから作ります。  
この手順は、**シンプルな、Web サーバー 1 台の構成**です。  
※冗長化した（Web サーバーを複数台にした）AWS の構成は、[AWSによる環境構築-冗長構成](/ja/install_aws)をご覧ください。

## 環境
このページの手順は、次の環境で作っています。
- Amazon Linux 2
- Apache 2.4.53
- PHP 8.2.x
- MySQL 8.4.x


## 注意点

- お使いの環境やバージョンによっては、この手順どおりに設定できないことがあります。ご了承ください。

- このページには、Exment を Linux で動かすための手順だけを書いています。  
SSH・データベースの作成・Linux のコマンドなど、一般的な IT の知識は書いていません。ご了承ください。

- インストールでエラーが出たときは、[トラブルシューティング](/ja/troubleshooting)をご覧ください。


## Linuxによるインストール手順

### MySQL(任意)
必要な方だけ行ってください。MySQL サーバーを別に作るときに、MySQL をインストールする手順です。  
※AWS RDS など、外部のサービスを使うときは、MySQL サーバー側の手順はいりません。  
※手順は、[MySQLインストール手順](/ja/install_mysql)のページに移動しました。

### Redis(任意)
※手順は、[セッション・キャッシュのドライバ変更](/ja/additional_session_cache_driver)のページに移動しました。


### Webサーバー

- はじめに、パッケージを新しくします。

~~~
sudo yum -y update
~~~

- インストールできる PHP のバージョンを確かめます。  
※PHP8.2 以外のバージョンが有効(enabled)になっているときは、無効にしておいてください。

~~~
sudo amazon-linux-extras | grep php
~~~

- 「php8.2」があることを確かめたら、インストールします。

~~~
sudo amazon-linux-extras install -y php8.2
~~~

- そのほかの必要なライブラリをインストールします。

~~~
sudo yum install -y httpd git
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- 次のコマンドを実行し、Apache を起動して、自動で起動するように設定します。

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- swap 領域（メモリが足りないときに使うディスクの領域）を作ります。

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

- php.ini を、必要に合わせて直します。  
とくに、[PHP設定値変更](/ja/additional_php_ini)にある、メモリ使用量の変更・タイムアウト時間変更などを行うときは、このファイルを直してください。

~~~
sudo vi /etc/php.ini
~~~

- httpd.conf を直します。

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

- apache を再起動します。

~~~
sudo systemctl restart httpd
~~~

- ファイルの許可設定を行います。以下のコマンドを実行します。

~~~
# ec2-userユーザーを、apacheグループに追加する
sudo usermod -a -G apache ec2-user
~~~

- **(MySQLを同サーバーにインストールしない場合のみ)**  
MySQL を同じサーバーにインストールしないときも、mysql コマンドを実行できるように、mysql クライアントをインストールする必要があります。  
※MySQL を同じサーバーにインストールするときは、この手順を飛ばしてください。

~~~
sudo rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el7-2.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# こちらを実施時して、mysql-community-clientが存在するかを確認します
sudo yum search mysql-community-client
# 上記コマンドで「Error: Unable to find a match: mysql-community-client」のような存在しない旨のメッセージが出た場合は、先に下記のコマンドを実施してください
sudo yum -y module disable mysql

# mysql-community-clientインストール
sudo yum -y install mysql-community-client
~~~

- Exment をサーバーに置きます。最新の Exment のファイルをダウンロードして、展開します。  
※これは、かんたんインストールの手順です。手動インストールのときは、[手動インストール](/ja/quickstart_manual)のページを見て置いてください。

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
sudo setfacl -m u:apache:rwx -R /var/www/exment

# 以下のコマンドを実行し、フォルダの権限を付与する。1もしくは2を実施する
# 1. かんたんインストールの場合
sudo php artisan exment:setup-dir --easy=1
# 2. 手動インストールの場合
sudo php artisan exment:setup-dir
~~~


#### Webサーバー 設定変更時
- Exment をアップデートしたとき、PHP ファイルを更新したとき、設定値を変えたときは、次のコマンドを実行してください。

~~~
sudo systemctl restart php-fpm
~~~



## PHPバージョンアップ時の対応
PHP のバージョンを変えるときは、次の手順でバージョンアップしてください。  
※バージョンアップ作業中は、Exmentにアクセスできなくなります。  
※下記の例は、PHP8.0からPHP8.2へアップデートするための手順です。  
※Amazon Linux 2のExtras Library(amazon-linux-extras)を用いて、PHPのインストールを行っている前提です。  
※環境や導入時期、バージョンやインストール方法によって、バージョンアップ方法は異なる場合があります。  

- amazon-linux-extras パッケージがインストールされていることを確かめます。

~~~
which amazon-linux-extras
# インストールされていない場合は下記のコマンドでインストールしてください。
# sudo yum install -y amazon-linux-extras
~~~

- PHP のバージョンと、Extras Library のトピックを確かめます。  
※次の 3 つを確かめてください。PHP のバージョンが 8.0.X であること。PHP8.0 のトピックが enabled であること。PHP8.2 のトピックがあること。

~~~
php -v
amazon-linux-extras | grep php
~~~

- PHP8.0のトピックを無効にします。  

~~~
sudo amazon-linux-extras disable php8.0
~~~

- PHPフォルダを空にします。  

~~~
sudo yum -y remove php\*
~~~

- PHP8.2 のトピックを有効にしてから、インストールします。

~~~
sudo amazon-linux-extras enable php8.2
sudo amazon-linux-extras install -y php8.2
~~~

- PHPの拡張機能をインストールします。  

~~~
sudo yum -y install php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- PHP のバージョンが 8.2.X になっていること、PHP8.0 のトピックが disabled、PHP8.2 のトピックが enabled になっていることを確かめます。

~~~
php -v
amazon-linux-extras | grep php
~~~

- 以下のコマンドを実行してください。

~~~
sudo systemctl restart php-fpm
sudo systemctl restart httpd
~~~
