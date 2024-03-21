# Dockerによる環境構築
本ページでは、DockerでExmentを構築する手順を記載します。  
※本ページのより詳細な情報は、[GitHub](https://github.com/exment-git/docker-exment)をご確認ください。


## Special thanks!
Dockerイメージは、[yamada28go氏によるdockerリポジトリ](https://github.com/yamada28go/docker-exment)をベースに、構築しております。誠にありがとうございます！

## 環境
本ページでは、以下の内容で構築を行っております。  
- nginx 最新版
- PHP 8.2.XX
- Debian
- MySQL 8.0.XX

## 注意点

- ご利用の環境やバージョンなどにより、本手順では正常に設定できない場合がございます。ご了承ください。

- 本手順では、ExmentをDockerで動作させるための手順のみの記載となります。  
SSHやデータベース作成、Dockerコマンドなど、一般的なIT系のナレッジについては記載致しておりません。ご了承ください。  

## Dockerによるインストール手順

> ※ここでは、もっともスタンダードな、「Webサーバー」「MySQL」の構成を行う場合の手順になります。  
それ以外にも、「冗長化構成・ロードバランサーを追加する」「httpsを追加する」など、細かい指定も可能です。  
詳細は[docker-exment](https://github.com/exment-git/docker-exment)のReadmeをご確認ください。


### 定義ファイル取得
- 以下のページより、必要フォルダをダウンロードし、zipを解凍します。  
[docker-exment](https://github.com/exment-git/docker-exment)



### MySQL環境の構築

````bash
$ make mysql-init
````

### MySQL環境のセットアップ

````bash
$ make mysql-up
````

### MariaDB 環境の構築

````bash
$ make maridb-init
````

### MariaDB 環境のセットアップ

````bash
$ make maridb-init
````

### SQL Server環境の構築

````bash
$ make sqlsrv-init
````

### SQL Server環境のセットアップ

````bash
$ make sqlsrv-up
````

### Exment初期設定
- 以下のサイトにアクセスし、Exmentの初期設定を行ってください。(※Webサーバーのポートを変更した場合、そのポートでアクセスを行ってください)  
http://localhost/admin


- データベース情報は以下の通りです。(※ポートは内部ポート番号を参照するので、envでポートを変更していても、3306固定になります)

| 項目 | 設定値 |
| ---- | ---- |
| データベース種類 | MySQL |
| ホスト名 | mysql |
| ポート | 3306 |
| データベース名 | exment_database |
| ユーザー名 | exment_user |
| パスワード | secret |


## サーバーに接続する手順
- 以下のコマンドで、コンテナ一覧を取得します。

```
docker ps
# 結果例
123412341234        exment-docker_php   "docker-php-entrypoi…"   8 minutes ago       Up 8 minutes        9000/tcp                             exment-docker_php_1
```

- 結果のうち、「exment-docker_php」となっているイメージの、「CONTAINER ID」の値をコピーします。上記の例の場合、「123412341234」が該当します。  

- 以下のコマンドを実行します。

```
docker exec -it (CONTAINER ID) /bin/bash
#例
docker exec -it 123412341234 /bin/bash
```

- これで、Exmentが起動しているWebサーバーに接続できます。


## その他
現在、このDockerイメージは検証中、ならびに機能追加中です。  
GitHubは、[こちら](https://github.com/exment-git/docker-exment)よりお願いします。
