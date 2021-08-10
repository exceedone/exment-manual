# リバースプロキシを採用している場合の設定
Exmentのサーバー構築に、リバースプロキシを使用していた場合の手順を記載します。  

> 本手順は、v3.7.2より、一部見直しを行いました。

## はじめに
クラウドサービスのロードバランサーなど、Webリクエストを受け付けるサーバー(サービス。以下、リバースプロキシサーバー)と、Webサーバーが異なる場合があります。  
特に、以下のような設定を行うことがあります。  

- インターネットから、リバースプロキシサーバーの通信 : HTTPS通信
- リバースプロキシサーバーから、Webサーバーの通信 : HTTP通信

![リバースプロキシ](img/quickstart/reverse_proxy1.png)


このようなリバースプロキシ構築を行う場合に必要となる、リバースプロキシサーバー、ならびにExmentの追加設定手順です。  



### 設定手順 - Exment

- .envファイルを編集します。

~~~
# （すでにある値の追記）リバースプロキシサーバーまでのURL。"admin"は不要
APP_URL=https://XXXX.com 

# インターネット⇔リバースプロキシサーバーをHTTPS、リバースプロキシサーバー⇔Webサーバーの通信をHTTPにする場合、新規追加する
ADMIN_HTTPS=true

# 上記の"APP_URL"の値をURL生成に使用する
ADMIN_USE_APP_URL=true

# Proxyを許可するリバースプロキシサーバーのIPアドレス。複数のIPアドレスが想定される場合、カンマ区切り
# ※IPが不定の場合や、ゾーン設定によりリバースプロキシサーバー以外はアクセスがない場合などは、"*"で指定も可能
ADMIN_TRUST_PROXY_IPS=172.0.1.1,172.0.1.2
#ADMIN_TRUST_PROXY_IPS=*

# AWS ELBの場合、以下の値を追加する
ADMIN_TRUST_PROXY_HEADERS=HEADER_X_FORWARDED_AWS_ELB
~~~

- [SAML認証](/ja/login_saml)を行っている場合、「オプション設定」で、「Proxy使用」をYESにしてください。
![リバースプロキシ](img/quickstart/reverse_proxy2.png)


### 設定手順 - リバースプロキシサーバー

- リバースプロキシサーバー(ロードバランサー、Nginxなど)から、Webサーバーへの転送の際に、以下のヘッダー値を付与する必要があります。  
ヘッダーの値が追加されているかどうか、ご確認をお願いします。  
※下記の値は、リバースプロキシサーバーまでのアクセス情報を付与し、Webサーバー側で加工するヘッダーです。  
    - X-Forwarded-Host : リバースプロキシサーバーのホスト名
    - X-Forwarded-For : クライアントのIPアドレス
    - X-Forwarded-Proto : httpもしくはhttps
    - X-Forwarded-Port : リバースプロキシサーバーまでのポート

- 例：nginxの場合

```
    location / {
        proxy_set_header X-Forwarded-Host localhost;
        proxy_set_header X-Forwarded-For XXXX;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Port 10443;
    }
```

- ※検証のために、リクエスト値・ヘッダー値を出力する場合、ルートフォルダの".env"に、以下を追記することで、storage/logs/laravel.logに出力します。

```
EXMENT_DEBUG_MODE_REQUEST=1
```


[←追加設定一覧へ戻る](/ja/quickstart_more)