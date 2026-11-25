# (上級者向け、ベータ版)AWSによる環境構築-冗長構成
AWS の Amazon Linux2 に、Exment を入れる手順です。  
Web サーバーのインストールから始めて、何もないところから作ります。  
この手順は、**Web サーバーを冗長化した（複数台にした）構成**です。  
※シンプルな 1 台の構成は、[AWSによる環境構築-シングル構成](/ja/install_aws_single)をご覧ください。

大きな流れは、次のとおりです。

1. ネットワークを作る（VPC・サブネット・インターネットゲートウェイ・ルートテーブル・セキュリティグループ）
2. 保存先を作る（AWS S3・MySQL・Redis）
3. EC2 を作り、Web サーバー A に Exment を入れる
4. Web サーバー A の AMI から、Web サーバー B を作る
5. ロードバランサー（Amazon Elastic Load Balancing）を作る

## 環境
このページの手順は、次の構成で作っています。
- VPC
- サブネット
    - パブリックA
    - パブリックB
- ルートテーブル
- インターネットゲートウェイ
- セキュリティグループ
- Amazon S3
- Amazon RDS
    - MySQL 8.4.x
- Amazon ElastiCache
    - Redis 5.0.5
- Amazon Linux2-A
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 8.2.x
- Amazon Linux2-B
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 8.2.x
- Amazon Linux2-踏み台
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
- Amazon Elastic Load Balancing
    - Application Load Balancer


## 注意点

- お使いの環境やバージョンによっては、この手順どおりに設定できないことがあります。ご了承ください。

- このページには、Exment を Linux で動かすための手順だけを書いています。  
AWS・SSH・データベースの作成・Linux のコマンドなど、一般的な IT の知識は書いていません。ご了承ください。

- **この手順は、管理者アカウントで実行する前提です。管理者アカウントでないユーザーが実行するときは、コマンドの頭に "sudo" を付けてください**。

- インストールでエラーが出たときは、[トラブルシューティング](/ja/troubleshooting)をご覧ください。

