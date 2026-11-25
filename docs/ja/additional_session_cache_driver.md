# (上級者向け)セッション・キャッシュのドライバ変更
セッション（ログインの状態など）とキャッシュ（一時的に取っておくデータ）の保存先を変える設定です。  
標準では、Web サーバーの上のファイルに保存します。次のようなときに、保存先を変えます。

- Redis や memcached を使って、速くしたい
- 冗長化（サーバーを複数台にすること）のために、Web サーバー以外の場所に保存したい

## 設定方法

### Redis
セッションの管理を、Redis で行うときの手順です。  
Redis サーバー側の手順と、Web サーバー側の手順があります。  
※AWS Redis など、外部のサービスを使うときは、Redis サーバー側の手順はいりません。Web サーバー側だけ、設定してください。

#### Redisサーバー側
> CentOS で設定するときの手順です。

**(1) 次のコマンドを実行します。**

~~~
yum -y install epel-release
yum install -y redis
systemctl enable redis
~~~

**(2) 次のコマンドを実行し、Redis の設定を変えます。**

~~~
vi /etc/redis.conf

####bindの記載を以下のように変更
#bind 127.0.0.1
bind 0.0.0.0
~~~

**(3) ファイアウォールの設定で、接続元の IP アドレスからの Redis へのアクセスだけを許可します。**

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=6379/tcp
firewall-cmd --zone=from_webserver --add-service=redis
firewall-cmd --reload
~~~

**(4) サービスを開始します。**

~~~
systemctl start redis.service
~~~

#### Webサーバー側
**(1) 次のコマンドを、プロジェクトのルートフォルダで実行します。**

~~~
composer require predis/predis
~~~

**(2) .env ファイルを開き、次の設定値を追加・変更します。**

~~~
CACHE_STORE=redis #キャッシュの保存先を変更する場合。redisに書き換え(Exment v7.0.0以降で新規インストールした場合)
CACHE_DRIVER=redis #キャッシュの保存先を変更する場合。redisに書き換え(Exment v6.x以前からアップデートした場合)
SESSION_DRIVER=redis #キャッシュの保存先を変更する場合。redisに書き換え
REDIS_CLIENT=predis #上記でインストールした「predis」を使用してRedisに接続する
REDIS_HOST=127.0.0.1 #redisのホスト名
REDIS_PASSWORD=XXXXXX #redisのパスワード、設定した場合のみ記述
REDIS_PORT=6379 #redisのポート番号、6379でない場合のみ記述
~~~

- キャッシュの保存先の設定名は、「config/cache.php」の「default」に書いてある名前を使います。

| サイト | 設定名 |
| ---- | ---- |
| Exment v7.0.0以降で新規インストールした場合 | 「CACHE_STORE」 |
| v6.x以前からアップデートした場合(「config/cache.php」がv6.xのまま) | 「CACHE_DRIVER」 |

- 「REDIS_CLIENT=predis」を書かないと、PHP の拡張機能「phpredis」でつなごうとするため、「Class "Redis" not found」のエラーになります。


[←追加設定一覧へ戻る](/ja/quickstart_more)