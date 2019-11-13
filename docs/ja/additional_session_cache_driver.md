# (上級者向け)セッション・キャッシュのドライバ変更
Exmentでは標準設定の場合、セッション・キャッシュは、Webサーバー上のファイルに保持します。  
ですが、Webサーバー以外の場所に保存したい場合も考えられます。例えば、以下のような場合です。

- Radisやmemcachedを使用し、高速化を図る
- 冗長化を行うため、Webサーバー以外の場所に保存する

このように、セッション・キャッシュの保存先を変更したい場合の設定方法を記載します。  

## 設定方法

### Redis
セッション管理を、Redisで行う場合の手順です。  
Webサーバー側の手順と、Redisサーバー側の手順を記載します。  
※AWS Redisを使用する場合など、外部サービスを使用する場合は、Redisサーバー側の手順は不要です。Webサーバー側だけ、設定を行ってください。

#### Redisサーバー側
> CentOSで設定を行う場合の手順です。

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
CACHE_DRIVER=redis #キャッシュの保存先を変更する場合。redisに書き換え
SESSION_DRIVER=redis #キャッシュの保存先を変更する場合。redisに書き換え
REDIS_HOST=127.0.0.1 #redisのホスト名
REDIS_PASSWORD=XXXXXX #redisのパスワード、設定した場合のみ記述
REDIS_PORT=6379 #redisのポート番号、6379でない場合のみ記述
~~~


[←追加設定一覧へ戻る](/ja/quickstart_more)