- この手順は、[AWSチュートリアル](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html#setting-file-permissions-2)をもとに作っています。

## 手順

### VPC
VPC を、次の設定で作ります。

- 名前 : 任意 (例 : exment-vpc)
- IPv4 CIDR ブロック : XXX.XXX.0.0/16 (例 : 172.32.0.0/16)
- IPv6 CIDR ブロック : なし
- テナンシー : デフォルト
- DNS解決、DNSホスト名が無効になっている場合、それぞれ「有効」に変更

### サブネット
サブネットを、次の設定で作ります。

#### パブリックサブネットA
- 名前 : 任意 (例 : exment-subnet-public1)
- VPC : 上記で作成したVPC
- アベイラビリティーゾーン : ap-northeast-1a
- IPv4 CIDR ブロック : XXX.XXX.1.0/24 (例 : 172.32.1.0/24)

#### パブリックサブネットB
- 名前 : 任意 (例 : exment-subnet-public2)
- VPC : 上記で作成したVPC
- アベイラビリティーゾーン : ap-northeast-1c
- IPv4 CIDR ブロック : XXX.XXX.2.0/24 (例 : 172.32.2.0/24)


### インターネットゲートウェイ
- 名前 : 任意 (例 : exment-igw)
- 作成後、先ほど作成したVPCにアタッチ

### ルートテーブル
- 先ほど作った VPC に、ルートテーブルが自動で作られています。  
Name は編集できます。(例 : exment-rt)

- そのルートテーブルを選び、ページの下のタブの「ルート」で、次の内容を追加します。
    - 送信先 : 0.0.0.0/0
    - ターゲット : Internet Gateway(上記で作成したインターネットゲートウェイ)

- ページの下のタブの「サブネットの関連付け」で、パブリックサブネットA、パブリックサブネットBを追加します。


### セキュリティグループ
セキュリティグループを、次の設定で作ります。

#### セキュリティグループ-SSH
- 名前 : 任意 (例 : exment-sg-ssh)
- 説明 : 任意 (例 : exment-sg-ssh)
- VPC : 上記で作成したVPC

■作成後、インバウンドのルール追加
- タイプ : SSH
- ポート : 22
- ソース : SSH接続を行うIPアドレス
- VPC : 上記で作成したVPC

#### セキュリティグループ-SSHプライベート
- 名前 : 任意 (例 : exment-sg-ssh-private)
- 説明 : 任意 (例 : exment-sg-ssh-private)
- VPC : 上記で作成したVPC

■作成後、インバウンドのルール追加
- タイプ : SSH
- ポート : 22
- ソース :  (「セキュリティグループ-SSH」のグループID)
- VPC : 上記で作成したVPC

#### セキュリティグループ-Web
- 名前 : 任意 (例 : exment-sg-web)
- 説明 : 任意 (例 : exment-sg-web)

■作成後、インバウンドのルール追加
- タイプ : HTTP
- ポート : 80
- ソース : 0.0.0.0/0, ::/0

#### セキュリティグループ-MySQL
- 名前 : 任意 (例 : exment-sg-mysql)
- 説明 : 任意 (例 : exment-sg-mysql)

■作成後、インバウンドのルール追加
- タイプ : MYSQL/Aurora
- ポート : 3306
- ソース : (「セキュリティグループ-Web」のグループID)

#### セキュリティグループ-Redis
- 名前 : 任意 (例 : exment-sg-redis)
- 説明 : 任意 (例 : exment-sg-redis)

■作成後、インバウンドのルール追加
- タイプ : カスタムTCPルール
- ポート : 6379
- ソース : (「セキュリティグループ-Web」のグループID)


### AWS S3
- AWS S3 のバケットと、IAM を作ります。  
※参考：[超簡単！LaravelでS3を利用する手順](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f)  
上の URL の「S3用のIAMを作成」「Bucketの作成」を行ってください。  
※バケットは、「添付ファイル用」「バックアップファイル用」「プラグイン用」「テンプレート用」の 4 種類を作ってください。


### MySQL
> ここでは、Amazon RDS で MySQL を作るときの設定を書いています。インスタンスを別に作って MySQL をインストールし、それぞれの Web サーバーからつなぐ方法でも作れます。  
MySQL をサーバーにインストールする方法は、[MySQLインストール手順](/ja/install_mysql)をご覧ください。

- エンジン : MySQL
- バージョン : 8.0.x
- インスタンス識別子 : 任意 (例 : exment-db)
- DB インスタンスクラス : 任意 (例 : db.t2.micro)
- ユーザー名、パスワード : 各自に設定
- Virtual Private Cloud : 先ほど作成したVPC
- 追加の接続設定
    - VPC セキュリティグループ : セキュリティグループ-MySQL
    - アベイラビリティーゾーン : 指定なし


### Redis
> ここでは、ElastiCache で Redis を作るときの設定を書いています。インスタンスを別に作って Redis をインストールし、それぞれの Web サーバーからつなぐ方法でも作れます。  
※Redis をサーバーにインストールする方法は、[セッション・キャッシュのドライバ変更](/ja/additional_session_cache_driver)のページに移動しました。

- クラスターエンジン : Redis
- 名前 : 任意 (例 : exment-redis)
- エンジンバージョンの互換性 : 5.0.5
- ポート : 6379
- ノードタイプ : 任意 (例 : cache.t2.micro)
- サブネットグループ : 新規作成
    - 名前 : 任意 (例 : exment-redis-subnet)
    - VPC : 先ほど作成したVPC
    - サブネット : すべての情報を入力
- セキュリティグループ : セキュリティグループ-Redis


### EC2
EC2 インスタンスを 2 種類作ります。(踏み台サーバーと、Web サーバー 1 台。2 台目の Web サーバーは、あとで複製します)  
踏み台サーバーは、Web サーバーに SSH でつなぐときに、先につなぐサーバーです。

#### 踏み台サーバー
- AMI : Amazon Linux 2 AMI x86
- インスタンスサイズ : 任意 (例 : t2.nano)
- インスタンス数 : 1
- ネットワーク : 先ほど作成したVPC
- サブネット : 任意
- 自動割り当てパブリック IP : 有効
- タグ : キー-Name、値-任意 (例 : exment-step)
- セキュリティグループ : セキュリティグループ-SSH

#### Webサーバー
- AMI : Amazon Linux 2 AMI x86
- インスタンスサイズ : 任意 (例 : t2.micro)
- インスタンス数 : 1
- ネットワーク : 先ほど作成したVPC
- サブネット : パブリックサブネットA
- 自動割り当てパブリック IP : 有効
- タグ : キー-Name、値-任意 (例 : exment-web1)
- セキュリティグループ : セキュリティグループ-SSHプライベート、セキュリティグループ-Web


### Webサーバー-A

#### Webサーバー-Aへ接続
- SSHで、**踏み台サーバー**に接続します。

- EC2 インスタンスにつなぐために必要な key(ここでは「exment_key.pem」とします)を、踏み台サーバーに送ります。

- 次のコマンドを実行し、SSH キーの権限を変えます。

~~~
chmod 700 exment_key.pem
~~~

- 次のコマンドを実行し、WebサーバーA へ SSH でつなぎます。

~~~
ssh -i ~/exment_key.pem ec2-user@(WebサーバーAのプライベートIPアドレス)
~~~

#### Webサーバー設定

- 次のコマンドを実行し、パッケージを新しくして、必要なソフトウェアをインストールします。

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php8.2
sudo yum install -y httpd mysql
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

# 以下のコマンドを実行し、フォルダの権限を付与する。1もしくは2を実施する
# 1. かんたんインストールの場合
sudo php artisan exment:setup-dir --easy=1
# 2. 手動インストールの場合
sudo php artisan exment:setup-dir
~~~

- Redis と AWS S3 につなぐために、次のコマンドを実行します。

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- .env ファイルを直します。

~~~

# すでにある設定値の変更
CACHE_STORE=redis #キャッシュの保存先を変更する場合。redisに書き換え
SESSION_DRIVER=redis #セッションの保存先を変更する場合。redisに書き換え
REDIS_CLIENT=predis #上記でインストールした「predis」を使用してRedisに接続する
REDIS_HOST=127.0.0.1 #redisのホスト名
REDIS_PASSWORD=XXXXXX #redisのパスワード、設定した場合のみ記述
REDIS_PORT=6379 #redisのポート番号、6379でない場合のみ記述


# 新規に設定値追加
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID=(S3アクセスキー)
AWS_SECRET_ACCESS_KEY=(S3シークレットアクセスキー)
AWS_DEFAULT_REGION=(S3リージョン。例：ap-northeast-1)
AWS_BUCKET_EXMENT=(添付ファイルで使用するAWS S3のバケット)
AWS_BUCKET_BACKUP=(バックアップで使用するAWS S3のバケット)
AWS_BUCKET_TEMPLATE=(テンプレートで使用するAWS S3のバケット)
AWS_BUCKET_PLUGIN=(プラグインで使用するAWS S3のバケット)

# ロードバランサーをHTTPS、ELBとEC2の通信をHTTPにする場合
ADMIN_HTTPS=true
~~~

- 手元の PC のブラウザーで、作った Web サーバーの IP アドレスを開き、Exment の初期インストールを終わらせます。

- ※かんたんインストールでインストールしたときは、初期インストールが終わったら、次のコマンドを実行してください。インストールのときだけ必要な権限を、元に戻します。

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

#### Webサーバー 設定変更時
- Exment をアップデートしたとき、PHP ファイルを更新したとき、設定値を変えたときは、次のコマンドを実行してください。

~~~
sudo systemctl restart php-fpm
~~~


#### WebサーバーのAMI設定

Web サーバーを冗長化するときなどのために、Web サーバーの AMI（サーバーのイメージ）を作ります。

- AWS Console の EC2 メニューで、「アクション」→「イメージ」→「イメージの作成」をクリックします。

- イメージ名など(例 : exment-ami)を入力し、イメージを作ります。

- 数分たつと、左メニューの「AMI」に、いま作ったイメージができています。


#### AMIより、WebサーバーB作成
- 左メニューの「AMI」で、上で作ったイメージを選び、「起動」ボタンをクリックします。

次の設定で、Web サーバーを作ります。
  - インスタンスサイズ : 任意 (例 : t2.micro)
  - インスタンス数 : 1
  - ネットワーク : 先ほど作成したVPC
  - サブネット : パブリックサブネットB
  - 自動割り当てパブリック IP : 有効
  - タグ : キー-Name、値-任意 (例 : exment-web2)
  - セキュリティグループ : セキュリティグループ-SSHプライベート、セキュリティグループ-Web


### Amazon Elastic Load Balancing
- ロードバランサーの種類 : Application Load Balancer
- 名前 : 任意 (例 : exment-alb)
- リスナー : HTTPもしくはHTTPS
- VPC : 作成したVPC
- アベイラビリティーゾーン : すべて選択
- セキュリティグループ : セキュリティグループ-Web
- ターゲットグループ : 任意 (例 : exment-alb-tg)
- ターゲットグループインスタンス : 作成したWebサーバー2種類を選択し、「登録済」に追加

設定が終わると、ロードバランサーの DNS を通して、Web サーバーにアクセスできるようになります。


### その他
Amazon Elastic Load Balancing でリバースプロキシの設定になっているときは、次のページの手順を見て、設定してください。  
[リバースプロキシを採用している場合の設定](/ja/additional_reverse_proxy)


## PHPバージョンアップ時の対応
[AWSによる環境構築-シングル構成の「PHPバージョンアップ時の対応」](/ja/install_aws_single#phpバージョンアップ時の対応)に移動しました。
